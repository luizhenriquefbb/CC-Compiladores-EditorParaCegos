import { Lexico } from "./scripts/lexico.js";
import { Sintatico } from "./scripts/sintatico.js";

console.log("index.js");

function runLexico() {
    console.log("iniciando teste");
    var lexico = new Lexico();

    // pegar o texto completo
    var myInputArea = document.getElementById('inputArea');
    var txtCompleto = String(myInputArea.value);
    var frases = txtCompleto.split(/[.!?]/);

    // separar em frases e analisar indivudalmente
    for (const frase of frases) {

        // não precisa analisar tokens vazios
        if (frase == '') {
            continue;
        }

        // recolocar o '.' no final da frase para a gramática aceitar

        var lexicoAnalise = lexico.analyze(frase + '.');

        var lexicoTokens = lexicoAnalise.status == true ? lexicoAnalise.result : [];

        var sintatico = new Sintatico(lexicoTokens);

        var sintaticoAnalise = sintatico.comecarAnalise()



        // se alguma frase der errado, para a execução
        // selecionar a parte do texto que esta errada
        if (!lexicoAnalise.status || !sintaticoAnalise.status) {
            
            // TODO: pegar a posicao inicial do token
            let posicaoInicial = 0; // apenas para testar

            // analise lexica deu certo entao a sintatica deu errado
            if (lexicoAnalise.status) {
                // TODO: pegar o incio da frase
                let inicioFrase = 0; // apenas para testar

                // setSelectionRange(myInputArea, posicaoInicial, posicaoInicial+sintaticoAnalise.mensagem.local.word.length );
                setSelectionRange(myInputArea, posicaoInicial, inicioFrase + frase.length);

            // lexica deu errado
            } else {
                setSelectionRange(myInputArea, posicaoInicial, posicaoInicial + lexicoAnalise.word.length);
            }


            // parar a execução do for
            break;
        }

        console.log(lexicoTokens);
    }

}


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

/**
 * Função para testar setSelectionRange
 */
function select() {
    setSelectionRange(document.getElementById('inputArea'), 0, 3);
}

// document.getElementById("buttonReproduce").onclick = select;