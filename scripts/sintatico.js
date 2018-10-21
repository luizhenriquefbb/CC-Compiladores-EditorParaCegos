import { utils } from "./utils.js";
import { Dicionario } from "./dicionario.js";
import { MyStack } from "./myStack.js";
export class Sintatico {

    constructor(list_tokens) {
        console.log("Iniciando Sintatico");

        this.list_tokens = list_tokens;  //lista de tokens
        console.log(this.list_tokens);
        
        this.index = 0;      //índice do token atual
        this.current = this.list_tokens[0];    //token atual


        this.utils = utils;
        this.dicionario = new Dicionario();


        // Guarda o ultimo erro gerado para exibir ao usuário
        this.lastError = { mensagem: '', local: { word: '', wordPosition: 0 } };
        this.personNumberStack = new MyStack();
        this.tenseStack = new MyStack();


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

        this.lastError.mensagem = "Erro: O programa terminou, mas a análise não";
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
        //retorna a palavra se duplicada 
        let duplicatedWord = this.checaPalavraDuplicada();
        if(duplicatedWord != ''){
            this.utils.printAndSpeak('Invalid Sentence');
            this.lastError.mensagem = `Word \'${duplicatedWord}\' is duplicated.`
            this.utils.printAndSpeak(this.lastError.mensagem);
            return { status: false, mensagem: this.lastError };
        }

        if (!this.sentence()) {
            this.utils.printAndSpeak('Invalid Sentence');
            this.utils.printAndSpeak(this.lastError.mensagem);
            return { status: false, mensagem: this.lastError };
        } else {
            this.utils.printAndSpeak("Sentence ok");
            return { status: true };
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
     * S -> Aux NP VP
          | NP VP
          | VP
     */
    sentence() {

        if (!this.current) {
            return false;
        }

        if (this.nounPhrase())
            this.personNumberStack.push(this.list_tokens[this.index - 1]);


        if (!this.verbPhrase()) {
            return false;
        }

        if (['.', '!', '?'].includes(this.current.word))
            return true;
        else
            return false;

    }

    /**
     * VP -> Aux Verb Adv VP2
           | Verb VP2
           | Verb NP VP2
           | Verb NP PP VP2
           | Verb PP VP2
     */
    verbPhrase() {


        if (!this.isAuxiliar() && this.isVerb()) {

            this.personNumberStack.push(this.list_tokens[this.index - 1])
            var message = this.personNumberStack.reduz_pessoa();
            if (message != 'ok') {
                this.lastError.mensagem = message;
                return false;
            }
            if (this.nounPhrase()) {
                this.preposition();
                if (!this.verbPhrase_2())
                    return false;

                return true;
            }
            else if (this.preposition()) {
                if (!this.verbPhrase_2())
                    return false;
                return true;
            }
            else if (this.verbPhrase_2()) {
                return true;
            }
            else {
                if (!this.verbPhrase_2())
                    return false;

                return true; //apenas verbo
            }
        }


        else if (this.isAuxiliar()) {
            
            this.next();
            this.personNumberStack.push(this.list_tokens[this.index - 1])
            var message = this.personNumberStack.reduz_pessoa();
            if (message != 'ok') {
                this.lastError.mensagem = message;
                return false;
            }

            this.tenseStack.push(this.list_tokens[this.index - 1])
            

            if (!this.isVerb())
                return false;
            this.tenseStack.push(this.list_tokens[this.index - 1])
            var message = this.tenseStack.reduz_tempo_verbal();
            if (message != 'ok') {
                this.lastError.mensagem = message;
                return false;
            }
            this.isAdverb();
            if (!this.verbPhrase_2())
                return false;

            return true;
            
        }
        else {
            return false;
        }

    }

    /**
     * Retirando a recursividade a esquerda do método verbPhrase
     * 
     *     VP2 -> PP VP2
     *          | ε
     */
    verbPhrase_2() {
        if (this.preposition()) {
            return this.verbPhrase_2();
        }
        else {
            return true; // epsilon
        }
    }

    /**
     * NP -> Pronoun
           | Proper_noun
           | Determinant Adj Nominal
     */
    nounPhrase() {
        if (this.isPronoun())
            return true;
        else if (this.isProperNoun())
            return true;
        else if (this.isDeterminer()) {

            this.isAdjective();
            if (this.nominal())
                return true;
        }
        else if (this.nominal()) {
            return true;
        }
        else if (this.isAdjective()) {
            return true;
        }
        return false;
    }

    /**
     * Nominal -> Noun Nominal2
     */
    nominal() {
        if (this.isNoun()) {
            if (this.nominal_2())
                return true;
        }
        return false;
    }

    /**
     * Tratando a recursividade a esquerda do método nominal()
     * 
     * Nominal2 -> PP Nominal2
                 | Noun Nominal2
                 | ε
     */
    nominal_2() {

        if (this.isNoun()) {
            if (this.nominal_2())
                return true;
            return false;
        }
        else if (this.preposition()) {
            if (this.nominal_2())
                return true;
            return false;
        }
        return true; //epsilon
    }

    /**
     * PP -> Preposition NP
     */
    preposition() {
        if (this.isPreposition()) {
            // this.next();
            if (this.nounPhrase())
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
        this.current.lex.map((x) => {
            if (x.classificacao == this.dicionario.NOUN)
                retorno = true;
        }
        );
        if (retorno) {
            this.current['usedClassification'] = this.dicionario.NOUN;
            this.next();
            return true;
        }


        this.lastError.mensagem = `expected a 'noun' before '${this.current.word}' ( word number ${this.index + 1} )`;
        this.lastError.local = { word: this.current.word, wordPosition: this.index };
        return false;
    }

    isVerb() {

        var retorno = false;
        this.current.lex.map((x) => {
            if (x.classificacao == this.dicionario.VERB)
                retorno = true;
        }
        );
        if (retorno) {
            this.current['usedClassification'] = this.dicionario.VERB;
            this.next();
            return true;
        }

        this.lastError.mensagem = `expected a 'verb' before '${this.current.word}' ( word number ${this.index + 1} )`;
        this.lastError.local = { word: this.current.word, wordPosition: this.index };
        return false;
    }

    isAdverb() {

        var retorno = false;
        this.current.lex.map((x) => {
            if (x.classificacao == this.dicionario.ADVERB)
                retorno = true;
        }
        );
        if (retorno) {
            this.current['usedClassification'] = this.dicionario.ADVERB;
            this.next();
            return true;
        }

        this.lastError.mensagem = `expected a 'adverb' before '${this.current.word}' ( word number ${this.index + 1} )`;
        this.lastError.local = { word: this.current.word, wordPosition: this.index };
        return false;
    }

    isDeterminer() {

        var retorno = false;
        this.current.lex.map((x) => {
            if (x.classificacao == this.dicionario.DETERMINER)
                retorno = true;
        }
        );
        if (retorno) {
            this.current['usedClassification'] = this.dicionario.DETERMINER;
            this.next();
            return true;
        }

        this.lastError.mensagem = `expected a 'determiner' before '${this.current.word}' ( word number ${this.index + 1} )`;
        this.lastError.local = { word: this.current.word, wordPosition: this.index };
        return false;
    }


    isPreposition() {

        var retorno = false;
        this.current.lex.map((x) => {
            if (x.classificacao == this.dicionario.PREPOSITION)
                retorno = true;
        }
        );
        if (retorno) {
            this.current['usedClassification'] = this.dicionario.PREPOSITION;
            this.next();
            return true;
        }

        this.lastError.mensagem = `expected a 'preposition' before '${this.current.word}' ( word number ${this.index + 1} )`;
        this.lastError.local = { word: this.current.word, wordPosition: this.index };
        return false;
    }

    /**
     * Tratando substantivos próprios apenas verificando se a palavra começa com letra maiúscula
     */
    isProperNoun() {
        if (this.current.lex[0].classificacao == this.dicionario.PROPER_NOUN) {
            this.current['usedClassification'] = this.dicionario.PROPER_NOUN;
            this.next();
            return true;
        }
        this.lastError.mensagem = `expected a 'proper-noun' before after '${this.current.word}' ( word number ${this.index + 1} )`;
        this.lastError.local = { word: this.current.word, wordPosition: this.index };
        return false
    }

    isPronoun() {

        var retorno = false;
        this.current.lex.map((x) => {
            if (x.classificacao == this.dicionario.PRONOUN)
                retorno = true;
        }
        );
        if (retorno) {
            this.current['usedClassification'] = this.dicionario.PRONOUN;
            this.next();
            return true;
        }

        this.lastError.mensagem = `expected a 'pronoum' before '${this.current.word}' ( word number ${this.index + 1} )`;
        this.lastError.local = { word: this.current.word, wordPosition: this.index };
        return false;
    }

    isAdjective() {

        var retorno = false;
        this.current.lex.map((x) => {
            if (x.classificacao == this.dicionario.ADJECTIVE)
                retorno = true;
        }
        );
        if (retorno) {
            this.current['usedClassification'] = this.dicionario.ADJECTIVE;
            this.next();
            return true;
        }

        this.lastError.mensagem = `expected an 'adjective' before '${this.current.word}' ( word number ${this.index + 1} )`;
        this.lastError.local = { word: this.current.word, wordPosition: this.index };
        return false;
    }

    /**
     * verificar se é um verbo aux: (look ahead vendo se tem dois verbos seguidos)
     */
    isAuxiliar() {
        var retorno = false;

        // ve se PODE ser auxiliar
        this.current.lex.map((x) => {
            if (x.classificacaoDetalhada == this.dicionario.AUXILIAR) {
                // verifica se o proximo é verbo
                this.list_tokens[this.index + 1].lex.map(y => {
                    if (y.classificacao == this.dicionario.VERB)
                        retorno = true;
                });
            }
        });

        if (retorno) {
            this.current['usedClassification'] = this.dicionario.AUXILIAR;
            // this.next();
            return true;
        }

        this.lastError.mensagem = `expected an 'auxiliar' before '${this.current.word}' ( word number ${this.index + 1} )`;
        this.lastError.local = { word: this.current.word, wordPosition: this.index };
        return retorno;
    }

    checaPalavraDuplicada(){
        // checando se tem palavra duplicada
        for (let i = 0; i < this.list_tokens.length - 1; i++) {
            if (this.list_tokens[i].word == this.list_tokens[i + 1].word) {
                this.utils.printAndSpeak('Invalid Sentence');
                this.lastError.mensagem = `Word ${this.list_tokens[i].word} duplicated`
                this.utils.printAndSpeak(this.lastError.mensagem);
                return { status: false, mensagem: this.lastError };
            }

        }
    }

}