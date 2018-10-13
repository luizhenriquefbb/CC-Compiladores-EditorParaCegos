import { utils } from "./utils.js";
import { Dicionario } from "./dicionario.js";
export class Sintatico {

    constructor(list_tokens) {
        console.log("Iniciando Sintatico");

        this.list_tokens = list_tokens;  //lista de tokens
        this.index = 0;      //índice do token atual
        this.current = this.list_tokens[0];    //token atual
        
        this.cont_begin_end = 0;     //contador de begin e end
        

        this.utils = utils;
        this.dicionario = new Dicionario();


        // Guarda o ultimo erro gerado para exibir ao usuário
        this.lastError = ''; 
    }

    /**
     * Retornar o próximo token da lista
     */
    next() {
        if (this.index < (this.list_tokens).length) { // verifica se o próximo índice pertence ao array
            this.current = this.list_tokens[this.index]; // pega o token atual
            // print (this.current)
            this.index += 1;
            return this.current;
        }

        this.lastError = "Erro: O programa terminou, mas a análise não";
        throw ("Erro: O programa terminou, mas a análise não");    // caso chegue ao fim da lista sem terminar o programa
        return null;
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
        } else {
            this.utils.printAndSpeek("Sentence ok");
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
        return true;
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
            if(this.verbPhrase_2()){

            }
            else if(this.nounPhrase()){
                this.preposition();
                if(!this.verbPhrase_2())
                    return false;

                return true;
            }
            else if(this.preposition()){
                if(!this.verbPhrase_2())
                    return false;
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
        if (this.current.lex.includes(this.dicionario.NOUN)) {
            this.next();
            return true;
        }
        this.lastError = `expected a noum after '${this.current.word}' ( word number ${this.index} )`;
        return false;
    }

    isVerb() {
        if (this.current.lex.includes(this.dicionario.VERB)) {
            this.next();
            return true;
        }
        this.lastError = `expected a verb after '${this.current.word}' ( word number ${this.index} )`;
        return false;
    }

    isDeterminer() {
        if (this.current.lex.includes(this.dicionario.DETERMINER)) {
            this.next();
            return true;
        }
        this.lastError = `expected a determiner after '${this.current.word}' ( word number ${this.index} )`;
        return false;
    }


    isPreposition() {
        if (this.current.lex.includes(this.dicionario.PREPOSITION)) {
            this.next();
            return true;
        }
        this.lastError = `expected a preposition after '${this.current.word}' ( word number ${this.index} )`;
        return false;
    }

    /**
     * Nós não estamos tratando nomes próprios. Por isso, sempre retorna false
     */
    isProperNoun() {
        this.lastError = `expected a proper noum after '${this.current.word}' ( word number ${this.index} )`;
        return false
    }

    isPronoun(){
        // TODO
        this.next();
        this.lastError = `expected a pronoum after '${this.current.word}' ( word number ${this.index} )`;
        return true;
    }
}