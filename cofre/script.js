
let senhaSecreta;
let tentativas = 0;
const limite = 7;

// Selecionando os elementos do HTML
const campo = document.getElementById("numero");
const botao = document.getElementById("botaoTentar");
const feedback = document.getElementById("mensagem");
const contador = document.getElementById("contador");
const aviso = document.getElementById("alerta");
const cofre = document.getElementById("imagemCofre");
const overlay = document.getElementById("overview");

// Gera uma senha aleatória
function gerarSenha() {
    senhaSecreta = Math.floor(Math.random() * 50) + 1;
}

// Atualiza as tentativas na tela
function atualizarTentativas() {

    contador.innerText = (limite - tentativas) + " de 7";

    const luzes = document.querySelectorAll("#barras span");

    luzes.forEach(function(luz, indice) {

        if (indice < tentativas) {
            luz.classList.add("usada");
        } else {
            luz.classList.remove("usada");
        }

    });
}

// Verifica o número digitado
function conferirCodigo() {

    const valor = campo.value;
    const numero = Number(valor);

    if (valor === "") {
        feedback.innerText = "Digite um código primeiro.";
        return;
    }

    if (!Number.isInteger(numero) || numero < 1 || numero > 50) {
        feedback.innerText = "Digite um número inteiro entre 1 e 50.";
        return;
    }

    if (tentativas >= limite) {
        return;
    }

    tentativas++;

    atualizarTentativas();

    if (numero === senhaSecreta) {
        desbloquearCofre();
        return;
    }

    if (numero < senhaSecreta) {
        feedback.innerText = "A senha é maior! 🔼";
    } else {
        feedback.innerText = "A senha é menor! 🔽";
    }

    if (limite - tentativas === 2) {
        aviso.innerText = "ATENÇÃO: restam apenas 2 tentativas!";
    }

    if (tentativas === limite) {

        feedback.innerText = "ACESSO NEGADO. Tentativas esgotadas.";
        aviso.innerText = "O sistema foi bloqueado.";

        botao.disabled = true;
        campo.disabled = true;

    }

    campo.value = "";
}

// Abre o cofre
function desbloquearCofre() {

    feedback.innerText = "Código correto!";

    cofre.src = "imagens/Cofre aberto.png";
    cofre.alt = "Cofre aberto";

    document.getElementById("resultado").innerText =
        "Código descoberto em " + tentativas + " tentativa(s).";

    overlay.style.display = "flex";

    campo.disabled = true;
    botao.disabled = true;
}

// Reinicia todo o jogo
function reiniciar() {

    tentativas = 0;

    gerarSenha();
    atualizarTentativas();

    campo.value = "";
    campo.disabled = false;

    botao.disabled = false;

    feedback.innerText = "Aguardando tentativa...";
    aviso.innerText = "";

    cofre.src = "imagens/Cofre fechado.png";
    cofre.alt = "Cofre fechado";

    overlay.style.display = "none";
}

// Eventos dos botões
botao.addEventListener("click", conferirCodigo);

campo.addEventListener("keydown", function(evento) {

    if (evento.key === "Enter") {
        conferirCodigo();
    }

});

document.getElementById("botaoReiniciar")
    .addEventListener("click", reiniciar);

document.getElementById("botaoNovoJogo")
    .addEventListener("click", reiniciar);

// Inicia o jogo
reiniciar();
