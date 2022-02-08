// Definição das funções

function abrirMenuLateral() {
    const menuLateralEl = document.querySelector(".menu-lateral");
    const divEscurecidaEl = document.querySelector(".escurecer-fundo")

    menuLateralEl.classList.remove("escondido")
    divEscurecidaEl.classList.remove("escondido")
}

function fecharMenuLateral(divEscurecidaEl) {
    const menuLateralEl = document.querySelector(".menu-lateral")

    menuLateralEl.classList.add("escondido")
    divEscurecidaEl.classList.add("escondido")
}

function prevenirAnimacaoAoCarregar() {
    document.body.className="";
}

// Inicialização das funções
setTimeout(prevenirAnimacaoAoCarregar,100);