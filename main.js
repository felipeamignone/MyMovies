const mock = [
  { id: 0, name: "Os incríveis 1", manager: "Pixar", releasedYear: 1973 },
  { id: 1, name: "Os incríveis 2", manager: "Pixar", releasedYear: 2000 },
  { id: 2, name: "Os incríveis 3", manager: "Pixar", releasedYear: 2002 },
  { id: 3, name: "Os incríveis 4", manager: "Pixar", releasedYear: 2005 },
  { id: 4, name: "Os incríveis 5", manager: "Pixar", releasedYear: 2020 },
];

localStorage.setItem("catalog", JSON.stringify(mock));

// CATALOG CONTROL
let table = document.querySelector("#films-table");

function getFilms() {
  return JSON.parse(localStorage.getItem("catalog")) || [];
}

function generateRows() {
  let films = getFilms();
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
const modalForm = document.querySelector("#modal-form");

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
    modalForm && (modalForm.style.display = "none");
  }
};
