// 1. SELECIONAR os elementos do DOM
const campo = document.getElementById("tarefa");
const botao = document.getElementById("adicionar");
const lista = document.getElementById("lista");
const mensagem = document.getElementById("mensagem");
const contador = document.getElementById("contador");

// 2. FUNÇÃO que cria uma nova tarefa
function adicionarTarefa() {
    const texto = campo.value.trim();

    // Validacao: nao deixa adicionar uma tarefa vazia
    if (texto === "") {
        mensagem.textContent = "Escreva algo antes de adicionar.";
        campo.focus();
        return;
    }
    mensagem.textContent = "";

    // CRIAR elementos novos
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = texto; // textContent e seguro contra HTML malicioso

    const botaoRemover = document.createElement("button");
    botaoRemover.textContent = "remover";
    botaoRemover.className = "remove"; // Ajustado para bater com o listener abaixo
    botaoRemover.type = "button";

    // Montar a estrutura:
    li.appendChild(span);
    li.appendChild(botaoRemover);
    lista.appendChild(li);

    // Limpar o campo e voltar o foco para ele
    campo.value = "";
    campo.focus();

    atualizarContador();
}

// 3. FUNCAO que atualiza o texto contador
function atualizarContador() {
    const total = lista.querySelectorAll("li").length;
    const feitas = lista.querySelectorAll("li.concluida").length;

    if (total === 0) {
        contador.textContent = "Nenhuma tarefa ainda.";
    } else {
        contador.textContent = `${feitas} de ${total} concluida(s).`;
    }
}

// 4. EVENTOS

// Clique no botao "adicionar"
botao.addEventListener("click", adicionarTarefa);

// Apertar enter no campo tambem adiciona
campo.addEventListener("keydown", (evento) => {
    if (evento.key === "Enter") {
        adicionarTarefa();
    }
});

// Delegacao de eventos: um unico "ouvinte" na lista
lista.addEventListener("click", (evento) => {
    const alvo = evento.target;
    const li = alvo.closest("li");
    if (!li) return;

    if (alvo.classList.contains("remove")) {
        li.remove(); // REMOVER de DOM
    } else if (alvo.tagName === "SPAN") {
        li.classList.toggle("concluida"); // ALTERAR classe CSS
    }

    atualizarContador();
});

//TEMA CLARO / ESCURO
const botaotema = document.getElementById("tema");
const raiz = document.documentElement; //a tag html

function aplicarTema(tema) {
    raiz.setAttribute("data-tema", tema);
    botaotema.textContent = tema === "escuro" ? "tema claro" : "tema escuro";
}

//Ao abrir a pagina: usa o tema salvo ou , se nao houver o do sistema
const temaSalvo = localStorage.getItem("tema");
const sistemaEscuro = window.matchMedia("(prefers-color-scheme: dark)").matches;
aplicarTema(temaSalvo || (sistemaEscuro ? "escuro" : "claro"));

//Ao clicar: inverte o tema e salva a escolha
botaotema.addEventListener("click", () => {
    const atual = raiz.getAttribute("data-tema");
const novo = atual === "escuro" ? "claro" : "escuro";
aplicarTema(novo);
localStorage.setItem("tema", novo);
});