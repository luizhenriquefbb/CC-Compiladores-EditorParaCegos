import { Lexico } from "./scripts/lexico.js";
// import { Sintatico } from "./scripts/sintatico.js";
// var Lexico = require('./scripts/lexico');

function runLexico() {
    console.log("iniciando teste");
    var lexico = new Lexico();
    // var tokens = lexico.analyze("meu gato pos um ovo");
    var tokens = lexico.analyze(document.getElementById('inputArea').value);

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
        dataType: 'json',
        timeout: 60000, // sets timeout to 60 seconds
        url: 'https://od-api.oxforddictionaries.com/api/v1/entries/en/the',
        headers : {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
            "Accept": "application/json",
            "app_id": "e0344d9d",
            "app_key": "073d1e6843a8920ba15a0632123d5df1",
            'Access-Control-Allow-Methods' :'PUT, GET, POST',
            'Access-Control-Allow-Headers' : 'Origin, X-Requested-With, Content-Type, Accept'
        },
        data: {
            
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


}