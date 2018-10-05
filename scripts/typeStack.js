/**
 * Pilha de tipos. 
 */
export class TypesStack{

    constructor(){
        this.pilha = []; //pilha de tipos 

    }

    /**
     * Colocar um novo tipo na pilha
     */
    push(tipo) {
        this.pilha.push(tipo);
    }
    

    /**
     * Remover o tipo no topo da pilha
     */
    pop(){
        this.pilha.pop();
    }

    /**
     *  Reduz a pilha de tipos para operações aritiméticas.
     */
    reduz_pct(){

        // TODO: colocar na sintaxe de js
        try:
            topo = this.pilha[-1];
            subTopo = this.pilha[-2];
        except IndexError:
            return false


        if (topo == "integer" && subTopo == "integer")
            this.atualiza_pct("integer");

        else if (topo == "integer" and subTopo == "real")
            this.atualiza_pct("real");

        else if (topo == "real" && subTopo == "integer")
            this.atualiza_pct("real");

        else if (topo == "real" && subTopo == "real")
            this.atualiza_pct("real");

        else {
            console.log("Os tipos '"+ topo +"' e '"+ subTopo +"' não são compatíveis");
            return false;
        }
        return true;
    }


    /**
     * Redução da pilha de tipos para operações relacionais.
     */
    reduz_pct_relacional() {
        // TODO: colocar na sintaxe de js
        try:
            topo = this.pilha[-1]
            subTopo = this.pilha[-2]
        except IndexError:
            return false

        var tipos = ["integer","real"];

        // TODO: colocar na sintaxe de js
        if topo in tipos and subTopo in tipos:  //apenas para valores numéricos
            this.atualiza_pct("boolean")

        else {
            console.log("Os tipos '"+ topo +"' e '"+ subTopo +"' não são compatíveis");
            return false;
        }

        return true;
    }


    /**
     *  Redução da tabela de tipos para openrações lógicas.
     */
    reduz_pct_logico(){

        // TODO: colocar na sintaxe de js
        try:
            topo = this.pilha[-1]
            subTopo = this.pilha[-2]
        except IndexError:
            return false

        if (topo == "boolean" && subTopo == "boolean"){  //apenas para tipos booleanos 
            this.atualiza_pct("boolean");
            return true;
        }
        
        return false;
    }


    /**
     * Atualiza o topo da tabela de tipos.
     */
    atualiza_pct(tipo){

        this.pilha.pop();
        this.pilha.pop();
        this.push(tipo);
    }

    /**
     * Retorna o topo da pilha
     */
    topo(){
        return this.pilha[-1];
    }
}