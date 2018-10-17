import { Lexico } from "./scripts/lexico.js";
import { Sintatico } from "./scripts/sintatico.js";

console.log("index.js");

function runLexico() {
    console.log("iniciando teste");
    var lexico = new Lexico();
    var tokens = lexico.analyze(String(document.getElementById('inputArea').value));

    var sintatico = new Sintatico(tokens);

    sintatico.comecarAnalise();

    console.log(tokens);
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