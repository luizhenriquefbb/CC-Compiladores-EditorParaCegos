import { Lexico } from "./scripts/lexico.js";
import { Sintatico } from "./scripts/sintatico.js";

console.log("index.js");

function runLexico() {
    console.log("iniciando teste");
    var lexico = new Lexico();

    // pegar o texto completo
    var txtCompleto = String(document.getElementById('inputArea').value);
    var frases = txtCompleto.split(/[.!?]/);

    // separar em frases e analisar indivudalmente
    for (const frase of frases) {
        
        // não precisa analisar tokens vazios
        if (frase == '') {
            continue;
        }

        // recolocar o '.' no final da frase para a gramática aceitar
        var tokens = lexico.analyze(frase+'.');
    
        var sintatico = new Sintatico(tokens);
    
        // se alguma frase der errado, para a execução
        if (sintatico.comecarAnalise() == false){
            break;
        }
    
        console.log(tokens);
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