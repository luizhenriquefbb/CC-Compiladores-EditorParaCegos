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


    <sentence>      -->   <noun phrase> <verb phrase>
    <noun phrase>   -->   <adjective> <noun phrase> 
                        | <adjective> <singular noun>
    <verb phrase>   -->   <singular verb> <adverb>
    <adjective>     -->   a | the |little
    <singular noun> -->   boy
    <singular verb> -->   ran
    <adverb>        -->   quickly

## Gramática

[Explicações sobre a gramática utilizada](https://web.stanford.edu/~jurafsky/slp3/11.pdf)

![](gramatica.png)