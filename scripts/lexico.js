import { Dicionario } from "./dicionario.js";
import { Token } from "./token.js";

export class Lexico {
    constructor(){
        this.dicionario = new Dicionario();
    }

    /**
     * Verifica se o caractere é um numero
     * @param {String} str 
     */
    isNumber(str){
        return /^[0-9]+$/.test(str);
    }
    
     /**
     * Verifica se o caractere é uma letra
     * @param {String} str 
     */
    isChar(str){
        return /^[a-zA-Z]+$/.test(str);
    }


     /**
      *  faz uma busca no dicionário para descobrir a classificação do token
      * @param {String} str token
      */
    classify(str){
        return this.dicionario.queryWord(str);
    }

    /**
     * Método principal que analiza e classifica toda a string
     * @param {String} program 
     */
    analyze(program){
        var line_count = 1;
        var token = "";
        var tam = program.length;
        var i = 0;
        var lex = "";
        var result = [];

        // verifica caractere a caractere
        while (i <= tam-1) {

            // incrementa a linha
            if (program[i] == '\n') {
                line_count += 1;
                // ignorar
                i+=1;
                token = '';
                continue;
            }

            // verifica se é um numero
            else if (this.isNumber(program[i])) {
                // ignorar
                i+=1;
                token = '';
                continue;
            }

            // Verifica se é letra
            else if (this.isChar(program[i])) {
                token += program[i];
                i += 1;
                while (i < tam) {    //Procura por mais letras (formar um token)
                    if (this.isChar(program[i])) {
                        token += program[i];
                        i += 1;
                    }

                    else
                        break;
                }

                // classificar:
                lex = this.classify(token);

                // colocar na resposta
                result.push(new Token(token, lex, line_count));

                // recomeçar
                token = '';
            }

            // nova palavra; separar o token
            else if([' ', '.', ','].includes(program[i])){
                // ignorar
                i+=1;
                token = '';
                continue;
            }
        }

        return result;
    }

    teste(str){
        console.log(str);
    }
}

// module.exports = Lexico;
