
// import { execSQLQuery } from "../database/execSQLQuery.js";
// import { dicionario } from "../database/dicionario.js";
export const SUBSTANTIVO = "noun"
export const VERBO = "verb"
export const DETERMINANTE = "determiner"

export default class Dicionario {
    constructor() {
    }

    /**
     * consulta uma palavra na API
     * @param {String} palavra token
     */
    queryWord(palavra) {
        console.log("Iniciando teste de api");
        var retorno = null;
        $.ajax({
            type: 'GET',
            dataType: 'json',
            timeout: 60000, // sets timeout to 60 seconds
            url: `https://googledictionaryapi.eu-gb.mybluemix.net/?define=${palavra}&lang=en`,
            success: function (dataS) {
                // console.log(dataS);
                retorno = dataS;
                
            },
            error: function (error) {

                console.log(JSON.stringify(error));
                // alert("TIME OUT - there is a network issue. Please try again later");
            },
            async: false,
        });
        return retorno;

    }

}
