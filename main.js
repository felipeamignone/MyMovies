// TABLE CONTROL
function generateRows() {
  let tableBody = document.querySelector("#films-table .table-body");
  const films = getFilms();

  // add empty state to table if no items in storage.
  if (films.length === 0) {
    const emptyState = `
    <tr class="empty-row">
        <td colspan="3">
            <h2>Adicione filmes para visualizar aqui.</h2>
        </td>
    </tr>
    `;
    tableBody.innerHTML = emptyState;
    return;
  }

  // generate rows with storage data.
  let rows = "";
  films.forEach((film) => {
    rows += `
    <tr class="table-row" key={${film.id}}>
        <td class="name-cell">${film.name}</td>
        <td class="name-cell">${film.manager}</td>
        <td class="year-cell">
          <div>
            ${film.releasedYear}
            <div class="options">
              <span class="material-symbols-outlined">more_vert</span>
              <ul class="options-menu">
                <li onclick="onOpenEditFilm(${film.id})">
                  <span class="material-symbols-outlined  icon-menu">edit</span>
                  Editar
                </li>
                <li onclick="rmvFilm(${film.id})">
                  <span class="material-symbols-outlined  icon-menu">
                    delete
                  </span>
                  Excluir
                </li>
              </ul>
            </div>
          </div>
        </td>
      </tr>
    `;
  });

  tableBody.innerHTML = rows;
}

generateRows();

// MODAL CONTROL

function onOpenModal() {
  const modalForm = document.querySelector("#modal-form");
  modalForm && (modalForm.style.display = "block");
}

function onCloseModal() {
  const modalForm = document.querySelector("#modal-form");
  const inputName = document.querySelector("#input-name");
  const inputManager = document.querySelector("#input-manager");
  const inputYear = document.querySelector("#input-year");

  inputName.value = "";
  inputManager.value = "";
  inputYear.value = "";

  modalForm && (modalForm.style.display = "none");
}

function onOpenEditFilm(filmId) {
  const films = getFilms();
  const inputName = document.querySelector("#input-name");
  const inputManager = document.querySelector("#input-manager");
  const inputYear = document.querySelector("#input-year");
  const submitButton = document.querySelector("#submit-button");
  const form = document.querySelector("#film-form");

  submitButton.innerHTML = "EDITAR FILME";

  form.onsubmit = function (event) {
    editFilm(filmId, event);
  };

  const selectedFilm = films.find((film) => film.id == filmId);

  inputName.value = selectedFilm.name;
  inputManager.value = selectedFilm.manager;
  inputYear.value = selectedFilm.releasedYear;

  onOpenModal();
}

window.onclick = function (event) {
  const modalForm = document.querySelector("#modal-form");
  if (event.target == modalForm) {
    onCloseModal();
  }
};

// FILMS CONTROL
function getFilms() {
  return JSON.parse(localStorage.getItem("catalog")) || [];
}

function setFilms(newFilmList) {
  localStorage.setItem("catalog", JSON.stringify(newFilmList));
}

function addFilm(event) {
  event.preventDefault();
  let films = getFilms();

  const name = event.target.elements.name.value;
  const manager = event.target.elements.manager.value;
  const releasedYear = event.target.elements.year.value;

  // GENERATE A RANDOM ID WITH 4 DIGITS VERIFYING IF EXISTS
  let randomId = (Math.random() * 10000).toFixed(0);
  function generateNewId(initialValue) {
    let finalId = initialValue;
    if (verifyIfExistIdOnCart(initialValue)) {
      initialValue += 1;
      return generateNewId(initialValue);
    }
    return finalId;
  }

  const newFilmId = generateNewId(randomId);

  const newFilm = {
    id: newFilmId,
    name,
    manager,
    releasedYear,
  };

  films.push(newFilm);
  setFilms(films);

  generateRows();
  onCloseModal();
}

function editFilm(filmId, event) {
  event.preventDefault();
  let films = getFilms();

  const name = event.target.elements.name.value;
  const manager = event.target.elements.manager.value;
  const releasedYear = event.target.elements.year.value;
  const newFilm = {
    id: filmId,
    name,
    manager,
    releasedYear,
  };

  const filmIndex = films.findIndex((film) => film.id == filmId);
  films.splice(filmIndex, 1, newFilm);

  localStorage.setItem("catalog", JSON.stringify(films));

  onCloseModal();
  generateRows();
}

function rmvFilm(filmId) {
  let films = getFilms();

  const filmIndex = films.findIndex((film) => film.id == filmId);
  films.splice(filmIndex, 1);
  localStorage.setItem("catalog", JSON.stringify(films));

  generateRows();
}

// UTILS
function verifyIfExistIdOnCart(filmId) {
  let films = getFilms();
  return films.some((film) => film.id === filmId);
}
