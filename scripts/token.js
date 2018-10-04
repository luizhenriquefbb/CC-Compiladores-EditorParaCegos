export class Token{
    constructor(word, lex, line){
        this.word = word;    //texto do token
        this.lex = lex;      //classificação léxica
        this.line = line;    //linha

    }

    toString(){
        return `${this.word}, ${this.lex}, ${this.line}`
    }
}