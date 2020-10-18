<h1 align="center">
    <img alt="Happy" title="Happy" src="assets/logo.png" width="280px" />
</h1>

<h3 align="center">
  Leve felicidade para o mundo
</h3>

<p align="center">
	  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/mpirescarvalho/happy?style=flat">
	  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/mpirescarvalho/happy">
	  <img alt="GitHub stars" src="https://img.shields.io/github/stars/mpirescarvalho/happy?style=social">
	  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/mpirescarvalho/happy">
</p>

<p align="center">
  <img alt="Happy" title="Happy" src="./assets/happy.png" width="100%"/>
</p>

## 💡 Projeto

O Happy é uma aplicação que conecta pessoas à casas de acolhimento institucional para fazer o dia de muitas crianças mais feliz.

Cadastre ou busque por locais para fazer visitas.

Construído para fins de estudo com base em aulas da terceira Next Level Week.

## 🚀 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

[![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=Node.js&logoColor=white&link=https://nodejs.org)](https://nodejs.org) <br/>
[![React](https://img.shields.io/badge/-React-61DAFB?logo=React&logoColor=white&link=https://reactjs.org/)](https://reactjs.org/) <br/>
[![React Native](https://img.shields.io/badge/-React_Native-4B8BF5?logo=Android&logoColor=white&link=https://reactnative.dev/)](https://reactnative.dev/) <br/>
[![Expo](https://img.shields.io/badge/-Expo-05001f?logo=Expo&logoColor=white&link=https://expo.io/)](https://expo.io/) <br/>
[![TypeScript](https://img.shields.io/badge/-TypeScript-007ACC?logo=TypeScript&logoColor=white&link=https://www.typescriptlang.org/)](https://www.typescriptlang.org/)

## 🔨 Build

Você vai precisar do [Node.js](https://nodejs.org) e do [Expo](https://expo.io/) instalados no seu computador para rodar esse app.

Clone o repositório:

```bash
$ git clone https://github.com/mpirescarvalho/happy.git && cd happy
```

### Backend:

_Atualize o arquivo 'backend/src/views/images_view.ts' com o IP atual da sua máquina na rede_

```bash
$ cd backend
$ npm install
$ npm run typeorm migration:run
$ npm run dev
```

### Web:

```bash
$ cd web
$ npm install
$ npm run start
```

### Mobile:

_Atualize o arquivo 'mobile/src/services/api.ts' com o IP atual da sua máquina na rede_

```bash
$ cd mobile
$ npm install
$ npm run start

# Escaneie o QR code com o app Expo Client
```

## 💻 Contribuindo

1. Faça um fork (<https://github.com/mpirescarvalho/chatter/fork>)
2. Crie um branch para sua feature (`git checkout -b feature/awesome`)
3. Faça commit de suas mudanças (`git commit -am 'Add awesome feature'`)
4. Faça push para o branch (`git push origin feature/awesome`)
5. Crie um pull request

## 📭 Contato

<a href="https://github.com/mpirescarvalho">
  <img alt="made by Marcelo Carvalho" src="https://img.shields.io/badge/made%20by-Marcelo%20Carvalho-%237519C1">
</a>
<a href="mailto:mpirescarvalho17@gmail.com">
  <img alt="made by Marcelo Carvalho" src="https://img.shields.io/badge/-mpirescarvalho17@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:mpirescarvalho17@gmail.com" />
</a>
