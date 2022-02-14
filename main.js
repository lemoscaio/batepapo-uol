let randomString = (Math.random() + 1).toString(36).substring(7); // VARIÁVEL APENAS PARA TESTE

let usuario = {
    // name: "youtube.com/graduacaonerd" --> VARIÁVEL APENAS PARA TESTE
    // name: "antedeguemon" --> VARIÁVEL APENAS PARA TESTE
    // name: randomString --> VARIÁVEL APENAS PARA TESTE
};

//Intervalos de setInterval
let intervaloBuscarMensagens = null;
let intervaloVerificarConexao = null;
let intervaloBuscarParticipantes = null;
const TEMPOINTERVALOBUSCARMENSAGENS = 3000
const TEMPOINTERVALOBUSCARPARTICIPANTES = 10000
const TEMPOINTERVALOVERIFICARCONEXAO = 5000

// Variáveis para função de alterar visibilidade
let visibilidade = true;

// Variáveis para função de Receber Mensagens
let participantesRecebidos = []
let ultimaMensagemRecebidaEl = null;
let primeiraVezBuscandoMensagens = true;


// Variáveis para função de Receber Participantes Novos ou Antigos
let listaUsuariosAnterior = [];
let achouUsuario = false;
let achouUsuarioAntigo = false;


// Declaração de padrão de mensagem
let mensagem = {
    to: "Todos",
    type: "message"
};

// Funções APENAS para testes -> Adicionar classe "escondido" na tela de login, de modo a fazer um bypass

function cadastrarUsuarioHardCoded() {
    const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", usuario);

    promise.then(cadastrarUsuarioHardCodedOK);
    promise.catch(cadastrarUsuarioHardCodedFalhou);
}

function cadastrarUsuarioHardCodedOK(response) {
    console.log("O seu usário é " + usuario.name)
    buscarParticipantes()
    intervaloBuscarParticipantes = setInterval(buscarParticipantes, TEMPOINTERVALOBUSCARPARTICIPANTES);

    intervaloVerificarConexao = setInterval(verificarConexaoUsuario, TEMPOINTERVALOVERIFICARCONEXAO);
}

function cadastrarUsuarioHardCodedFalhou(response) {
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
    intervaloBuscarParticipantes = setInterval(buscarParticipantes, TEMPOINTERVALOBUSCARPARTICIPANTES);

    intervaloVerificarConexao = setInterval(verificarConexaoUsuario, TEMPOINTERVALOVERIFICARCONEXAO);
}

function cadastrarUsuarioFalhou(response) {
    const areaLoginEl = document.querySelector(".tela-login__area-login")
    areaLoginEl.classList.remove("escondido")
    const telaEntrandoEl = document.querySelector(".tela-login__entrando")
    telaEntrandoEl.classList.add("escondido")

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
}

function verificarConexaoUsuarioFalhou(response) {
}

function buscarMensagens() {
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
    promise.then(imprimirMensagens);
}

function imprimirMensagens(response) {
    const mensagensEl = document.querySelector(".mensagens");
    // mensagensEl.innerHTML = "";

    let indexImprimirMensagens = 0;

    let mensagensRecebidas = response.data;

    mensagensRecebidas = mensagensRecebidas.filter(filtrarMensagensReservadas);

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

        const templateMensagem = `<article class="mensagem ${mensagemRecebida.type}" data-identifier="message">
        <p class="mensagem__conteudo"><span class="mensagem__horario">(${mensagemRecebida.time})</span> <span class="mensagem__nome">${mensagemRecebida.from}</span> ${paraQuem} <span class="mensagem__nome">${mensagemRecebida.to}</span> ${mensagemRecebida.text}</p>
        </article>`; // TEMPORÁRIO -> MUDAR O "PARA" PARA DINAMICO DEPENDENDO DA MENSAGEM'

        mensagensEl.innerHTML += templateMensagem;

        mensagensEl.lastChild.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    }

    primeiraVezBuscandoMensagens = false

}

function filtrarMensagensReservadas(mensagem) {
    if (mensagem.type === "private_message" && !(mensagem.from === usuario.name || mensagem.to === usuario.name)) {
        return false
    } else {
        return true
    }
}

function buscarParticipantes() {
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/uol/participants");
    promise.then(imprimirParticipantes);
}

function imprimirParticipantes(response) {
    const listaUsuariosEl = document.querySelector(".menu-lateral__lista.usuarios");

    participantesRecebidos = response.data;

    let participantesNovos = participantesRecebidos.filter(filtrarParticipantesNovos)
    let participantesAntigos = listaUsuariosAnterior.filter(filtrarParticipantesAntigos)

    for (let i = 0; i < participantesNovos.length; i++) {
        const participante = participantesNovos[i];

        const templateUsuarioLista = `<li class="menu-lateral__item usuario" id="${participante.name}" onclick="selecionarUsuario(this)" data-identifier="participant">${participante.name}</li>`;

        if (participante.name === usuario.name) {
            continue;
        }

        listaUsuariosEl.innerHTML += templateUsuarioLista;
    }

    const listaTodosUsuarios = [...document.querySelectorAll(".menu-lateral__item.usuario")]

    for (let i = 0; i < participantesAntigos.length; i++) {
        let participanteAntigo = participantesAntigos[i]

        for (let j = 0; j < listaTodosUsuarios.length; j++) {
            let usuarioLogado = listaTodosUsuarios[j];

            if (usuarioLogado.id === participanteAntigo.name) {
                usuarioLogado.remove();
            }
        }
    }

    if (document.querySelector(".menu-lateral__lista.usuarios .selecionado") === null) {
        selecionarUsuario(document.querySelector(".menu-lateral__item.todos"))
    }

    listaUsuariosAnterior = participantesRecebidos;
}

function filtrarParticipantesNovos(participanteRecebido) {
    achouUsuario = false

    for (let i = 0; i < listaUsuariosAnterior.length; i++) {
        let usuarioAnterior = listaUsuariosAnterior[i];
        if (participanteRecebido.name === usuarioAnterior.name) {
            achouUsuario = true
            break
        } else {
        }
    }

    if (achouUsuario !== true) {
        return true
    } else {
        return false
    }

}

function filtrarParticipantesAntigos(usuarioAnterior) {
    achoUsuarioAntigo = false

    for (let i = 0; i < participantesRecebidos.length; i++) {
        let participanteRecebido = participantesRecebidos[i];
        if (usuarioAnterior.name === participanteRecebido.name) {
            achoUsuarioAntigo = true
            break
        }
    }

    if (achoUsuarioAntigo !== true) {
        return true
    } else {
        return false
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
    buscarMensagens();
}

function enviarMensagemFalhou(erro) {
    alert("Vish, parece que você está desconectado. Faça o login de novo.");
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

    const loginInputEl = document.querySelector(".tela-login__input");
    loginInputEl.onkeydown = function (evento) {
        if (evento.code === "Enter") {
            cadastrarUsuario();
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

// cadastrarUsuarioHardCoded();
buscarMensagens();
intervaloBuscarMensagens = setInterval(buscarMensagens, TEMPOINTERVALOBUSCARMENSAGENS);
enviarMensagemTeclaEnter();