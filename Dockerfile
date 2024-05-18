# Escolha a imagem base
FROM node:14

# Crie um diretório para a aplicação
WORKDIR /usr/src/app

# Copie o diretório node_modules do diretório /harness
COPY ./node_modules ./node_modules

# Copie o restante dos arquivos da aplicação
COPY . .

# Exponha a porta que a aplicação vai usar
EXPOSE 80

# Comando para iniciar a aplicação
CMD [ "node", "index.js" ]
