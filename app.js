let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10:');
}

exibirMensagemInicial();

function verificarNumeroEscolhido(){
    let numeroEscolhido = document.querySelector('input').value;
    
    if (numeroEscolhido == numeroSecreto){
        exibirTextoNaTela('h1', `Parabéns!! Você acertou!`);
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa'; 
        let palavraIr = tentativas > 1 ? 'foram' : 'foi';
        exibirTextoNaTela('p', `Ao total ${palavraIr} ${tentativas} ${palavraTentativa}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else{
        if(numeroSecreto > numeroEscolhido){
            exibirTextoNaTela('h1', `Poxa!! Você errou...`);
            exibirTextoNaTela('p', `Uma dica: o valor é maior que ${numeroEscolhido}`);
        }

        if(numeroSecreto < numeroEscolhido){
            exibirTextoNaTela('h1', `Poxa!! Você errou...`);
            exibirTextoNaTela('p', `Uma dica: o valor é menor que ${numeroEscolhido}`);
        }

        tentativas ++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroSorteado = parseInt(Math.random() * numeroLimite + 1);
    let quatidadeElementosEscolhidos = listaDeNumerosSorteados.length;

    if(quatidadeElementosEscolhidos == numeroLimite){
        listaDeNumerosSorteados = [];
    }

    if(listaDeNumerosSorteados.includes(numeroSorteado)){
        return gerarNumeroAleatorio();
    } else{
        listaDeNumerosSorteados.push(numeroSorteado);
        return numeroSorteado;
    }
}

function limparCampo(){
    numeroEscolhido = document.querySelector('input');
    numeroEscolhido.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio()
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}