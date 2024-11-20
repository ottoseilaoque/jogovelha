    // seleciona todos os quadrados do jogo
    const quadrados = document.querySelectorAll('.quadrado');
 
    // aparece quando alguém vence o jogo ou quando dá empate
    const statusJogo = document.getElementById('status-jogo');
 
    // apertar o botão de reiniciar
    const botaoReiniciar = document.getElementById('reiniciar-jogo');
 
    // inicia o jogo com os quadrados vazios
    let tabuleiro = ['', '', '', '', '', '', '', '', ''];
 
    // define o jogador X que está começando
    let jogadorAtual = 'X';
 
    // controla quando o jogo acaba
    let jogoFinalizado = false;
 
    // define as combinações que ganham o jogo
    const combinacoesVencedoras = [
        [0, 1, 2], // primeira linha reta
        [3, 4, 5], // segunda linha reta
        [6, 7, 8], // terceira linha reta
        [0, 3, 6], // primeira coluna
        [1, 4, 7], // segunda coluna
        [2, 5, 8], // terceira coluna
        [0, 4, 8], // diagonal
        [2, 4, 6]  // diagonal
    ];
 
    // Variáveis para o temporizador
    let tempoRestante = 15; // 15 segundos para cada rodada
    let temporizador; // referência para o setInterval
 
    // função que atualiza o status do jogo
    function atualizarStatus() {
        const vencedor = verificarVencedor(); // função para verificar se tem um vencedor
       
        if (vencedor) {
            // se tiver um vencedor, aparece a mensagem de vitória
            statusJogo.textContent = `Jogador ${vencedor} venceu!`;
            statusJogo.style.color = '#00ff99'; // Cor para o vencedor
            jogoFinalizado = true; // marca o jogo como finalizado
        } else if (tabuleiro.every(quadrado => quadrado !== '')) {
            // se todos os quadrados forem preenchidos e não ganharem, vai aparecer "Empate"
            statusJogo.textContent = 'Empate!';
            statusJogo.style.color = '#ff0080'; // Cor para empate
            jogoFinalizado = true; // marca o jogo como acabado
        } else {
            // Se não tiver vencedor nem empate, exibe a vez do jogador atual
            statusJogo.textContent = `Vez do jogador ${jogadorAtual}`;
            statusJogo.style.color = '#ff0080'; // cor padrão (rosa) para a vez do jogador
        }
    }
 
    // função que verifica se um jogador venceu
    function verificarVencedor() {
        // verifica todas as combinações vencedoras
        for (const [a, b, c] of combinacoesVencedoras) {
            if (tabuleiro[a] && tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c]) {
                return tabuleiro[a]; // retorna o vencedor ('X' ou 'O')
            }
        }
        return null; // se não tiver vencedor, retorna null
    }
 
    // função chamada ao clicar em um quadrado
    function aoClicar(evento) {
        // obtem o índice do quadrado clicado a partir do atributo data-indice
        const indice = evento.target.dataset.indice;
       
        // se o quadrado já for preenchido ou o jogo acabou, não faz nada
        if (tabuleiro[indice] || jogoFinalizado) return;
       
        // preenche o tabuleiro com o jogador atual ('X' ou 'O')
        tabuleiro[indice] = jogadorAtual;
       
        // atualiza o conteúdo do quadrado com o símbolo do jogador
        evento.target.textContent = jogadorAtual;
       
        // adiciona a classe 'tomada' para indicar que o quadrado foi clicado
        evento.target.classList.add('tomada');
       
        // troca o jogador entre 'X' e 'O'
        jogadorAtual = jogadorAtual === 'X' ? 'O' : 'X';
       
        // atualiza o status da partida
        atualizarStatus();
       
        // reinicia o temporizador se já estiver em andamento
        if (tempoRestante > 0) {
            clearInterval(temporizador);
        }
        tempoRestante = 15; // reinicia o tempo
        iniciarTemporizador(); // inicia o temporizador
    }
 
    // reinicia o jogo
    function reiniciarJogo() {
        // reinicia o tabuleiro com os quadrados vazios
        tabuleiro = ['', '', '', '', '', '', '', '', ''];
       
        // reinicia o jogador X
        jogadorAtual = 'X';
       
        // jogo não está mais finalizado
        jogoFinalizado = false;
       
        // exibe de quem é a vez do jogo
        statusJogo.textContent = `Vez do jogador ${jogadorAtual}`;
        statusJogo.style.color = '#ff0080'; // cor rosa para o primeiro jogador
       
        // limpa o conteúdo e a classe 'tomada' de todos os quadrados
        quadrados.forEach(quadrado => {
            quadrado.textContent = ''; // Limpa o texto dos quadrados
            quadrado.classList.remove('tomada'); // remove a classe 'tomada'
        });
       
        // reinicia o temporizador
        clearInterval(temporizador);
        tempoRestante = 15;
        iniciarTemporizador(); // inicia o temporizador
    }
 
    // Função para iniciar o temporizador
    function iniciarTemporizador() {
        temporizador = setInterval(() => {
            if (tempoRestante > 0 && !jogoFinalizado) {
                tempoRestante--;
                // Exibe o tempo restante
                statusJogo.textContent = `Vez do jogador ${jogadorAtual} - Tempo restante: ${tempoRestante}s`;
            } else if (tempoRestante === 0) {
                // Quando o tempo acaba, troca o jogador e atualiza o status
                jogadorAtual = jogadorAtual === 'X' ? 'O' : 'X';
                tempoRestante = 15; // reinicia o tempo para a próxima rodada
                atualizarStatus(); // atualiza o status do jogo
            }
        }, 1000); // atualiza o tempo a cada segundo
    }
 
    // add o evento de click nos quadrados
    quadrados.forEach(quadrado => {
        quadrado.addEventListener('click', aoClicar); // Quando um quadrado for clicado, chama a função 'aoClicar'
    });
 
    // add o evento de clicar no botão de reiniciar o jogo
    botaoReiniciar.addEventListener('click', reiniciarJogo); // quando o botão de reiniciar for clicado, chama a função 'reiniciarJogo'
 
    // inicia o status do jogo ao carregar a página
    atualizarStatus