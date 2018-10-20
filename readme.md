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
S | Aux NP VP
S | NP VP
S | VP
NP | pronoun
NP | proper_noun
NP | determinant NOMINAL
NOMINAL | noun NOMINAL2
NOMINAL2 | PP NOMINAL2
NOMINAL2 | noun NOMINAL2
NOMINAL2 | ε
VP | verb VP2
VP | verb NP VP2
VP | verb NP PP VP2
VP | verb PP VP2
VP2 | PP VP2
VP2 | ε

 -->

## Gramática

[Explicações sobre a gramática utilizada](https://web.stanford.edu/~jurafsky/slp3/11.pdf)

![](gramatica.png)

## Limitações
Infelizmente, a gramática utlizada tem algumas limitações, entre elas:

- Não reconhece **adjetivos**.
- Precisa que a frase seja escrita por completo para só então começar a análise pois estamos usando uma API para classificar as palavras (parte léxica), e esta é um pouco lenta (uma requisição por palavra). Entã a melhor maneira é apenas começar  análise depois que o texto for escrito.
- A frase precisa terminar com ponto final ('.')

## TODO:

- Rever uma parte da grmática
    - A frase `'I like dogs'` não funciona, mas `'I like the dogs'` sim.

- Teste automatico para as frases
    - it is raining
    - the book is on the table
    - the dog are sleeping
    - the dog is sleeping
    - the dogs are sleeping
    - the dogs is sleeping

- Reescrever gramática no README



