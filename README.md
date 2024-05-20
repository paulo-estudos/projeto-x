# projeto-x
Projeto-X foi criado como solução do desafio proposto

# Estrutura do Código
├── index.js       # Configuração e inicialização da app
├── server.js      # Ponto de entrada e execução da app
└── README.md      # Documentação do projeto

# Verificação de JWT
Este projeto é uma aplicação web que expõe uma API para verificar a validade de um token JWT (JSON Web Token) com base em regras específicas. 

# Funcionalidades
A aplicação verifica se um token JWT é válido com base nas seguintes regras:

- O token deve ser um JWT válido.
- Deve conter exatamente 3 claims: Name, Role e Seed.
- A claim Name não pode conter números e deve ter no máximo 256 caracteres.
- A claim Role deve conter um dos seguintes valores: Admin, Member ou External.
- A claim Seed deve ser um número primo.

# Requisitos
- Node.js
- npm (Node Package Manager)

# Uso
Para iniciar a aplicação, execute: node server.js

A aplicação estará disponível na porta definida na variável de ambiente PORT, informada no Dockerfile ou na porta 80 por padrão.

# Endpoints
POST /verify-jwt

Verifica a validade de um token JWT.

# Requisição
- Corpo da requisição: O token JWT como uma string.

Exemplo de Requisição

curl -X POST http://localhost:80/verify-jwt -d 'seu-token-jwt'

# Respostas
- 200 OK: Se o token JWT for válido, retorna "verdadeiro".
- 200 OK: Se o token JWT for inválido, retorna "falso".

# Testes
Os testes unitários e de integração podem ser realizados utilizando a biblioteca supertest. Para execução é necessário que os testes estejam no mesmo diretório do projeto e que sigam o padrão de nomenclatura *.test.js.

# Teste Unitário
Testes unitários implementados no projeto.

A função isPrime é responsável por verificar se um número é primo. Os testes realizados garantem que a função retorne true para números primos e false para números não primos.

A função verifyJwt valida tokens JWT. Os testes garantem que a função retorne "verdadeiro" para tokens JWT válidos e "falso" para tokens JWT inválidos.

Os testes são escritos usando a biblioteca Jest e Supertest para realizar as asserções e simular solicitações HTTP.

# Teste de Integração
Este código implementa testes de integração para a rota /verify-jwt da aplicação.
No primeiro teste, é enviado um token JWT válido para a rota e espera-se que a resposta seja "verdadeiro". No segundo teste, é enviado um token JWT inválido e espera-se que a resposta seja "falso".

Os testes utilizam a biblioteca Supertest para simular requisições HTTP à aplicação e a função expect do Jest para realizar as asserções nos resultados das requisições.

# Scripts:
- `test`: Executa todos os testes configurados com Jest.
- `test:unit`: Executa testes unitários no arquivo index.test.js.
- `test:integration`: Define NODE_ENV como 'test' e executa testes de integração no arquivo integration.test.js.
- `test:all`: Executa todos os testes unitários e de integração.

# Dockerfile 
O Dockerfile cria uma imagem Docker para a aplicação Node.js, realizando as seguintes ações:

- Usa a imagem base `node:14`.
- Define o diretório de trabalho para `/usr/src/app`.
- Copia o diretório `node_modules` para o diretório de trabalho.
- Copia os demais arquivos da aplicação para o diretório de trabalho.
- Expõe a porta 80.
- Define o comando para iniciar a aplicação: `node server.js`.

 Portanto, o arquivo configura o ambiente para rodar uma aplicação Node.js dentro de um contêiner Docker.