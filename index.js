const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

// Middleware para analisar corpos de solicitação JSON
app.use(express.text());

// Função para verificar se um número é primo
function isPrime(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;

    if (num % 2 === 0 || num % 3 === 0) return false;

    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
    }

    return true;
}
function verifyJwt(token){
    try {
        if (!token) { // Verificando se o token foi fornecido
            throw new Error('Token não fornecido');
        }
        
        // Verificar se o token é válido (sem necessidade de chave secreta)
        const decoded = jwt.decode(token, { complete: true });

        // Verificar se existem exatamente 3 claims
        if (!decoded.payload || Object.keys(decoded.payload).length !== 3) {
            return 'falso';
        }
        const { Name, Role, Seed } = decoded.payload;
        // Verificar a regra para a claim 'Name'
        if (!/^[a-zA-Z ]+$/.test(Name) || Name.length > 256) {
            return 'falso';
        }
        // Verificar a regra para a claim 'Role'
        if (!['Admin', 'Member', 'External'].includes(Role)) {
            return 'falso';
        }
        // Verificar a regra para a claim 'Seed'
        if (!isPrime(Seed)) {
            return 'falso';
        }
        // Se todas as verificações passarem, o token é válido
        return 'verdadeiro';
    } catch (error) {
        // Se ocorrer um erro durante a verificação, o token é inválido
        return 'falso';
    }
}

// Rota para verificar um JWT
app.post('/verify-jwt', (req, res) => {
    const token = req.body; // Aqui estamos pegando o token do corpo da requisição
    
    const result= verifyJwt(token);
    res.send(result);
});

module.exports = {app,verifyJwt,isPrime}; // Exporta a aplicação Express