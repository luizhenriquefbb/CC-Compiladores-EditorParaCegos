/**
 * Pilha para a análise semantica.
 */

import { Dicionario } from "./dicionario.js";
// import * as _ from './libs/underscore.js'

export class MyStack {
    constructor() {
        this.pilha = []; //pilha de tipos

        this.Dicionario = new Dicionario();
    }

    /**
     * Colocar um novo tipo na pilha
     */
    push(element) {
        this.pilha.push(element);
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
    // reduz_numero() {
    //     // verifica se a pilha tem ao menos 2 elementos para serem comparados
    //     if (this.pilha.length < 2) {
    //         return { status: false, erro: "stack len is less than two" };
    //     }

    //     var topo = this.pilha[this.pilha.length - 1];
    //     var subTopo = this.pilha[this.pilha.length - 2];

    //     // pegar o 'numero' do topo
    //     var topoNumIsPlural = null;
    //     topo.lex.map(x => {
    //         if (x["isPlural"] == false) {
    //             topoNumIsPlural = false;
    //         } else if (x["isPlural"] == true) {
    //             topoNumIsPlural = true;
    //         }
    //         // não coloco else, pq a chave pode nao estar setada, (estar vazia) e isso pode gerar um erro
    //     });

    //     // pegar o 'numero do subtopo
    //     var subTopoNumIsPlural = null;
    //     subTopo.lex.map(x => {
    //         if (x["isPlural"] == false) {
    //             subTopoNumIsPlural = false;
    //         } else if (x["isPlural"] == true) {
    //             subTopoNumIsPlural = true;
    //         }
    //         // não coloco else, pq a chave pode nao estar setada, (estar vazia) e isso pode gerar um erro
    //     });

    //     // ver se são compativeis
    //     if (topoNumIsPlural == subTopoNumIsPlural) {
    //         this.atualiza_pct(topoNumIsPlural);
    //         return { status: true };
    //     } else {
    //         return {
    //             status: false,
    //             erro: `number incompatibility between the words ${topo.word} and ${
    //                 subTopo.word
    //                 }`
    //         };
    //     }
    // }

    /**
     * Reduz a pilha analisando pessoa vs pessoa
     *
     * ex: The girls is pretty (está errado)
     *
     * @returns retorna 'ok' se estiver certo ou uma string com o erro
     */
    reduz_tempo_verbal() {
        // verifica se a pilha tem ao menos 2 elementos para serem comparados
        if (this.pilha.length < 2) {
            // return { status: false, erro: "stack len is less than two" };
            return "ok";
        }

        var topo = this.pilha[this.pilha.length - 1];
        var subTopo = this.pilha[this.pilha.length - 2];

        console.log("topoVerbal", topo);
        console.log("subTopoVerbal", subTopo);

        // pegar o 'numero' do topo
        var topoPessoaNumero = [];
        topo.lex.map(x => {
            //ou seja, verbo auxiliar (is,am,are)
            if (x["tempoVerbal"])
                topoPessoaNumero.push({ tempoVerbal: x.tempoVerbal, person: 'all' });

            // não coloco else, pq a chave pode nao estar setada, (estar vazia) e isso pode gerar um erro
        });

        // pegar o numero do subtopo
        var subTopoVerbal = [];
        subTopo.lex.map(x => {
            //sempre verbo auxiliar
            if (x["personTenseNumber"]) {
                subTopoVerbal.push({ 'tempoVerbal': x.personTenseNumber[0].tense });
            }

            // não coloco else, pq a chave pode nao estar setada, (estar vazia) e isso pode gerar um erro
        });


        var retorno = false;
        topoPessoaNumero.map(topo => {
            subTopoVerbal.map(subtopo => {
                if (topo.person == subtopo.person) {
                    if (topo.number == subtopo.number) {
                        retorno = true;
                    }
                } else if (topo.person == "all" || subtopo.person == "all") {
                    if (topo.tempoVerbal == subtopo.tempoVerbal) {
                        retorno = true;
                    }
                }
            });
        });

        if (retorno) {
            this.atualiza_pct();
            return "ok";
        }
        return `Verb tense incompatibility between the words \'${topo.word}\' and \'${subTopo.word}\'`;

        // ve se são compativeis
        // if (topoNumero  == subTopoPessoa) {
        //     this.atualiza_pct(topoNumero );
        //     return { status: true };
        // } else {
        //     return { status: false, erro: `number incompatibility between the words ${topo.word} and ${subTopo.word}` }
        // }
    }

    /**
     * Reduz a pilha analisando pessoa vs pessoa
     *
     * ex: The girls is pretty (está errado)
     *
     * @returns retorna 'ok' se estiver certo ou uma string com o erro
     */
    reduz_pessoa() {
        // verifica se a pilha tem ao menos 2 elementos para serem comparados
        if (this.pilha.length < 2) {
            // return { status: false, erro: "stack len is less than two" };
            return "ok";
        }

        var topo = this.pilha[this.pilha.length - 1];
        var subTopo = this.pilha[this.pilha.length - 2];

        console.log("topoPessoaNumero", topo);
        console.log("subTopoPessoaNumero", subTopo);

        // pegar o 'numero' do topo
        var topoPessoaNumero = [];
        topo.lex.map(x => {
            //ou seja, verbo auxiliar (is,am,are)
            if (x["classificacaoDetalhada"] == this.Dicionario.AUXILIAR) {
                if (x["personTenseNumber"]) {
                    x["personTenseNumber"].map(y => {
                        topoPessoaNumero.push({ person: y.person, number: y.number });
                    });
                }
            } else if (x["personNumber"] && this.Dicionario.PRONOUN == topo.usedClassification) {
                x["personNumber"].map(y => {
                    topoPessoaNumero.push({ person: y.person, number: y.number });
                });
            } else if (x["isPlural"] == false && this.Dicionario.VERB == topo.usedClassification || this.Dicionario.NOUN == topo.usedClassification) {
                topoPessoaNumero.push({ person: "all", number: "singular" });
            } else if (x["isPlural"] == true && this.Dicionario.VERB == topo.usedClassification || this.Dicionario.NOUN == topo.usedClassification) {
                topoPessoaNumero.push({ person: "all", number: "plural" });
            }
            else if(x["classificacao"] == this.Dicionario.VERB && this.Dicionario.VERB == topo.usedClassification)
                topoPessoaNumero.push({ person: "all", number: "all" });
            // não coloco else, pq a chave pode nao estar setada, (estar vazia) e isso pode gerar um erro
        });

        // pegar o numero do subtopo
        var subTopoPessoaNumero = [];
        subTopo.lex.map(x => {
            //ou seja, pronome
            if (x["personNumber"] && this.Dicionario.PRONOUN == subTopo.usedClassification) {
                x["personNumber"].map(y => {
                    subTopoPessoaNumero.push({ person: y.person, number: y.number });
                });
            } else if (x["classificacaoDetalhada"] == this.Dicionario.AUXILIAR && this.Dicionario.AUXILIAR == subTopo.usedClassification) {
                if (x["personTenseNumber"]) {
                    x["personTenseNumber"].map(y => {
                        subTopoPessoaNumero.push({ person: y.person, number: y.number });
                    });
                }
            }
            //outros NP's (nome proprio ou substantivo)
            else if (x["isPlural"] == false && this.Dicionario.VERB == subTopo.usedClassification) {
                subTopoPessoaNumero.push({ person: "all", number: "singular" });
            }
            else if (x["isPlural"] == false && (this.Dicionario.NOUN == subTopo.usedClassification || this.Dicionario.PROPER_NOUN == subTopo.usedClassification)) {
                subTopoPessoaNumero.push({ person: "third", number: "singular" });

            } else if (x["isPlural"] == true && this.Dicionario.VERB == subTopo.usedClassification) {
                subTopoPessoaNumero.push({ person: "all", number: "plural" });
            } else if (x["isPlural"] == true && this.Dicionario.NOUN == subTopo.usedClassification) {
                subTopoPessoaNumero.push({ person: "third", number: "plural" });
            }
            else if(x["classification"] == this.Dicionario.VERB && this.Dicionario.VERB == subTopo.usedClassification)
                subTopoPessoaNumero.push({ person: "all", number: "all" });
            // não coloco else, pq a chave pode nao estar setada, (estar vazia) e isso pode gerar um erro
        });

        var retorno = false;
        topoPessoaNumero.map(topo => {
            subTopoPessoaNumero.map(subtopo => {
                if (topo.person == subtopo.person) {
                    if (topo.number == subtopo.number) {
                        retorno = true;
                    }
                } else if (topo.person == "all" || subtopo.person == "all") {
                    if (topo.number == subtopo.number || topo.number == "all" || subtopo.number == "all") {
                        retorno = true;
                    }
                }
            });
        });

        if (retorno) {
            this.atualiza_pct();
            return "ok";
        }
        return `Person or Number incompatibility between the words \'${topo.word}\' and \'${subTopo.word}\'`;

        // ve se são compativeis
        // if (topoNumero  == subTopoPessoa) {
        //     this.atualiza_pct(topoNumero );
        //     return { status: true };
        // } else {
        //     return { status: false, erro: `number incompatibility between the words ${topo.word} and ${subTopo.word}` }
        // }
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
     * Remove os elementos de analise.
     */
    atualiza_pct() {
        this.pilha.pop();
        this.pilha.pop();
    }

    /**
     * Retorna o topo da pilha sem dar pop
     */
    topo() {
        return this.pilha[-1];
    }
}
