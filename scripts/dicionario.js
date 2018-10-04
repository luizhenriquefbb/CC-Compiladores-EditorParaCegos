
// import { execSQLQuery } from "../database/execSQLQuery.js";
import { dicionario } from "../database/dicionario.js";

export class Dicionario {
    constructor() {
        this.csv = null; // usado quando a busca por uma palavra é feita por um arquivo
    }


    /**
     * lê do BANCO DE DADOS
     * @param {String} word token
     */
    queryWord_banco(word) {
        var query = 'SELECT wordtype* FROM entries WHERE word LIKE ?';
        var data = [word];
        return execSQLQuery(query, data)[0];
    }

    /**
     * lê de ARQUIVO
     * @param {String} word token
     */
    queryWord_csv(word) {
        if (this.csv == null) {
            // this.buildCSV();
            this.readTextFile("file://database/dicionario.csv");

        }
        return this.csv[word];

    }

    /**
     * lê de um objeto
     * @param {String} word token
     */
    queryWord(word) {
        if (this.csv == null) {
            this.csv = dicionario;
        }
        return this.csv[word];

    }

    /**
     * Le de um arquivo csv o dicionário e coloca em um objeto do tipo chave valor, onde a chave é a palavra
     * em LOWERCASE e o valor é a classificação
     */
    // buildCSV() {
    //     var self = this;
    //     $(document).ready(function () {
    //         $.ajax({
    //             type: "GET",
    //             // url: "../database/dicionario.csv",
    //             url: "file:///media/luiz/sata/Documentos/ciencia_da_computacao/Compiladores/CC-Compiladores-EditorParaCegos/database/dicionario.csv",
    //             dataType: "text",
    //             success: function (data) { processData(data); }
    //         });
    //     });

    //     function processData(allText) {
    //         var allTextLines = allText.split(/\r\n|\n/);
    //         var entries = [];
    //         var result = {};


    //         for (const line of allTextLines) {
    //             entries = line.split('\t');
    //             result[entries[0]] = entries[1];
    //         }

    //         self.csv = result;
    //     }
    // }

     /**
     * Le de um arquivo csv o dicionário e coloca em um objeto do tipo chave valor, onde a chave é a palavra
     * em LOWERCASE e o valor é a classificação
     */
    readTextFile(file) {
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status == 0) {
                    var allText = rawFile.responseText;
                    
                    var allTextLines = allText.split(/\r\n|\n/);
                    var entries = [];
                    var result = {};
        
        
                    for (const line of allTextLines) {
                        entries = line.split('\t');
                        // TODO: colocar a chave em lowercase
                        result[entries[0]] = entries[1];
                    }
        
                    this.csv = result;
                }
            }
        }
        rawFile.send(null);
    }

}
