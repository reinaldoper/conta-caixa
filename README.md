# conta-caixa
Projeto fullStack que faz transações de pagamentos e seus cashbacks.
- `API se baseia na transação de pagamento , cria usuario, adiciona cashback, extrato das transações.`
- `Testes no back-end usando jest, no front-end vitest com jest`

<p align="center">
<img src="https://img.shields.io/badge/STATUS-COMPLETO-green"/>
</p>

# 🛠️ Abrir e rodar o projeto
`git@github.com:reinaldoper/conta-caixa.git`
## Aplicação feita usando docker:
- Dentro da pasta back-end criar uma imagem:
`docker build -t <nome-sua-escolha> .`
- Na raiz do projeto:
`docker-compose up -d`
## Detalhes:
- Aplicação deverá rodar na porta: 3001.
## Rotas:
<details>
  <summary><strong>Rotas de Usuários</strong></summary>

### - Endpoint para cadastrar User(POST):
  
- O endpoint deve ser acessível através do caminho (`/users`)
  
`{
  "cpf": "string",
  "name": "string",
  "password": "string",
  "email": "string"
}`
  
### - Endpoint de login(PATCH):
- O endpoint deve ser acessível através do caminho (`/users`)
  
`{
  "email": "string",
  "password": "string,
}`
  
### - Endpoint para listar transações(PATCH):
- O Endpoint de ser acessível através do caminho (`/users/transaction`)
  
`{
  "cpf": "string",
}`
  
### - Endpoint para deletar usuario(DELETE):
  
- O endpoint deve ser acessível através do caminho (`/users`)
  
`{
  "email": "string",
}`

### - Endpoint para buscar usuario(PATCH):
  
- O endpoint deve ser acessível através do caminho (`/users/get`)
  
`{
  "email": "string",
}`
### - Endpoint para alterar usuario(PUT):
  
- O endpoint deve ser acessível através do caminho (`/users/recover`)
  
`{
  "email": "string",
}`
</details>

<details>
  <summary><strong>Rotas de Transações:</strong></summary>

### - Endpoint para cadastrar Transação(POST):
  
- O endpoint deve ser acessível através do caminho (`/transaction`)

`{
  "accountId": "string,
  "value": "number"
}`
  
### - Endpoint para criar cashback (PUT):

- O endpoint deve ser acessível através do caminho (`/transaction`)
  
`{
  "cashback": "number,
  "transactionId": "string"
}`
  
  
</details>

## Detalhes das telas:

<details>
  <summary><strong>Imagens das telas da aplicação:</strong></summary>

### - Fluxo da aplicação:
  
- Tela criar usuario:
<img src="images/create.png" alt="image-login"/>
  
- Tela listar transações:
<img src="images/transactions.png" alt="image-transaction"/>
  
- Tela deletar usuario:
<img src="images/delete.png" alt="image-delete"/>
  
- Tela login:
<img src="images/login.png" alt="image-recover"/>

  
</details>

## Tecnologias utilizadas
 
<div display="inline-block">
<img width="" src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
<img width="" src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white">
<img width="" src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E">
<img width="" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
<img width="" src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
<img width="" src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white">
<img width="" src="https://img.shields.io/badge/Prisma-52B0E7?style=for-the-badge&logo=Prisma&logoColor=white">
<img width="" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white">
<img width="" src="https://img.shields.io/badge/Docker-007ACC?style=for-the-badge&logo=Docker&logoColor=white">
</div>
