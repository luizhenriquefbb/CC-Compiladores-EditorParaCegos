import { Lexico } from "./scripts/lexico.js";
import { Sinttaico } from "./scripts/sintatico.js"
// var Lexico = require('./scripts/lexico');

function runLexico() {
    console.log("iniciando teste");
    var lexico = new Lexico();
    // var tokens = lexico.analyze("meu gato pos um ovo");
    var tokens = lexico.analyze(document.getElementById('inputArea').value);

    console.log(tokens);
}

var button = document.getElementById("buttonReproduce");
button.onclick = runLexico;
