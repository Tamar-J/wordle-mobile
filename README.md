# **Wordle React Native**

<img src=".github/wordle.gif" alt="wordle demo" width="18%"/>

-=> *([download](https://expo.dev/@tamar-j/Wordle) com expo)* <=-

Wordle é um jogo originalmente para web, e agora adaptado para mobile com React Native.   
O jogador tem 6 tentativas para adivinhar uma palavra de 5 letras, com feedback colorido dado para cada tentativa. 

🟧 indica que a letra existe na palavra, porém não está na posição correta.  
🟩 indica que a letra existe e está no lugar certo.   
⬛ indica que a letra não existe.   

Ao final, você ainda pode compartilhar uma preview da sua jogada nas redes sociais:

WORDLE

⬛⬛⬛⬛⬛  
🟧⬛⬛⬛🟧  
🟩🟩🟩🟩🟩  

## 🚀 Tecnologias:

- React Native
- JavaScript
- Expo 

## 📚 Bibliotecas:

- [expo-clipboard](https://docs.expo.dev/versions/latest/sdk/clipboard/)

## 🧠 Aprendizado:

* Lógica com arrays
* Em React, o `setState()` trabalha de forma assíncrona por questões de performance, e quando usado com uma callback (`prevState`), irá sempre acompanhar o último valor chamado. O que pode, neste projeto, apresentar bugs de renderização, caso o usuário aperte as teclas rapidamente. A solução foi utilizar o `setState()` sem a callback nas linhas das células para que ele não pule duas células ou mais devido ao toque rápido na tela e o delay para processar os dados.

## 🧪 Experimente:

Você pode experimentar o jogo sem precisar entender código, usando expo [aqui](https://expo.dev/@tamar-j/Wordle).   
Mas caso queira testar com código em sua máquina...   
Faça um clone do projeto:  
```bash 
git clone https://github.com/Tamar-J/wordle-mobile.git   
```
E execute as seguintes ações de linha de comando:
```bash
cd wordle-mobile
npm install
npm run start
```

## FAQ 

### *Posso aumentar o número de tentativas acima de 6?*

Sim. Atualize a variável `NUMBER_OF_TRIES` no arquivo [App.js](./App.js) para o número de tentativas desejadas.

### *Como criar uma versão em outro idioma?*

Mude as palavras contidas em [src/words.js](src/words.js) para o idioma desejado. Cada palavra na lista representa um dia do ano.

### *Este projeto foi de tutorial?*
Originalmente sim, do canal no YouTube [notJust․dev](https://www.youtube.com/c/notjustdev). O objetivo é aprender com mestres dessa tecnologia e fazer modificações pessoais.