# 🪙 Control

Sistema para o controle financeiro pessoal.

## 🗺️ Sumário

- [1. O que é o projeto?](#1--o-que-é-o-projeto)
- [2. Como executar o projeto](#2--como-executar-o-projeto)
- [2.1. Pré-requisitos](#21-️-pré-requisitos)
- [3. Autores e contato](#3--autores-e-contato)
- [4. Licença](#4-️-licença)

## 1. 🎯 O que é o projeto?

Controle financeiro pessoal.

## 2. 🚀 Como executar o projeto

### 2.1. 🛠️ Pré-requisitos

Para executar este projeto, você precisa ter o **Node.js** e o **npm** instalados. A forma mais recomendada de fazer isso é utilizando o **NVM (Node Version Manager)**.

1. **Instalar o NVM (Node Version Manager)**
   - Siga as instruções de instalação do [repositório oficial do NVM](https://github.com/nvm-sh/nvm).

2. **Instalar o Node.js**
   - Para garantir que a versão correta do Node.js seja usada, este projeto utiliza um arquivo `.nvmrc` na sua raiz.
   - Após instalar o NVM, abra o terminal na pasta do projeto e execute:

     ````bash
     nvm install
     nvm use
     ````

   - O comando `nvm install` vai ler o arquivo `.nvmrc` e instalar a versão LTS (Long-Term Support) do Node.js definida para o projeto, enquanto o `nvm use` a ativará.

3. **Verificar a instalação**
   - Para confirmar que o Node.js e o npm estão instalados corretamente, execute os seguintes comandos no terminal:

     ````bash
     node --version
     npm --version
     ````

   Eles devem retornar os números das versões.

### 2.2. 📦 Instalar as dependências do projeto

Para instalar todas as dependências do projeto, execute o seguinte comando no terminal na raiz do diretório:

```bash
npm install
```

### 2.3. ▶️ Rodar o projeto

Após instalar as dependências, inicie o servidor da API com o seguinte comando:

```bash
npm start
```

O servidor será iniciado na porta 3000. Você pode acessar a API em [http://localhost:3000](http://localhost:3000).

### 2.4. 🧪 Rodar os testes

Para executar os testes automatizados do projeto, utilize os comandos a seguir. A separação dos comandos permite rodar apenas o tipo de teste necessário, o que agiliza o processo de desenvolvimento.

- Rodar todos os testes:

```bash
npm test
```

- Rodar apenas os testes de unidade:

```bash
npm run test:unit
```

- Rodar apenas os testes de integração:

```bash
npm run test:integration
```

- Rodar apenas os testes End-to-End (E2E):

```bash
npm run test:e2e
```

## 3. 📣 Autores e contato

Este projeto é mantido pelo Paulo Luiz Fachini [@paulofachini](https://github.com/paulofachini).

## 4. ©️ Licença

Este projeto é de propriedade intelectual de Paulo Luiz Fachini [@paulofachini](https://github.com/paulofachini). Todos os direitos reservados. O código não pode ser usado, copiado, modificado ou distribuído sem permissão explícita.
