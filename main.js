let usuario = {
    // name: "youtube.com/graduacaonerd"
    name: "antedeguemon"
};
let intervaloBuscarMensagens = null;
let intervaloVerificarConexao = null;
let intervaloBuscarParticipantes = null;
let visibilidade = true;

let ultimaMensagemRecebidaEl = null
let primeiraVezBuscandoMensagens = true;


let mensagem = {
    to: "Todos",
    type: "message"
};

// Funções temporárias

function cadastrarUsuarioHardCoded() {
    const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", usuario);

    promise.then(cadastrarUsuarioHardCodedOK);
    promise.catch(cadastrarUsuarioHardCodedFalhou);
}

function cadastrarUsuarioHardCodedOK(response) {
    buscarParticipantes()
    intervaloBuscarParticipantes = setInterval(buscarParticipantes, 10000);

    intervaloVerificarConexao = setInterval(verificarConexaoUsuario, 5000);
}

function cadastrarUsuarioHardCodedFalhou(response) {
    console.log("Deu ruim! Usuário já existe");
}

// Funções

function cadastrarUsuario() {
    const inputEl = document.querySelector(".tela-login__input");
    usuario.name = inputEl.value;

    const areaLoginEl = document.querySelector(".tela-login__area-login")
    areaLoginEl.classList.add("escondido")

    const telaEntrandoEl = document.querySelector(".tela-login__entrando")
    telaEntrandoEl.classList.remove("escondido")

    const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", usuario)

    promise.then(cadastrarUsuarioOK);
    promise.catch(cadastrarUsuarioFalhou);
}

function cadastrarUsuarioOK(response) {
    const telaLoginEl = document.querySelector(".tela-login");
    telaLoginEl.classList.add("escondido");

    buscarParticipantes()
    intervaloBuscarParticipantes = setInterval(buscarParticipantes, 10000);

    intervaloVerificarConexao = setInterval(verificarConexaoUsuario, 5000);
}

function cadastrarUsuarioFalhou(response) {
    if (usuario.name == null || usuario.name == "") {
        const telaLoginAreaErroEl = document.querySelector(".tela-login__area-erro");
        telaLoginAreaErroEl.innerHTML = "";
        telaLoginAreaErroEl.innerHTML += `<div class="tela-login__area-erro"><p class="tela-login__mensagem-erro">Digite um nome de usuário.</p></div>`;
    }
    else {
        const telaLoginAreaErroEl = document.querySelector(".tela-login__area-erro");
        telaLoginAreaErroEl.innerHTML = "";
        telaLoginAreaErroEl.innerHTML += `<div class="tela-login__area-erro"><p class="tela-login__mensagem-erro">Usuário ${usuario.name} já existe! Tente outro nome.</p></div>`;
    }
}

function verificarConexaoUsuario() {
    const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/status", usuario);
    promise.then(verificarConexaoUsuarioOK);
    promise.catch(verificarConexaoUsuarioFalhou);
}

function verificarConexaoUsuarioOK(response) {
    console.log("Ok, continua conectado!");
}

function verificarConexaoUsuarioFalhou(response) {
    console.log(response);
    console.log("Deu ruim e o usuário não está mais conectado!");
}

function buscarMensagens() {
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
    promise.then(imprimirMensagens);
}

function imprimirMensagens(response) {
    const mensagensEl = document.querySelector(".mensagens");
    // mensagensEl.innerHTML = "";

    let indexImprimirMensagens = 0

    let mensagensRecebidas = response.data;

    if (primeiraVezBuscandoMensagens === false) {
        for (let i = mensagensRecebidas.length - 1; i > 0; i--) {
            mensagemRecebida = mensagensRecebidas[i];
            if (mensagemRecebida.time === ultimaMensagemRecebidaEl.time && mensagemRecebida.from === ultimaMensagemRecebidaEl.from && mensagemRecebida.text === ultimaMensagemRecebidaEl.text) {
                indexImprimirMensagens = i + 1
                break
            } else {
                continue
            }
        }
    } 

    ultimaMensagemRecebidaEl = mensagensRecebidas.at(-1)

    for (indexImprimirMensagens; indexImprimirMensagens < mensagensRecebidas.length; indexImprimirMensagens++) {

        const mensagemRecebida = mensagensRecebidas[indexImprimirMensagens];
        let paraQuem = "";

        switch (mensagemRecebida.type) {
            case "status":
                paraQuem = "";
                mensagemRecebida.to = "";
                break;
            case "message":
                paraQuem = "para";
                mensagemRecebida.to += ":";
                break;
            case "private_message":
                paraQuem = "reservadamente para";
                mensagemRecebida.to += ":";
        }

        const templateMensagem = `<article class="mensagem ${mensagemRecebida.type}">
        <p class="mensagem_conteudo"><span class="mensagem__horario">(${mensagemRecebida.time})</span> <span class="mensagem__nome">${mensagemRecebida.from}</span> ${paraQuem} <span class="mensagem__nome">${mensagemRecebida.to}</span> ${mensagemRecebida.text}</p>
        </article>`; // TEMPORÁRIO -> MUDAR O "PARA" PARA DINAMICO DEPENDENDO DA MENSAGEM'

        mensagensEl.innerHTML += templateMensagem;

        mensagensEl.lastChild.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    }

    primeiraVezBuscandoMensagens = false
    
}

function buscarParticipantes() {
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/uol/participants");
    promise.then(imprimirParticipantes);
}

function imprimirParticipantes(response) {
    const participantes = response.data;

    const listaUsuariosEl = document.querySelector(".menu-lateral__lista.usuarios");

    listaUsuariosEl.innerHTML = `<li class="menu-lateral__item todos selecionado" onclick="selecionarUsuario(this)">Todos</li>`;

    for (let i = 0; i < participantes.length; i++) {
        const participante = participantes[i];

        const templateUsuarioLista = `<li class="menu-lateral__item usuario" onclick="selecionarUsuario(this) data-identifier="participant"">${participante.name}</li>`;

        if (participante.name === usuario.name) {
            continue;
        }

        listaUsuariosEl.innerHTML += templateUsuarioLista;
    }
}

function enviarMensagem() {
    const MensagemEl = document.querySelector(".caixa-mensagem__input");
    let mensagemTexto = MensagemEl.value;

    mensagem.from = usuario.name;
    mensagem.text = mensagemTexto;

    const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/messages", mensagem);
    promise.then(enviarMensagemOK);
    promise.catch(enviarMensagemFalhou);

    MensagemEl.value = "";
    mensagem.text = "";
}

function enviarMensagemOK() {
    console.log("mensagem foi");
    buscarMensagens();
}

function enviarMensagemFalhou(erro) {
    alert("Vish, parece que você está desconectado. Faça o login de novo.");
    console.log(erro.response);
    window.location.reload();
}

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

function selecionarUsuario(usuarioClicado) {
    let UsuarioSelecionadoEl = document.querySelector(".menu-lateral__lista.usuarios .selecionado");

    if (UsuarioSelecionadoEl === null) {
        usuarioClicado.classList.add("selecionado");
    }
    else {
        UsuarioSelecionadoEl.classList.remove("selecionado");
        usuarioClicado.classList.add("selecionado");
    }

    UsuarioSelecionadoEl = document.querySelector(".menu-lateral__lista.usuarios .selecionado");

    mensagem.to = UsuarioSelecionadoEl.innerText;

    alterarDestinarárioOuVisiblidade();
}

function selecionarVisibilidade(visibilidadeClicada) {
    let visibilidadeSelecionadaEl = document.querySelector(".menu-lateral__lista.visibilidade .selecionado");

    if (visibilidadeSelecionadaEl === null) {
        visibilidadeClicada.classList.add("selecionado");
    }
    else {
        visibilidadeSelecionadaEl.classList.remove("selecionado");
        visibilidadeClicada.classList.add("selecionado");
    }

    visibilidadeSelecionadaEl = document.querySelector(".menu-lateral__lista.visibilidade .selecionado");

    let visibilidadeSelecionada = visibilidadeSelecionadaEl.innerText;

    switch (visibilidadeSelecionada) {
        case "Público":
            mensagem.type = "message";
            break;
        case "Reservadamente":
            mensagem.type = "private_message";
            break;
    }

    alterarDestinarárioOuVisiblidade();
}

function enviarMensagemTeclaEnter() {
    const campoInputEl = document.querySelector(".caixa-mensagem__input");
    campoInputEl.onkeydown = function (evento) {
        if (evento.code === "Enter") {
            enviarMensagem();
        }
    }
}

function alterarDestinarárioOuVisiblidade() {
    const infoAdicionalEl = document.querySelector(".caixa-mensagem__info-adicional");

    let templateVisibilidade = "";

    switch (mensagem.type) {
        case "message":
            templateVisibilidade = "";
            break;
        case "private_message":
            templateVisibilidade = " (reservadamente)";
            break;
    }

    if (mensagem.to === "Todos") {
        infoAdicionalEl.classList.add("escondido");
        document.querySelector(".menu-lateral__item.publico").classList.add("selecionado");
        document.querySelector(".menu-lateral__item.reservadamente").classList.remove("selecionado");
        document.querySelector(".menu-lateral__item.reservadamente").removeAttribute("onclick");
        mensagem.type = "message";
    } else {
        infoAdicionalEl.classList.remove("escondido");
        document.querySelector(".menu-lateral__item.reservadamente").setAttribute("onclick", "selecionarVisibilidade(this)");
        templateInputMensagem = `Enviando para ${mensagem.to}${templateVisibilidade}`;
    }

    infoAdicionalEl.innerText = templateInputMensagem;
}

// Inicialização das funções
// setTimeout(prevenirAnimacaoAoCarregar, 100);
cadastrarUsuarioHardCoded();
buscarMensagens();
intervaloBuscarMensagens = setInterval(buscarMensagens, 3000);
enviarMensagemTeclaEnter();