// --- 1. GERADOR DE ELEMENTOS NO FUNDO (CRUZES E CORAÇÕES) ---
function criarElementoFundo() {
    const fundo = document.getElementById('fundo-animado');
    if (!fundo) return;

    const elemento = document.createElement('div');
    elemento.classList.add('elemento-subindo');

    // Alterna de forma aleatória entre uma Cruz Preta Simples e um Coração Vermelho
    if (Math.random() > 0.5) {
        elemento.innerHTML = '✝️'; // Cruz preta simples por emoji (renderiza preta na maioria dos sistemas)
        elemento.style.filter = "brightness(0)"; // Garante que fique totalmente pretinha
        elemento.style.fontSize = '22px';
    } else {
        elemento.innerHTML = '❤️';
        elemento.style.fontSize = Math.random() * 15 + 15 + 'px';
    }

    elemento.style.left = Math.random() * 95 + 'vw';
    const duracao = Math.random() * 4 + 4; // Entre 4 e 8 segundos
    elemento.style.animationDuration = duracao + 's';

    fundo.appendChild(elemento);

    setTimeout(() => {
        elemento.remove();
    }, duracao * 1000);
}
setInterval(criarElementoFundo, 400);


// --- 2. VERIFICAÇÃO DE SENHA MODIFICADA ---
function verificarSenha() {
    const senhaInserida = document.getElementById('senha').value;
    const msgErro = document.getElementById('erro-mensagem');

    if (senhaInserida === "AmorzinhoRq") {
        // Esconde a tela de login e exibe a tela do jogo!
        document.getElementById('tela-login').classList.add('escondido');
        document.getElementById('tela-jogo').classList.remove('escondido');
        inicializarJogo();
    } else {
        msgErro.innerHTML = "Digite 'AmorzinhoRq' ai vai dar certo amor 🥰❤️";
    }
}


// --- 3. SISTEMA DO JOGO DA BOLINHA NEON ---
let coracoesColetados = 0;
let errosCometidos = 0;
let jogoAtivo = false;
let loopJogo;

const campo = document.getElementById('campo-jogo');
const bolinha = document.getElementById('bolinha-neon');

function inicializarJogo() {
    coracoesColetados = 0;
    errosCometidos = 0;
    atualizarPlacar();
    jogoAtivo = true;

    // Controles para Celular (Touch) e PC (Mouse)
    campo.addEventListener('mousemove', moverBolinhaMouse);
    campo.addEventListener('touchmove', moverBolinhaTouch, { passive: false });

    // Começa a derrubar itens do topo do campo
    loopJogo = setInterval(criarItemQueda, 800);
}

function atualizarPlacar() {
    document.getElementById('pts-coracoes').innerText = coracoesColetados;
    document.getElementById('pts-erros').innerText = errosCometidos;
}

function moverBolinhaMouse(e) {
    if (!jogoAtivo) return;
    const rect = campo.getBoundingClientRect();
    let x = e.clientX - rect.left - 12.5; // Centraliza na bolinha (25px de largura)
    definirPosicaoBolinha(x, rect.width);
}

function moverBolinhaTouch(e) {
    if (!jogoAtivo) return;
    e.preventDefault(); // Evita a página de arrastar no celular
    const rect = campo.getBoundingClientRect();
    let x = e.touches[0].clientX - rect.left - 12.5;
    definirPosicaoBolinha(x, rect.width);
}

function definirPosicaoBolinha(x, larguraMax) {
    if (x < 0) x = 0;
    if (x > larguraMax - 25) x = larguraMax - 25;
    bolinha.style.left = x + 'px';
}

function criarItemQueda() {
    if (!jogoAtivo) return;

    const item = document.createElement('div');
    item.classList.add('item-jogo');
    
    // Define se cai um coração (bom) ou uma flecha (ruim)
    const ehCoracao = Math.random() > 0.4;
    item.innerHTML = ehCoracao ? '❤️' : '🏹';
    item.dataset.tipo = ehCoracao ? 'bom' : 'ruim';

    const larguraCampo = campo.clientWidth;
    item.style.left = Math.random() * (larguraCampo - 25) + 'px';
    item.style.top = '0px';
    campo.appendChild(item);

    // Motor de queda do item
    let posicaoY = 0;
    let queda = setInterval(() => {
        if (!jogoAtivo) {
            clearInterval(queda);
            item.remove();
            return;
        }

        posicaoY += 4; // Velocidade de descida
        item.style.top = posicaoY + 'px';

        // Checar Colisão com a Bolinha Neon
        const bRect = bolinha.getBoundingClientRect();
        const iRect = item.getBoundingClientRect();

        const colidiu = !(bRect.right < iRect.left || 
                          bRect.left > iRect.right || 
                          bRect.bottom < iRect.top || 
                          bRect.top > iRect.bottom);

        if (colidiu) {
            clearInterval(queda);
            item.remove();
            
            if (item.dataset.tipo === 'bom') {
                coracoesColetados++;
                atualizarPlacar();
                if (coracoesColetados >= 7) {
                    ganharJogo();
                }
            } else {
                errosCometidos++;
                atualizarPlacar();
                if (errosCometidos >= 3) {
                    perderJogo();
                }
            }
        }

        // Se passar do fundo do campo sem colidir
        if (posicaoY > campo.clientHeight) {
            clearInterval(queda);
            item.remove();
        }
    }, 20);
}

function perderJogo() {
    jogoAtivo = false;
    clearInterval(loopJogo);
    alert("Tente mais uma vez vida, você consegue! ❤️🏹");
    // Limpa os itens antigos que ficaram voando
    document.querySelectorAll('.item-jogo').forEach(el => el.remove());
    inicializarJogo(); // Reseta e recomeça
}

function ganarJogo() {
    jogoAtivo = false;
    clearInterval(loopJogo);
    // Esconde o jogo e mostra a linda carta final com a foto moldurada
    document.getElementById('tela-jogo').classList.add('escondido');
    document.getElementById('tela-final').classList.remove('escondido');
}
