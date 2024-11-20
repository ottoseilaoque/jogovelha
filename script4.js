// seleciona todos os quadrados do jogo
const celulas = document.querySelectorAll('.quadrado');

// aparece quando alguém vence o jogo ou quando dá empate
const statusJogo = document.getElementById('status-jogo');

// botão de reiniciar
const botaoReiniciar = document.getElementById('reiniciar-jogo');

// inicia o jogo com os quadrados vazios
let tabuleiro = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];

// define o jogador X que está começando
let jogadorAtual = 'X';

// controla quando o jogo acaba
let jogoFinalizado = false;

// define as combinações que ganham o jogo
const combinacoesVencedoras = [
    // Linhas
    [0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15],

    // Colunas
    [0, 4, 8, 12], [1, 5, 9, 13], [2, 6, 10, 14], [3, 7, 11, 15],

    // Diagonais principais e secundárias
    [0, 5, 10, 15], [3, 6, 9, 12]
];

// função que atualiza o status do jogo
function atualizarStatus() {
    const vencedor = verificarVencedor();
    if (vencedor) {
        statusJogo.textContent = `Jogador ${vencedor} venceu!`;
        statusJogo.style.color = '#ff0080';
        jogoFinalizado = true;
    } else if (tabuleiro.every(celula => celula !== '')) {
        statusJogo.textContent = 'Empate!';
        statusJogo.style.color = '#ff0080';
        jogoFinalizado = true;
    } else {
        statusJogo.textContent = `Vez do jogador ${jogadorAtual}`;
        statusJogo.style.color = '#ff0080';
    }
}

// função que verifica se um jogador venceu
function verificarVencedor() {
    for (const [a, b, c, d] of combinacoesVencedoras) {
        if (tabuleiro[a] && tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c] && tabuleiro[a] === tabuleiro[d]) {
            return tabuleiro[a];
        }
    }
    return null;
}

// função chamada ao clicar em um quadrado
function aoClicar(evento) {
    const indice = evento.target.dataset.indice;

    if (tabuleiro[indice] || jogoFinalizado) return;

    tabuleiro[indice] = jogadorAtual;
    evento.target.textContent = jogadorAtual;
    evento.target.classList.add('tomada');
    jogadorAtual = jogadorAtual === 'X' ? 'O' : 'X';

    atualizarStatus();
}

// reinicia o jogo
function reiniciarJogo() {
    tabuleiro = Array(16).fill('');
    jogadorAtual = 'X';
    jogoFinalizado = false;

    statusJogo.textContent = `Vez do jogador ${jogadorAtual}`;
    statusJogo.style.color = '#ff0080';

    celulas.forEach(celula => {
        celula.textContent = '';
        celula.classList.remove('tomada');
    });
}

// adiciona os eventos de clique
celulas.forEach(celula => {
    celula.addEventListener('click', aoClicar);
});

// adiciona evento ao botão de reiniciar
botaoReiniciar.addEventListener('click', reiniciarJogo);

// inicia o status do jogo
atualizarStatus();
