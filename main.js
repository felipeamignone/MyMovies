// CATALOG CONTROL
let tableBody = document.querySelector("#films-table .table-body");

function getFilms() {
  return JSON.parse(localStorage.getItem("catalog")) || [];
}

function generateRows() {
  let films = getFilms();

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
                <li onclick="editFilm(${film.id})">
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
let modalForm = document.querySelector("#modal-form");

function onOpenModal() {
  modalForm && (modalForm.style.display = "block");
}

function onCloseModal() {
  modalForm && (modalForm.style.display = "none");
}

window.onclick = function (event) {
  if (event.target == modalForm) {
    onCloseModal();
  }
};

// FILMS CONTROL
function addFilm(event) {
  event.preventDefault();
  let films = getFilms();

  const name = event.target.elements.name.value;
  const manager = event.target.elements.manager.value;
  const releasedYear = event.target.elements.year.value;

  // GENERATE A RANDOM ID WITH 4 DIGITS VERIFYING IF EXITES
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
  localStorage.setItem("catalog", JSON.stringify(films));

  generateRows();
  onCloseModal();
}

function editFilm(filmId) {
  console.log({ filmId });
}

function rmvFilm(filmId) {
  let films = getFilms();

  const filmIndex = films.findIndex((film) => film.id === String(filmId));
  films.splice(filmIndex, 1);
  localStorage.setItem("catalog", JSON.stringify(films));

  generateRows();
}

// UTILS
function onlyNumbersOnInput(event) {}

function verifyIfExistIdOnCart(filmId) {
  let films = getFilms();
  if (films.some((film) => film.id === filmId)) {
    return true;
  }
  return false;
}
