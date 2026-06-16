// 1. Função para verificar a senha de entrada
function verificarSenha() {
    const senhaInserida = document.getElementById('senha').value;
    const mensagemErro = document.getElementById('erro-mensagem');

    if (senhaInserida === "AmorzinhoRq") {
        mensagemErro.style.color = "#00ff00";
        mensagemErro.innerText = "Acesso liberado... Carregando o jogo...";
        
        // Aqui, depois vamos disparar a função que esconde essa tela e abre o jogo da bolinha
        setTimeout(() => {
            alert("A senha deu certo! Pronto para a fase do jogo?");
            // Proximo passo: sumir com a 'tela-login' e iniciar o game.
        }, 1000);

    } else {
        mensagemErro.style.color = "#ff4d4d";
        mensagemErro.innerText = "Senha incorreta, tente de novo, vida.";
    }
}

// 2. Função para criar corações subindo na tela aleatoriamente
function criarCoracao() {
    const container = document.getElementById('fundo-coracoes');
    if (!container) return;

    const coracao = document.createElement('div');
    coracao.classList.add('coracao-subindo');
    coracao.innerHTML = '❤️'; // Ícone do coração

    // Posição horizontal aleatória (0 a 100% da largura da tela)
    coracao.style.left = Math.random() * 100 + 'vw';
    
    // Tamanhos aleatórios para dar profundidade
    const tamanho = Math.random() * 15 + 15; // Entre 15px e 30px
    coracao.style.fontSize = tamanho + 'px';

    // Tempo de subida aleatório (entre 3 e 6 segundos)
    const duracao = Math.random() * 3 + 3;
    coracao.style.animationDuration = duracao + 's';

    // Força um desvio para os lados aleatório usando a variável CSS que criamos
    const desvioHorizontal = (Math.random() * 200 - 100) + 'px';
    coracao.style.setProperty('--random-x', desvioHorizontal);

    container.appendChild(coracao);

    // Remove o coração do código depois que a animação terminar para não travar o PC/Celular
    setTimeout(() => {
        coracao.remove();
    }, duracao * 1000);
}

// Executa a função de criar corações a cada 300 milissegundos
setInterval(criarCoracao, 300);
