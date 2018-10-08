import { Lexico } from "./scripts/lexico.js";
import { Sintatico } from "./scripts/sintatico.js";

console.log("index.js");

function runLexico() {
    console.log("iniciando teste");
    var lexico = new Lexico();
    var tokens = lexico.analyze(String(document.getElementById('inputArea').value).toLowerCase());
    
    // var sintatico = new Sintatico(tokens);
    
    // sintatico.comecarAnalise();

    console.log(tokens);
}

document.getElementById("buttonReproduce").onclick = runLexico;