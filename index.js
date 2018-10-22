import { Lexico } from "./scripts/lexico.js";
import { Sintatico } from "./scripts/sintatico.js";
import { utils } from "./scripts/utils.js";

console.log("index.js");

// welcome sppech
// utils.printAndSpeak2("welcome. If you want me to repeat anything, just press 'esc' or continue by pressing 'enter'");



function runLexico() {
    console.log("iniciando teste");
    var lexico = new Lexico();

    // pegar o texto completo
    var myInputArea = document.getElementById('inputArea');
    var txtCompleto = String(myInputArea.value);
    var frases = txtCompleto.split(/[.!?]/);


    // separar em frases e analisar indivudalmente
    // for (const frase of frases) {
    for (var cont = 0; cont<frases.length;cont++){
        var frase = frases[cont];
    

        // não precisa analisar tokens vazios
        if (frase == '') {
            continue;
        }

        // recolocar o '.' no final da frase para a gramática aceitar

        var lexicoAnalise = lexico.analyze(frase+ '.');

        var lexicoTokens = lexicoAnalise.status == true ? lexicoAnalise.result : [];

        if(lexicoTokens.length > 0){
            var sintatico = new Sintatico(lexicoTokens);

            var sintaticoAnalise = sintatico.comecarAnalise()


            fillWords(sintaticoAnalise.tokens);
        }   



        // se alguma frase der errado, para a execução
        // selecionar a parte do texto que esta errada
        if (!lexicoAnalise.status || !sintaticoAnalise.status) {

            // analise lexica deu certo entao a sintatica deu errado
            if (lexicoAnalise.status) {
                // pegar o incio da frase
                let inicioFrase = encontrarInicioDaFrase(frases, cont); // apenas para testar

                // selecionar a frase toda
                setSelectionRange(myInputArea, inicioFrase, inicioFrase + frase.length);


            // lexica deu errado
            } else {
                // pegar a posicao inicial do token
                let posicaoInicial = encontrarIncioDoToken(lexicoAnalise.word, frases, cont); // apenas para testar

                // selecionar palavra errada
                setSelectionRange(myInputArea, posicaoInicial, posicaoInicial + lexicoAnalise.word.length);
            }


            // parar a execução do for
            break;
        }

        console.log(lexicoTokens);
    }

   
}

document.addEventListener('keyup', function(event) {
    if(event.keyCode == 112) {
            utils.printAndSpeak(utils.lastError);
    }
    else if(event.keyCode == 190) {
            runLexico();
    }
});

document.getElementById("buttonReproduce").onclick = runLexico;


/**
 * Seleciona uma substring do texto de um div
 * @param {Element} input 
 * @param {number} selectionStart 
 * @param {number} selectionEnd 
 */
function setSelectionRange(input, selectionStart, selectionEnd) {
    if (input.setSelectionRange) {
        input.focus();
        input.setSelectionRange(selectionStart, selectionEnd);
    }
    else if (input.createTextRange) {
        var range = input.createTextRange();
        range.collapse(true);
        range.moveEnd('character', selectionEnd);
        range.moveStart('character', selectionStart);
        range.select();
    }
}

function fillWords(tokens_list){
    var wordsDiv = document.getElementById('words');
    while (wordsDiv.firstChild) {
        wordsDiv.removeChild(wordsDiv.firstChild);
    }
    var pClassificacao = document.createElement('p');
    pClassificacao.id = 'pClass';
    pClassificacao.innerHTML = 'Word classification';
    wordsDiv.appendChild(pClassificacao);
    var ulWords = document.createElement('ul');
    ulWords.id = 'wordsUl';

    tokens_list.map(t =>{
        var nameLi = document.createElement('li');
        var wordLi = document.createElement('div')
        wordLi.innerHTML=t.word;
        wordLi.id = 'wordLi';
        nameLi.appendChild(wordLi);
        t.lex.map(l => {
            if(!t.hasOwnProperty('usedClassification')){
                var uncheckedLex = document.createElement('div');
                uncheckedLex.innerHTML = l.classificacao;
                uncheckedLex.id = 'uncheckedLex';
                nameLi.appendChild(uncheckedLex);
            }
            else if(l.classificacaoDetalhada == t.usedClassification || l.classificacao == t.usedClassification){
                var lexChosenName = document.createElement('div');
                lexChosenName.innerHTML = l.classificacao;
                lexChosenName.id = 'lexChosenName';
                nameLi.appendChild(lexChosenName);

            }
            else{
                var lexName = document.createElement('div');
                lexName.innerHTML = l.classificacao;
                lexName.id = 'lexName';
                nameLi.appendChild(lexName);

            }
        });
        ulWords.appendChild(nameLi);
        wordsDiv.appendChild(ulWords);
    });
}

/**
 * Função para testar setSelectionRange
 * @deprecated
 */
function select() {
    setSelectionRange(document.getElementById('inputArea'), 0, 3);
}

// document.getElementById("buttonReproduce").onclick = select;

/**
 * Para selecionar uma substring no div de entrada, é preciso conhecer onde a
 * frase começa.
 * @param {Array} frases conjunto de frases em array
 * @param {Number} numeroFrase a frase específica
 * @return {Number} caractere no qual a frase começa
 */
function encontrarInicioDaFrase(frases, numeroFrase) {
    var posicaoInicial = 0;
    for (var cont = 0; cont < frases.length && cont < numeroFrase; cont++) {
        var frase = frases[cont];
    
        //+1 por causa do '.'
        posicaoInicial+= frase.length+1;
    }

    return posicaoInicial;
}

function encontrarIncioDoToken(token, frases, numeroFrase){
    var posicaoInicial = 0;
    // frases anteriores
    for (var cont = 0; cont < frases.length && cont < numeroFrase; cont++) {
        var frase = frases[cont];

        //+1 por causa do '.'
        posicaoInicial+= frase.length+1;
    }

    // na frase onde aconteceu o problema
    posicaoInicial += frases[numeroFrase].indexOf(token);

    return posicaoInicial;
}




// para testes
// ██████╗  █████╗ ██████╗  █████╗     ████████╗███████╗███████╗████████╗███████╗███████╗
// ██╔══██╗██╔══██╗██╔══██╗██╔══██╗    ╚══██╔══╝██╔════╝██╔════╝╚══██╔══╝██╔════╝██╔════╝
// ██████╔╝███████║██████╔╝███████║       ██║   █████╗  ███████╗   ██║   █████╗  ███████╗
// ██╔═══╝ ██╔══██║██╔══██╗██╔══██║       ██║   ██╔══╝  ╚════██║   ██║   ██╔══╝  ╚════██║
// ██║     ██║  ██║██║  ██║██║  ██║       ██║   ███████╗███████║   ██║   ███████╗███████║
// ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝       ╚═╝   ╚══════╝╚══════╝   ╚═╝   ╚══════╝╚══════╝
//                                                                                       

var putOnLogView = function(str){
    var logs = document.getElementById("resultadoDosTestes");

    console.log(str);
    logs.innerText += str;
    logs.innerHTML += '<br>';
}

// botao de teste. Ele deve ser comekntado quando em produção
// document.getElementById("buttonTest").onclick = test;
/**
 * Método para testar frases. Comentar o botao quando em produção
 */
function test() {
    
    console.log("iniciando teste");
    var lexico = new Lexico();



    var frases = [
        "the book is on table",
        "my name is Luiz",
        "the book is on the table",
        "my cat put an egg",
        "I am tall",
        "the dog are sleeping",
        "the dog is sleeping",
        "the dogs are sleeping",
        "the dogs is sleeping",
        "dhsfofhs"
    ];

    // separar em frases e analisar indivudalmente
    // for (const frase of frases) {
    for (var cont = 0; cont < frases.length; cont++) {
        var frase = frases[cont];


        // não precisa analisar tokens vazios
        if (frase == '') {
            continue;
        }

        // recolocar o '.' no final da frase para a gramática aceitar

        var lexicoAnalise = lexico.analyze(frase + '.');

        var lexicoTokens = lexicoAnalise.status == true ? lexicoAnalise.result : [];

        var sintatico = new Sintatico(lexicoTokens);

        var sintaticoAnalise = sintatico.comecarAnalise()



        // print sucesso ou falha
        if (!lexicoAnalise.status || !sintaticoAnalise.status) {
           putOnLogView("frase errada: " + frase);

        } else {
           putOnLogView("sucesso na frase: " + frase);

        }

        console.log(lexicoTokens);
    }
}