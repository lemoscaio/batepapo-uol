// function cadastrarUsuario() {
//     const usuario = {
//         name: "Caio"
//     }
//     const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", usuario);
//     promise.then(cadastrarUsuarioOK);
//     promise.catch(cadastrarUsuarioFalhou)
// }

// function cadastrarUsuarioOK(response) {
//     console.log(response)
//     // console.log("Ok, cadastrado!")
// }

// function cadastrarUsuarioFalhou(response) {
//     // console.log(response)
//     // console.log("Deu ruim!")
// }

function buscarMensagens() {
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
    promise.then(imprimirMensagens);
}

function imprimirMensagens(response) {
    const mensagens = response.data;

    for (let i = 0; i < mensagens.length; i++) {
        const mensagem = mensagens[i];

        const templateMensagem = `<article class="mensagem ${mensagem.type}">
        <p class="mensagem_conteudo"><span class="mensagem__horario">(${mensagem.time})</span> <span class="mensagem__nome">${mensagem.from}</span> para <span class="mensagem__nome">${mensagem.to}</span>: ${mensagem.text}</p>
        </article>`;

        const mensagensEl = document.querySelector(".mensagens");
        mensagensEl.innerHTML += templateMensagem;
    }
}

function buscarParticipantes() {
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/uol/participants")
    promise.then(imprimirParticipantes)
}

function imprimirParticipantes(response) {
    const participantes = response.data
    console.log(participantes)

    const listaUsuariosEl = document.querySelector(".menu-lateral__lista.usuarios")
    console.log(listaUsuariosEl)

    for(let i = 0 ; i < participantes.length ; i++) {
        participante = participantes[i]
        const templateUsuarioLista = `<li class="menu-lateral__item usuario">${participante.name}</li>`
        
        listaUsuariosEl.innerHTML += templateUsuarioLista
    }

}

// Definição das funções

function abrirMenuLateral() {
    const menuLateralEl = document.querySelector(".menu-lateral");
    const divEscurecidaEl = document.querySelector(".escurecer-fundo");

    menuLateralEl.classList.remove("escondido");
    divEscurecidaEl.classList.remove("escondido");
}

function fecharMenuLateral(divEscurecidaEl) {
    const menuLateralEl = document.querySelector(".menu-lateral");

    menuLateralEl.classList.add("escondido");
    divEscurecidaEl.classList.add("escondido");
}

function prevenirAnimacaoAoCarregar() {
    document.body.className = "";
}

// Inicialização das funções
setTimeout(prevenirAnimacaoAoCarregar, 100);
// cadastrarUsuario();
buscarParticipantes()
buscarMensagens(); 