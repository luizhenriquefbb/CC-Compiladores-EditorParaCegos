export class Lexico {
    constructor(list_tokens){
        this.list_tokens = list_tokens;  //lista de tokens
        this.current =  null;    //token atual
        this.index = 0;      //índice do token atual
        this.tabela = SymbolsTable();    //tabela de símbolos
        this.cont_begin_end = 0;     //contador de begin e end
        this.pilha_tipos = TypesStack();     //pilha de tipos
    }


    /**
     * Retornar o próximo token da lista
     */
    next() {
        if( this.index < len(this.list_tokens)){ // verifica se o próximo índice pertence ao array
            this.current = this.list_tokens[this.index]; // pega o token atual
            // print (this.current)
            this.index += 1;
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
    has_id( token){
        // TODO: colocar na sintaxe de js
        if (!this.tabela.simbolo_na_tabela(token.word)){
            sys.exit("O símbolo '"+ token.word +"' na linha "+ str(token.line) +" não foi declarado")
        }
    }
}