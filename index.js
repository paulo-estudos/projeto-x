const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = 'segredo';

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

// Rota para criar um JWT
app.post('/generate-jwt', (req, res) => {
    const body = req.body;

    console.log("Dados recebidos:", body);

    // Verificar se req.body é uma string JSON
    if (typeof req.body === 'string') {
        try {
            // Fazer o parse da string JSON para obter o objeto JSON
            const bodyObj = JSON.parse(req.body);
            Name = bodyObj.Name;
            Role = bodyObj.Role;
            Seed = bodyObj.Seed;
        } catch (error) {
            console.error("Erro ao fazer o parse da string JSON:", error.message);
            res.status(400).json({ error: 'Erro ao fazer o parse da string JSON' });
            return;
        }
    }

    try {
    // const token = jwt.sign({ Name, Role, Seed }, SECRET_KEY, { expiresIn: '1h' });
        const token = jwt.sign({ Name, Role, Seed }, SECRET_KEY, { expiresIn: '1h' });

        console.log("Token gerado:", token);
        res.json({ token });
    } catch (error) {
        console.error("Erro ao gerar token:", error.message);
        res.status(400).json({ error: error.message });
    }
});


app.post('/verify-jwt', (req, res) => {
    const token = req.body; // Aqui estamos pegando o token do corpo da requisição

    try {
        if (!token) { // Verificando se o token foi fornecido
            throw new Error('Token não fornecido');
        }
        
        // Verificar se o token é válido (sem necessidade de chave secreta)
        const decoded = jwt.decode(token, { complete: true });

        // Verificar se existem exatamente 3 claims
        if (!decoded.payload || Object.keys(decoded.payload).length !== 3) {
            res.send('falso');
            return;
        }
        const { Name, Role, Seed } = decoded.payload;
        // Verificar a regra para a claim 'Name'
        if (!/^[a-zA-Z ]+$/.test(Name) || Name.length > 256) {
            res.send('falso');
            return;
        }
        // Verificar a regra para a claim 'Role'
        if (!['Admin', 'Member', 'External'].includes(Role)) {
            res.send('falso');
            return;
        }
        // Verificar a regra para a claim 'Seed'
        if (!isPrime(Seed)) {
            res.send('falso');
            return;
        }
        // Se todas as verificações passarem, o token é válido
        res.send('verdadeiro');
    } catch (error) {
        // Se ocorrer um erro durante a verificação, o token é inválido
        res.send('falso');
    }
});
// Iniciando o servidor
app.listen(PORT, () => {
    console.log(`Servidor em execução na porta ${PORT}`);
});