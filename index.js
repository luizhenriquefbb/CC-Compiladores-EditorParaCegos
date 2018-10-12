import { Lexico } from "./scripts/lexico.js";
import { Sintatico } from "./scripts/sintatico.js";


function runLexico() {
    console.log("iniciando teste");
    var lexico = new Lexico();
    var tokens = lexico.analyze(String(document.getElementById('inputArea').value).toLowerCase());

    var sintatico = new Sintatico(tokens);

    sintatico.comecarAnalise();

    console.log(tokens);
}

var button = document.getElementById("buttonReproduce");
button.onclick = runLexico;