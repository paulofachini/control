# Usa uma imagem oficial do Node.js baseada em Debian
FROM node:lts

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos package.json e package-lock.json para instalar as dependências
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia todo o código-fonte para o container
COPY . .

# Expõe a porta que a sua aplicação usará
EXPOSE 3000

# Comando para iniciar a aplicação quando o container for executado
CMD ["npm", "start"]
