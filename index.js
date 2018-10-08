import { Lexico } from "./scripts/lexico.js";
import { Sintatico } from "./scripts/sintatico.js";
// import { Sintatico } from "./scripts/sintatico.js";
// var Lexico = require('./scripts/lexico');

function runLexico() {
    console.log("iniciando teste");
    var lexico = new Lexico();
    // var tokens = lexico.analyze("meu gato pos um ovo");
    var tokens = lexico.analyze(document.getElementById('inputArea').value);

    var sintatico = new Sintatico(tokens);

    sintatico.comecarAnalise();

    console.log(tokens);
}

var button = document.getElementById("buttonReproduce");
// button.onclick = runLexico;
button.onclick = testAPI();

function testAPI(){
    console.log("testanto api");
    
    const APILEX = 'https://od-api.oxforddictionaries.com:443/api/v1/entries/en/';
    var palavra = 'the';
    $.ajax({
        type: 'GET',
        dataType: 'jsonp',
        timeout: 10,
        url: 'https://od-api.oxforddictionaries.com/api/v1/entries/en/the',
        headers : {
            "Access-Control-Allow-Origin": "*",
            "Accept": "application/json",
            "app_id": "e0344d9d",
            "app_key": "073d1e6843a8920ba15a0632123d5df1"
        },

        success: function (dataS) {
            alert("funcionou!");
            console.log(dataS);
    
        },
        error: function (error) {
            console.log(JSON.stringify(error));
            alert("TIME OUT - there is a network issue. Please try again later");
        },
        async: true,
        crossDomain: true
    });

    // var settings = {
    //     "async": true,
    //     "crossDomain": true,
    //     "url": "https://od-api.oxforddictionaries.com/api/v1/entries/en/the",
    //     "method": "GET",
    //     "dataType": "json",
    //     "headers": {
    //         "Accept": "application/json",
    //         "app_id": "e0344d9d",
    //         "app_key": "073d1e6843a8920ba15a0632123d5df1",
    //         "Cache-Control": "no-cache",
    //         "Postman-Token": "a9ccc040-0b8a-4f3f-99d5-9b88815075e0"
    //     }
    // }

    // $.ajax(settings).done(function (response) {
    //     alert('funcionou');
    //     console.log(response);
    // });

}