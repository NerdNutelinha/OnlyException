function verificarSenha() {
    const senhaInserida = document.getElementById('senha').value;
    const mensagemErro = document.getElementById('Ainda não Vida');

    if (senhaInserida === "AmorzinhoRq") {
        mensagemErro.style.color = "#00ff00";
        mensagemErro.innerText = "Acesso liberado Amorzinho... Carregando o jogo...";
      
        setTimeout(() => {
            alert("Agora sim Vida, pronto para a fase do jogo?");
          
        }, 1000);

    } else {
        mensagemErro.style.color = "#ff4d4d";
        mensagemErro.innerText = "Ainda Não Amorzinho";
    }
}

function criarCoracao() {
    const container = document.getElementById('fundo-coracoes');
    if (!container) return;

    const coracao = document.createElement('div');
    coracao.classList.add('coracao-subindo');
    coracao.innerHTML = '❤️';

    coracao.style.left = Math.random() * 100 + 'vw';
    
    const tamanho = Math.random() * 15 + 15; // Entre 15px e 30px
    coracao.style.fontSize = tamanho + 'px';

    const duracao = Math.random() * 3 + 3;
    coracao.style.animationDuration = duracao + 's';

    const desvioHorizontal = (Math.random() * 200 - 100) + 'px';
    coracao.style.setProperty('--random-x', desvioHorizontal);

    container.appendChild(coracao);

    setTimeout(() => {
        coracao.remove();
    }, duracao * 1000);
}

setInterval(criarCoracao, 300);
