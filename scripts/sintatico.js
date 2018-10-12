import * as dicionario from './dicionario.js'

console.log('olha aqui', dicionario.SUBSTANTIVO);

export class Sintatico {

    constructor(list_tokens) {
        console.log("Iniciando Sintatico");

        this.list_tokens = list_tokens;  //lista de tokens
        this.index = 0;      //índice do token atual
        this.current = this.list_tokens[this.index];    //token atual
        // this.tabela = SymbolsTable();    //tabela de símbolos
        this.cont_begin_end = 0;     //contador de begin e end
        // this.pilha_tipos = TypesStack();     //pilha de tipos
    }

    /**
     * Retornar o próximo token da lista
     */
    next() {
        if (this.index < this.list_tokens.length - 1) { // verifica se o próximo índice pertence ao array
            this.index += 1;
            this.current = this.list_tokens[this.index]; // pega o token atual
            // print (this.current)
            return this.current;
        }

        sys.exit("Erro: O programa terminou, mas a análise não")    // caso chegue ao fim da lista sem terminar o programa
        return null;
    }

    /**
     * Regride 1 no índice da lista de tokens.
     */
    regride_token() {
        this.index -= 1;
    }

    /**
     * Coloca um novo identificador na tabela de identificadores.
     */
    push_id(token, type) {
        this.tabela.push_simbolo(token.word, type);
    }


    /**
     * Verifica se um identificador está na tabela de identificadores.
     */
    has_id(token) {
        // TODO: colocar na sintaxe de js
        if (!this.tabela.simbolo_na_tabela(token.word)) {
            die("O símbolo '" + token.word + "' na linha " + str(token.line) + " não foi declarado")
        }
    }

    /**
     * Verifica se um idenficador está sendo usado ou declarado
     */
    verificar_id(token) {
        if (this.cont_begin_end) {
            this.has_id(token);
        }
        else {
            this.push_id(token.word, ".");
        }
    }

    /**
     * Verifica se o identificador é de um procedimento.
     * @param {String} token 
     */
    verificar_procedimento(token) {
        if (this.tabela.get_simbolo_tipo(token.word) == "procedure") {
            return true;
        }

        return false;
    }

    /**
     * Verifica se o topo da pilha de tipos é booleano
     */
    verfica_boolean() {

        if (this.pilha_tipos.topo() == "boolean") {    //[SMT] verifica se o resultado da expressão é booleano
            this.pilha_tipos.pop()  //[SMT] se for boolean, esvazia a pilha
        }
        else {
            sys.exit("Era esperado um valor booleano. Linha: " + str(this.current.line))

        }
    }

    /**
     * Verifica se é uma operação lógica ou não e reduz a pilha de tipos
     * @param {*} operador 
     */
    verficar_operacao(operador) {
        // TODO: colocar na sintaxe de js
        if (operador in ["and", "or"]) {
            if (!this.pilha_tipos.reduz_pct_logico()) { //[SMT] verifica se foi possível reduzir
                sys.exit("Incompatibilidade de tipos, eram esperado valores booleanos. Linha: " + str(this.current.line));

            }
        }
        else {
            if (!this.pilha_tipos.reduz_pct()) {    //[SMT] verifica se foi possível reduzir
                sys.exit("Incompatibilidade de tipos. Linha: " + str(this.current.line));
            }
        }
    }

    comecarAnalise() {
        if (!this.sentence())
            console.log('Sentença inválida');

        else {
            console.log("Sucesso");

        }
    }

    // sentence() {
    //     if (!this.nounPhrase())
    //         return false;
    //     if (!this.verbPhrase())
    //         return false;
    //     return true;
    // }

    // verbPhrase() {
    //     if (!this.verb())
    //         return false;
    //     if (!this.nounPhrase());
    //     return true;
    // }

    // nounPhrase() {
    //     if (!this.noun()) {
    //         if (!this.determinant())
    //             return false;

    //         if (!this.noun())
    //             return false;
    //         return true;
    //     }
    // }

    // noun() {
    //     if (this.current.lex.indexOf(dicionario.SUBSTANTIVO) > -1) {
    //         this.next();
    //         return true;
    //     }
    //     return false;
    // }

    // verb() {
    //     if (this.current.lex.indexOf(dicionario.VERBO) > -1) {
    //         this.next();
    //         return true;
    //     }
    //     return false;
    // }

    // determinant() {
    //     if (this.current.lex.indexOf(dicionario.DETERMINANTE) > -1) {
    //         this.next();
    //         return true;
    //     }
    //     return false;
    // }
}