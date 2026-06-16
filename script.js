// --- 1. GERADOR DE ELEMENTOS NO FUNDO (CRUZES E CORAÇÕES) ---
function criarElementoFundo() {
    const fundo = document.getElementById('fundo-animado');
    if (!fundo) return;

    const elemento = document.createElement('div');
    elemento.classList.add('elemento-subindo');

    if (Math.random() > 0.5) {
        elemento.innerHTML = '✝️'; 
        elemento.style.filter = "brightness(0)"; 
        elemento.style.fontSize = '22px';
    } else {
        elemento.innerHTML = '❤️';
        elemento.style.fontSize = Math.random() * 15 + 15 + 'px';
    }

    elemento.style.left = Math.random() * 95 + 'vw';
    const duracao = Math.random() * 4 + 4; 
    elemento.style.animationDuration = duracao + 's';

    fundo.appendChild(elemento);

    setTimeout(() => {
        elemento.remove();
    }, duracao * 1000);
}
setInterval(criarElementoFundo, 400);


// --- 2. VERIFICAÇÃO DE SENHA ---
function verificarSenha() {
    const senhaInserida = document.getElementById('senha').value;
    const msgErro = document.getElementById('erro-mensagem');

    if (senhaInserida === "AmorzinhoRq") {
        document.getElementById('tela-login').classList.add('escondido');
        document.getElementById('tela-jogo').classList.remove('escondido');
        inicializarJogo();
    } else {
        msgErro.innerHTML = "Digite 'AmorzinhoRq' ai vai dar certo amor 🥰❤️";
    }
}


// --- 3. SISTEMA DO JOGO DA BOLINHA NEON (CORRIGIDO) ---
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

    campo.addEventListener('mousemove', moverBolinhaMouse);
    campo.addEventListener('touchmove', moverBolinhaTouch, { passive: false });

    loopJogo = setInterval(criarItemQueda, 750); // Itens descem um pouquinho mais rápido
}

function atualizarPlacar() {
    document.getElementById('pts-coracoes').innerText = coracoesColetados;
    document.getElementById('pts-erros').innerText = errosCometidos;
}

function moverBolinhaMouse(e) {
    if (!jogoAtivo) return;
    const rect = campo.getBoundingClientRect();
    let x = e.clientX - rect.left - 12.5; 
    definirPosicaoBolinha(x, rect.width);
}

function moverBolinhaTouch(e) {
    if (!jogoAtivo) return;
    e.preventDefault(); 
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
    
    const ehCoracao = Math.random() > 0.4;
    item.innerHTML = ehCoracao ? '❤️' : '🏹';
    item.dataset.tipo = ehCoracao ? 'bom' : 'ruim';

    const larguraCampo = campo.clientWidth;
    item.style.left = Math.random() * (larguraCampo - 25) + 'px';
    item.style.top = '0px';
    campo.appendChild(item);

    let posicaoY = 0;
    let queda = setInterval(() => {
        if (!jogoAtivo) {
            clearInterval(queda);
            item.remove();
            return;
        }

        posicaoY += 4; 
        item.style.top = posicaoY + 'px';

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
                    ganharJogo(); // AQUI: Chamando a função com o nome certinho!
                }
            } else {
                errosCometidos++;
                atualizarPlacar();
                if (errosCometidos >= 3) {
                    perderJogo();
                }
            }
        }

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
    document.querySelectorAll('.item-jogo').forEach(el => el.remove());
    inicializarJogo(); 
}

function ganharJogo() {
    jogoAtivo = false;
    clearInterval(loopJogo);
    // Limpa o campo de jogo
    document.querySelectorAll('.item-jogo').forEach(el => el.remove());
    // Faz a troca de telas sem travar em loop
    document.getElementById('tela-jogo').classList.add('escondido');
    document.getElementById('tela-final').classList.remove('escondido');
}

// --- 4. FUNÇÃO PARA COPIAR GMAIL E SENHA COMTEMPORÂNEO ---
function copiarDados() {
    const textoParaCopiar = "Gmail: georaquel.2026 | Senha: 13022026Rg.";
    
    // Tenta usar a API moderna de copiar do navegador
    navigator.clipboard.writeText(textoParaCopiar).then(() => {
        const aviso = document.getElementById('aviso-copiado');
        aviso.innerText = "Copiado com sucesso! ❤️ Copiado: georaquel.2026";
        
        // Faz brotar um monte de corações extras na hora do clique!
        for(let i=0; i<15; i++) {
            setTimeout(criarElementoFundo, i * 80);
        }
    }).catch(err => {
        // Caso o celular bloqueie a API por privacidade, mostra na tela estruturado
        alert("Dados para entrar:\n\nGmail: georaquel.2026\nSenha: 13022026Rg.");
    });
}
