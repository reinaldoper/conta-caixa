# Use uma imagem do Node.js como base
FROM node:16

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o arquivo package.json e package-lock.json (ou yarn.lock)
# para instalar as dependências da aplicação
COPY package*.json ./

# generated prisma files
COPY /schema.prisma ./

# COPY ENV variable
COPY .env ./

# COPY tsconfig.json file
COPY tsconfig.json ./

# Copie o restante dos arquivos da aplicação para o contêiner
COPY . .

# Remova o pacote lockfile para garantir a recriação correta
RUN rm -rf package-lock.json

# Instale as dependências da aplicação
RUN npm install

# Adicione o wait-for-it.sh ao contêiner
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /app/wait-for-it.sh
RUN chmod +x /app/wait-for-it.sh

# Espere até que o serviço do banco de dados esteja pronto antes de executar o comando "npm run create"
CMD /app/wait-for-it.sh database:3306 -- npm run create

EXPOSE 3000
