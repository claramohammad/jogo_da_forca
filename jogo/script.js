// Palavra digitada pelo usuário
let palavra = "";

// Array para armazenar as letras já adivinhadas
let letrasAdivinhadas = [];

// Número máximo de tentativas
const maxTentativas = 6;

// Contador de tentativas
let tentativas = 0;

// Função para solicitar a palavra ao usuário
function solicitarPalavra() {
  palavra = prompt("Digite a palavra para o jogo da forca:");
  palavra = palavra.toLowerCase().trim();
  if (!palavra.match(/^[a-z]+$/)) {
    alert("Por favor, digite apenas letras.");
    solicitarPalavra();
  }
}

// Função para inicializar o jogo
function iniciarJogo() {
  solicitarPalavra();
  exibirPalavraOculta();
  exibirTentativasRestantes();
  document.getElementById("submit-button").addEventListener("click", fazerJogada);
}
// Função para exibir a palavra oculta com as letras adivinhadas
function exibirPalavraOculta() {
  let palavraOculta = "";
  for (let i = 0; i < palavra.length; i++) {
    if (letrasAdivinhadas.includes(palavra[i])) {
      palavraOculta += palavra[i];
    } else {
      palavraOculta += "_";
    }
    palavraOculta += " ";
  }
  document.getElementById("word-container").textContent = palavraOculta;
}

// Função para exibir o número de tentativas restantes
function exibirTentativasRestantes() {
  document.getElementById("attempts-container").textContent = `Tentativas restantes: ${maxTentativas - tentativas}`;
}

// Função para fazer uma jogada
function fazerJogada() {
  const input = document.getElementById("letter-input").value.toLowerCase();
  if (input.length !== 1 || !input.match(/[a-z]/i)) {
    alert("Por favor, digite uma única letra.");
    return;
  }
  if (letrasAdivinhadas.includes(input)) {
    alert("Essa letra já foi adivinhada.");
    return;
  }
  letrasAdivinhadas.push(input);
  if (!palavra.includes(input)) {
    tentativas++;
  }
  exibirPalavraOculta();
  exibirTentativasRestantes();
  document.getElementById("letter-input").value = "";
  verificarFimDeJogo();
}

// Função para verificar o fim do jogo
function verificarFimDeJogo() {
  if (tentativas === maxTentativas) {
    alert("Você perdeu! A palavra correta era: " + palavra);
    reiniciarJogo();
  } else if (!document.getElementById("word-container").textContent.includes("_")) {
    alert("Parabéns! Você venceu!");
    reiniciarJogo();
  }
}

// Função para reiniciar o jogo
function reiniciarJogo() {
  letrasAdivinhadas = [];
  tentativas = 0;
  palavra = palavras[Math.floor(Math.random() * palavras.length)];
  exibirPalavraOculta();
  exibirTentativasRestantes();
}

// Iniciar o jogo quando a página carregar
window.addEventListener("load", iniciarJogo);
