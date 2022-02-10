let usuario = {
    // name: "youtube.com/graduacaonerd"
};
let intervaloBuscarMensagens = null;
let intervaloVerificarConexao = null;

function cadastrarUsuario() {
    const inputEl = document.querySelector(".tela-login__input")
    usuario.name = inputEl.value

    const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", usuario);

    promise.then(cadastrarUsuarioOK);
    promise.catch(cadastrarUsuarioFalhou);
}


function cadastrarUsuarioOK(response) {
    const telaLoginEl = document.querySelector(".tela-login")
    telaLoginEl.classList.add("escondido")

    buscarParticipantes()

}

function cadastrarUsuarioFalhou(response) {
    if (usuario.name == null || usuario.name == "") {
        const telaLoginAreaErroEl = document.querySelector(".tela-login__area-erro")
        telaLoginAreaErroEl.innerHTML = ""
        telaLoginAreaErroEl.innerHTML += `<div class="tela-login__area-erro"><p class="tela-login__mensagem-erro">Digite um nome de usuário.</p></div>`
        console.log(usuario.name)
    }
    else {
        const telaLoginAreaErroEl = document.querySelector(".tela-login__area-erro")
        telaLoginAreaErroEl.innerHTML = ""
        telaLoginAreaErroEl.innerHTML += `<div class="tela-login__area-erro"><p class="tela-login__mensagem-erro">Usuário ${usuario.name} já existe! Tente outro nome.</p></div>`
    }
}

function verificarConexaoUsuario() {
    const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/status", usuario);
    promise.then(verificarConexaoUsuarioOK);
    promise.catch(verificarConexaoUsuarioFalhou)
}

function verificarConexaoUsuarioOK(response) {
    console.log(response)
    console.log("Ok, continua conectado!")
}

function verificarConexaoUsuarioFalhou(response) {
    console.log(response)
    console.log("Deu ruim e o usuário não está mais conectado!")
}

function buscarMensagens() {
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
    promise.then(imprimirMensagens);
}

function imprimirMensagens(response) {
    const mensagens = response.data;
    const mensagensEl = document.querySelector(".mensagens");
    mensagensEl.innerHTML = "";

    for (let i = 0; i < mensagens.length; i++) {
        const mensagem = mensagens[i];

        const templateMensagem = `<article class="mensagem ${mensagem.type}">
        <p class="mensagem_conteudo"><span class="mensagem__horario">(${mensagem.time})</span> <span class="mensagem__nome">${mensagem.from}</span> para <span class="mensagem__nome">${mensagem.to}</span>: ${mensagem.text}</p>
        </article>`;

        mensagensEl.innerHTML += templateMensagem;
    }
}

function buscarParticipantes() {
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/uol/participants")
    promise.then(imprimirParticipantes)
}

function imprimirParticipantes(response) {
    const participantes = response.data

    const listaUsuariosEl = document.querySelector(".menu-lateral__lista.usuarios")

    for (let i = 0; i < participantes.length; i++) {
        const participante = participantes[i]

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
// setTimeout(prevenirAnimacaoAoCarregar, 100);
buscarMensagens();
intervaloBuscarMensagens = setInterval(buscarMensagens, 5000);
intervaloVerificarConexao = setInterval(verificarConexaoUsuario, 5000);