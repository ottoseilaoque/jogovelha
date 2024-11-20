// seleciona todos os quadrados do jogo
const quadrados = document.querySelectorAll('.quadrado');
const statusJogo = document.getElementById('status-jogo');
const botaoReiniciar = document.getElementById('reiniciar-jogo');

let tabuleiro = ['', '', '', '', '', '', '', '', ''];
let jogadorAtual = 'X';
let jogoFinalizado = false;

const combinacoesVencedoras = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let tempoJogo = 60; 
let temporizadorJogo;

// Atualiza o status do jogo
function atualizarStatus() {
    const vencedor = verificarVencedor();
    if (vencedor) {
        statusJogo.textContent = `Jogador ${vencedor} venceu!`;
        statusJogo.style.color = '#00ff99';
        finalizarJogo();
    } else if (tabuleiro.every(quadrado => quadrado !== '')) {
        statusJogo.textContent = 'Empate!';
        statusJogo.style.color = '#ff0080';
        finalizarJogo();
    } else {
        statusJogo.textContent = `Vez do jogador ${jogadorAtual} - Tempo restante: ${tempoJogo}s`;
        statusJogo.style.color = '#ff0080';
    }
}

// Verifica o vencedor
function verificarVencedor() {
    for (const [a, b, c] of combinacoesVencedoras) {
        if (tabuleiro[a] && tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c]) {
            return tabuleiro[a];
        }
    }
    return null;
}

// Função chamada ao clicar em um quadrado
function aoClicar(evento) {
    const indice = evento.target.dataset.indice;
    if (tabuleiro[indice] || jogoFinalizado) return;

    tabuleiro[indice] = jogadorAtual;
    evento.target.textContent = jogadorAtual;
    evento.target.classList.add('tomada');
    jogadorAtual = jogadorAtual === 'X' ? 'O' : 'X';
    atualizarStatus();
}

// Reinicia o jogo
function reiniciarJogo() {
    tabuleiro = ['', '', '', '', '', '', '', '', ''];
    jogadorAtual = 'X';
    jogoFinalizado = false;
    statusJogo.textContent = `Vez do jogador ${jogadorAtual}`;
    statusJogo.style.color = '#ff0080';
    quadrados.forEach(quadrado => {
        quadrado.textContent = '';
        quadrado.classList.remove('tomada');
    });
    clearInterval(temporizadorJogo);
    tempoJogo = 60;
    iniciarTemporizadorJogo();
}

// Inicia o temporizador global
function iniciarTemporizadorJogo() {
    temporizadorJogo = setInterval(() => {
        if (tempoJogo > 0 && !jogoFinalizado) {
            tempoJogo--;
            atualizarStatus();
        } else {
            clearInterval(temporizadorJogo);
            statusJogo.textContent = 'Tempo esgotado! Fim do jogo.';
            statusJogo.style.color = '#ff0000';
            finalizarJogo();
        }
    }, 1000);
}

// Finaliza o jogo
function finalizarJogo() {
    jogoFinalizado = true;
    clearInterval(temporizadorJogo);
}

// Adiciona eventos
quadrados.forEach(quadrado => {
    quadrado.addEventListener('click', aoClicar);
});
botaoReiniciar.addEventListener('click', reiniciarJogo);

// Inicializa o jogo
reiniciarJogo();
