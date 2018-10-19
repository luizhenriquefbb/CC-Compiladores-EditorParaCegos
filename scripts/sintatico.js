import { utils } from "./utils.js";
import { Dicionario } from "./dicionario.js";
export class Sintatico {

    constructor(list_tokens) {
        console.log("Iniciando Sintatico");

        this.list_tokens = list_tokens;  //lista de tokens
        this.index = 0;      //índice do token atual
        this.current = this.list_tokens[0];    //token atual
        
        
        this.utils = utils;
        this.dicionario = new Dicionario();


        // Guarda o ultimo erro gerado para exibir ao usuário
        this.lastError = ''; 

        
    }

    /**
     * Retornar o próximo token da lista
     */
    next() {
        if (this.index < (this.list_tokens).length - 1) { // verifica se o próximo índice pertence ao array
            this.index += 1;
            this.current = this.list_tokens[this.index]; // pega o token atual
            // print (this.current)
            return this.current;
        }

        this.lastError = "Erro: O programa terminou, mas a análise não";
        // this.current = {'lex':['default']};
        // console.log('Tokens acabaram. Usando token auxiliar para testar epsilon');
        
        throw ("Erro: O programa terminou, mas a análise não");    // caso chegue ao fim da lista sem terminar o programa
        // return null;
    }

    /**
     * Regride 1 no índice da lista de tokens.
     */
    regride_token() {
        this.index -= 1;
    }



    // Analise

    //  █████╗ ███╗   ██╗ █████╗ ██╗     ██╗███████╗███████╗
    // ██╔══██╗████╗  ██║██╔══██╗██║     ██║██╔════╝██╔════╝
    // ███████║██╔██╗ ██║███████║██║     ██║███████╗█████╗  
    // ██╔══██║██║╚██╗██║██╔══██║██║     ██║╚════██║██╔══╝  
    // ██║  ██║██║ ╚████║██║  ██║███████╗██║███████║███████╗
    // ╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝╚═╝╚══════╝╚══════╝
    //                                                              
    comecarAnalise() {
        console.log("Iniciando analise");


        if (!this.sentence()) {
            this.utils.printAndSpeek('Invalid Sentence');
            this.utils.printAndSpeek(this.lastError);
            return false;
        } else {
            this.utils.printAndSpeek("Sentence ok");
            return true;
        }


    }


    // Não terminais
    // ███╗   ██╗ █████╗  ██████╗     ████████╗███████╗██████╗ ███╗   ███╗██╗███╗   ██╗ █████╗ ██╗███████╗
    // ████╗  ██║██╔══██╗██╔═══██╗    ╚══██╔══╝██╔════╝██╔══██╗████╗ ████║██║████╗  ██║██╔══██╗██║██╔════╝
    // ██╔██╗ ██║███████║██║   ██║       ██║   █████╗  ██████╔╝██╔████╔██║██║██╔██╗ ██║███████║██║███████╗
    // ██║╚██╗██║██╔══██║██║   ██║       ██║   ██╔══╝  ██╔══██╗██║╚██╔╝██║██║██║╚██╗██║██╔══██║██║╚════██║
    // ██║ ╚████║██║  ██║╚██████╔╝       ██║   ███████╗██║  ██║██║ ╚═╝ ██║██║██║ ╚████║██║  ██║██║███████║
    // ╚═╝  ╚═══╝╚═╝  ╚═╝ ╚═════╝        ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝╚══════╝
    //                                                                                                    



    /**
     * S = NP VP | VP
     */
    sentence() {
        this.nounPhrase();

        if (!this.verbPhrase()) {
            return false;
        }

        if (['.','!','?'].includes(this.current.word))
            return true;
        else
            return false;
        
    }

    /**
     * VP = verb verbPhrase_2
     * | verb NP verbPhrase_2
     * | verb NP PP verbPhrase_2
     * | verb PP verbPhrase_2
     * | verbPhrase_2
     */
    verbPhrase() {
        if (this.isVerb()){
            if(this.nounPhrase()){
                this.preposition();
                if(!this.verbPhrase_2())
                    return false;

                return true;
            }
            else if(this.preposition()){
                if(!this.verbPhrase_2())
                    return false;
                return true;
            }
            else if(this.verbPhrase_2()){
                return true;
            }
            else{
                if(!this.verbPhrase_2())
                    return false;
                
                return true; //apenas verbo
            }  

        }
        else{
            return this.verbPhrase_2();
        }
       
    }

    /**
     * Retirando a recursividade a esquerda do método verbPhrase
     * 
     * verbPhrase_2 = PP VP_2 | ε
     */
    verbPhrase_2() {
        if (this.preposition()){
            return this.verbPhrase_2();
        }
        else{
            return true ; // epsilon
        }
    }

    /**
     * NP = pronoum 
     * | proper_noum 
     * | DET NOMINAL
     */
    nounPhrase() {
        if(this.isPronoun())
            return true;
        else if(this.isProperNoun())
            return true;
        else if(this.isDeterminer()){
            if(this.nominal())
                return true;
        }
        return false;
    }

    /**
     * NOMINAL = noun NOMINAL_2 |
     */
    nominal() {
        if (this.isNoun()){
            if (this.nominal_2())
                return true;
        }
        return false;
    }

    /**
     * Tratando a recursividade a esquerda do método nominal()
     * 
     * NOMINAL_2 = noun NOMINAL_2 
     * | PP NOMINAL_2 
     * | vazio
     */
    nominal_2() {

        if (this.isNoun()) {
            if (this.nominal_2())
                return true;
            return false;
        }
        else if(this.preposition()){
            if (this.nominal_2())
                return true;
            return false;
        }
        return true; //epsilon
    }

    /**
     * PP = preposition NP
     */
    preposition() {
        if(this.isPreposition()){
            // this.next();
            if(this.nounPhrase())
                return true;
        }
        return false;
    }




    // Terminais
    // ████████╗███████╗██████╗ ███╗   ███╗██╗███╗   ██╗ █████╗ ██╗███████╗
    // ╚══██╔══╝██╔════╝██╔══██╗████╗ ████║██║████╗  ██║██╔══██╗██║██╔════╝
    //    ██║   █████╗  ██████╔╝██╔████╔██║██║██╔██╗ ██║███████║██║███████╗
    //    ██║   ██╔══╝  ██╔══██╗██║╚██╔╝██║██║██║╚██╗██║██╔══██║██║╚════██║
    //    ██║   ███████╗██║  ██║██║ ╚═╝ ██║██║██║ ╚████║██║  ██║██║███████║
    //    ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝╚══════╝
    //                                                                     



    isNoun() {


        var retorno = false;
        this.current.lex.map( (x) => {
            if(x.classificacao == this.dicionario.NOUN)
                retorno = true;
            }
        );
        if(retorno){
            this.next();
            return true;
        }

        
        this.lastError = `expected a noum after '${this.current.word}' ( word number ${this.index+1} )`;
        return false;
    }

    isVerb() {

        var retorno = false;
        this.current.lex.map( (x) => {
            if(x.classificacao == this.dicionario.VERB)
                retorno = true;
            }
        );
        if(retorno){
            this.next();
            return true;
        }

        this.lastError = `expected a verb after '${this.current.word}' ( word number ${this.index} )`;
        return false;
    }

    isDeterminer() {

        var retorno = false;
        this.current.lex.map( (x) => {
            if(x.classificacao == this.dicionario.DETERMINER)
                retorno = true;
            }
        );
        if(retorno){
            this.next();
            return true;
        }

        this.lastError = `expected a determiner after '${this.current.word}' ( word number ${this.index} )`;
        return false;
    }


    isPreposition() {

        var retorno = false;
        this.current.lex.map( (x) => {
            if(x.classificacao == this.dicionario.PREPOSITION)
                retorno = true;
            }
        );
        if(retorno){
            this.next();
            return true;
        }

        this.lastError = `expected a preposition after '${this.current.word}' ( word number ${this.index} )`;
        return false;
    }

    /**
     * Tratando substantivos próprios apenas verificando se a palavra começa com letra maiúscula
     */
    isProperNoun() {
        if(this.current.word[0] === this.current.word[0].toUpperCase() ){
            this.next();
            return true;
        }
        this.lastError = `expected a proper noum after '${this.current.word}' ( word number ${this.index} )`;
        return false
    }

    isPronoun(){

        var retorno = false;
        this.current.lex.map( (x) => {
            if(x.classificacao == this.dicionario.PRONOME)
                retorno = true;
            }
        );
        if(retorno){
            this.next();
            return true;
        }

        this.lastError = `expected a pronoum after '${this.current.word}' ( word number ${this.index} )`;
        return false;
    }
}