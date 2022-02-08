function abrirMenuLateral() {
    const menuLateralEl = document.querySelector(".menu-lateral");
    const divEscurecidaEl = menuLateralEl.parentNode

    menuLateralEl.classList.remove("escondido")
    divEscurecidaEl.classList.remove("escondido")
}

function fecharMenuLateral(divEscurecidaEl) {
    const menuLateralEl = divEscurecidaEl

    menuLateralEl.classList.add("escondido")
    divEscurecidaEl.classList.add("escondido")
}