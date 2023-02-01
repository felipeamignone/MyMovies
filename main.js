const modalForm = document.querySelector("#modal-background");

function onOpenModal() {
    console.log('abriu modal');
    modalForm && (modalForm.style.display = "block")
}

function onCloseModal() {
    console.log('fechou modal');
    modalForm && (modalForm.style.display = "none")
}

window.onclick = function(event) {
    console.log({target: event.target})
    if (event.target == modalForm) {
        modalForm.style.display = "none";
    }
  }