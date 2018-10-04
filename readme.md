# Blind editor

Atividade ralizada para a cadeira de COMPILADORES - UFPB

Desenvolver um editor de texto onde os usuários são cegos.

A aplicação deve dar feedbacks para o usuário errors lexicos, sintáticos e semânticos.

# Como Rodar

Em desenvolvimento...

```sh
npm install
npm start
```

# Grupo

Aluno | Matrícula
-----| ----
Luiz Henrique | 11514334
Aline Moura | --
Alisson Galiza | ---


# Sobre o projeto:

Para facilitar o desenvolvimento, optamos por utilizar uma entrada em ingles

## Gramática

1 | 2
------ | --
S | NP VP
VP | V NP
VP | V
NP | N
NP | Det N


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
        ex: eating apples


