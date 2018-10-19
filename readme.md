# Blind editor

Atividade ralizada para a cadeira de COMPILADORES - UFPB

Desenvolver um editor de texto onde os usuários são cegos.

A aplicação deve dar feedbacks para o usuário errors lexicos, sintáticos e semânticos.

# Como Rodar

Apenas abra o [index.html](index.html) no seu browser. E escreva a frase ou texto. Ao finalizar clique em 'tab' depois 'enter' para que a análise comece.

Ao final da análise se houver alguma palavra errada, a palavra errada vai estar selecionada para que o usuário faça a correção.


# Grupo

Aluno | Matrícula
-----| ----
Luiz Henrique | 11514334
Aline Moura | 
Alisson Galiza | 11408126


# Sobre o projeto:

Para facilitar o desenvolvimento, optamos por utilizar uma entrada em ingles

<!-- ## Gramática

1 | 2
------ | --
S | NP VP
VP | W V
VP | W V NP
NP | N
NP | Det N

W | will
W | ε


onde


    S == [Sentence]
        ex: John likes Sarah’s black hair

    N == [Noun]
        ex: John, hair

    V == [Verb]
        ex: eating, sat

    Adj == [Adjective]
        ex: black, long

    Det == [Determiner]
        ex: the, a, every

    NP == [Noun Phrase]
        ex: Sarah’s long black hair

    VP == [Verb Phrase]
        ex: eating apples -->

## Gramática

[Explicações sobre a gramática utilizada](https://web.stanford.edu/~jurafsky/slp3/11.pdf)

![](gramatica.png)

## Limitações
Infelizmente, a gramática utlizada tem algumas limitações, entre elas:

- Não reconhece **adjetivos**.
- Precisa que a frase seja escrita por completo para só então começar a análise pois estamos usando uma API para classificar as palavras (parte léxica), e esta é um pouco lenta (uma requisição por palavra). Entã a melhor maneira é apenas começar  análise depois que o texto for escrito.
- A frase precisa terminar com ponto final ('.')

## TODO:
- Análise semântica
    - Colocar no sintatico, pontos chaves que avaliam a semântica da frase

- Rever uma parte da grmática
    - A frase `'I like dogs'` não funciona, mas `'I like the dogs'` sim.



