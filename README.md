# **Wordle React Native**

<img src=".github/wordle.gif" alt="wordle demo" width="46%"/>

*[![Rode em seu smartphone com Expo Go](https://img.shields.io/badge/Rode%20em%20seu%20smartphone%20com%20Expo%20Go-000.svg?style=flat-square&logo=EXPO&labelColor=f3f3f3&logoColor=000)](https://expo.dev/@tamar-j/Wordle)*

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
- TypeScript
- Expo (Managed Workflow)

## 📚 Bibliotecas:

- [expo-clipboard](https://docs.expo.dev/versions/latest/sdk/clipboard/)
- [react-native-reanimated](https://github.com/software-mansion/react-native-reanimated)
- [lottie-react-native](https://github.com/lottie-react-native/lottie-react-native)
- [@react-native-async-storage/async-storage](https://react-native-async-storage.github.io/async-storage/docs/install/)

## 🧠 Aprendizado:

* Lógica com arrays
* Em React, o `setState()` trabalha de forma assíncrona por questões de performance, e quando usado com uma callback (`prevState`), irá sempre acompanhar o último valor chamado. O que pode, neste projeto, apresentar bugs de renderização, caso o usuário aperte as teclas rapidamente. A solução foi utilizar o `setState()` sem a callback nas linhas das células para que ele não pule duas células ou mais devido ao toque rápido na tela e o delay para processar os dados.
* Animações no texto realizados com a biblioteca react-native-reanimated (v2)
* Confetes utilizando a biblioteca lottie-react-native que roda animações no formato json
* Persistência dos dados do jogador com AsyncStorage (offline local storage)

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
expo start
```

## FAQ 

### *Como criar uma versão em outro idioma?*
Mude as palavras contidas em [src/words.js](src/words.js) para o idioma desejado. Cada palavra na lista representa um dia do ano.

### *Este projeto foi de tutorial?*
Originalmente sim, do canal no YouTube [notJust․dev](https://www.youtube.com/c/notjustdev). O objetivo é aprender com mestres dessa tecnologia e fazer modificações pessoais.

### *Quais foram as modificações pessoais?*
* O código em JavaScript foi convertido para TypeScript.
* Correções de bugs.
* Adicionado confete com a biblioteca lottie, para comemorar sua vitória! Ele permite renderizar animações do After Effects em tempo real! (Exportadas em .json).
* Adicionado icone e splash screen.
