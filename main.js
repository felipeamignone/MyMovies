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
function addFilm(e) {
  e.preventDefault();
  let films = getFilms();

  const name = e.target.elements.name.value;
  const manager = e.target.elements.manager.value;
  const releasedYear = e.target.elements.year.value;

  const newFilme = {
    id: (Math.random() * 10).toFixed(0),
    name,
    manager,
    releasedYear,
  };

  films.push(newFilme);
  localStorage.setItem("catalog", JSON.stringify(films));

  generateRows();
  onCloseModal();
}

function editFilm(filmId) {
  console.log({ filmId });
}

function rmvFilm(filmId) {
  console.log({ filmId });
  let films = getFilms();

  const filmIndex = films.findIndex((film) => film.id === filmId);
  films.splice(filmIndex, 1);
  localStorage.setItem("catalog", JSON.stringify(films));

  generateRows();
}
