
export class Dicionario {
    constructor() {
        console.log("Iniciando Dicionario");
        
        this.csv = null; // usado quando a busca por uma palavra é feita por um arquivo
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
