# Escolha a imagem base
FROM node:14

# Crie um diretório para a aplicação
WORKDIR /usr/src/app

# Copie o diretório node_modules do diretório /harness
COPY /harness/node_modules ./node_modules

# Copie o restante dos arquivos da aplicação
COPY . .

# Exponha a porta que a aplicação vai usar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD [ "node", "app.js" ]
