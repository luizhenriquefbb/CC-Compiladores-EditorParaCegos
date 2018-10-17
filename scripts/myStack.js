/**
 * Pilha para a análise semantica. 
 */

import { Dicionario } from "./dicionario.js";


export class MyStack {

    constructor() {
        this.pilha = []; //pilha de tipos 


        this.Dicionario = new Dicionario();
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
    pop() {
        this.pilha.pop();
    }

    /**
     * Reduz a pilha analisando singular vs plural
     * 
     * ex: the boys want a apples
     * 
     * @returns retorna um objeto {status: [true ou false], erro: [caso tenha dado errado, explica qual o erro para exibir ao usuario]}
     */
    reduz_numero() {
        // verifica se a pilha tem ao menos 2 elementos para serem comparados
        if (this.pilha.length < 2) {
            return { status: false, erro: "stack len is less than two" };
        }

        var topo = this.pilha[this.pilha.length - 1];
        var subTopo = this.pilha[this.pilha.length - 2];

        // pegar o 'numero' do topo
        var topoNumIsPlural = null;
        topo.lex.map((x) => {
            if (x["isPlural"] == false) {
                topoNumIsPlural = false;
            } else if (x["isPlural"] == true) {
                topoNumIsPlural = true;
            }
            // não coloco else, pq a chave pode nao estar setada, (estar vazia) e isso pode gerar um erro
        });

        // pegar o 'numero do subtopo
        var subTopoNumIsPlural = null;
        subTopo.lex.map((x) => {
            if (x["isPlural"] == false) {
                subTopoNumIsPlural = false;
            } else if (x["isPlural"] == true) {
                subTopoNumIsPlural = true;
            }
            // não coloco else, pq a chave pode nao estar setada, (estar vazia) e isso pode gerar um erro
        });

        // ver se são compativeis
        if (topoNumIsPlural == subTopoNumIsPlural) {
            this.atualiza_pct(topoNumIsPlural);
            return { status: true };
        } else {
            return { status: false, erro: `number incompatibility between the words ${topo.word} and ${subTopo.word}` }
        }

    }


    /**
     * Reduz a pilha analisando tempo verbal
     * 
     * ex: the books is on the table
     * 
     * @returns retorna um objeto {status: [true ou false], erro: [caso tenha dado errado, explica qual o erro para exibir ao usuario]}
     */
    reduz_tempo_verbal() {
        // verifica se a pilha tem ao menos 2 elementos para serem comparados
        if (this.pilha.length < 2) {
            return { status: false, erro: "stack len is less than two" };
        }

        var topo = this.pilha[this.pilha.length - 1];
        var subTopo = this.pilha[this.pilha.length - 2];


        // pegar o 'tempo verbal' do topo
        var topoTempoVerbal = null;
        topo.lex.map((x) => {
            if (x["tempoVerbal"] != undefined) {
                topoTempoVerbal = x["tempoVerbal"];
            }
        });

        // pegar o 'tempo verbal do subtopo
        var subTopoTempoVerbal = null;
        subTopo.lex.map((x) => {
            if (x["tempoVerbal"] != undefined) {
                subTopoTempoVerbal = x["tempoVerbal"];
            }
            // não coloco else, pq a chave pode nao estar setada, (estar vazia) e isso pode gerar um erro
        });

        // ver se são compativeis
        if (topoTempoVerbal == subTopoTempoVerbal) {
            this.atualiza_pct(topoTempoVerbal);
            return { status: true };
        } else {
            return { status: false, erro: `verbal incompatibility between the words ${topo.word} and ${subTopo.word}` }
        }

    }

    /**
     * Atualiza o topo da tabela de tipos.
     */
    atualiza_pct(tipo) {

        this.pilha.pop();
        this.pilha.pop();
        this.push(tipo);
    }

    /**
     * Retorna o topo da pilha sem dar pop
     */
    topo() {
        return this.pilha[-1];
    }
}