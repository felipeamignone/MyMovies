const mock = [
  { id: 0, name: "Os incríveis 1", manager: "Pixar", releasedYear: 1973 },
  { id: 1, name: "Os incríveis 2", manager: "Pixar", releasedYear: 2000 },
  { id: 2, name: "Os incríveis 3", manager: "Pixar", releasedYear: 2002 },
  { id: 3, name: "Os incríveis 4", manager: "Pixar", releasedYear: 2005 },
  { id: 4, name: "Os incríveis 5", manager: "Pixar", releasedYear: 2020 },
];

// localStorage.setItem("catalog", JSON.stringify(mock));

// CATALOG CONTROL
let table = document.querySelector("#films-table");

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
    table.innerHTML += emptyState;
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
                <li>
                  <span class="material-symbols-outlined  icon-menu">edit</span>
                  Editar
                </li>
                <li>
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

  table.innerHTML += rows;
}

generateRows();

// MODAL CONTROL
let modalForm = document.querySelector("#modal-form");

function onOpenModal() {
  console.log("abriu modal");
  modalForm && (modalForm.style.display = "block");
}

function onCloseModal() {
  console.log("fechou modal");
  modalForm && (modalForm.style.display = "none");
}

window.onclick = function (event) {
  if (event.target == modalForm) {
    onCloseModal();
  }
};
