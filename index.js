const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = 'segredo';

// Middleware para analisar corpos de solicitação JSON
app.use(express.json());

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
    const { name, role, seed } = req.body;

    try {
        // Verificando os requisitos antes de criar o JWT
        if (!/^[a-zA-Z]+$/.test(name) || name.length > 256) {
            throw new Error('A claim "Name" deve conter apenas letras e ter no máximo 256 caracteres.');
        }

        if (!['Admin', 'Member', 'External'].includes(role)) {
            throw new Error('A claim "Role" deve ser uma das seguintes: Admin, Member, External.');
        }

        if (!isPrime(seed)) {
            throw new Error('A claim "Seed" deve ser um número primo.');
        }

        const token = jwt.sign({ Name: name, Role: role, Seed: seed }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Rota para verificar um JWT
app.post('/verify-jwt', (req, res) => {
    const { token } = req.body;

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        // Verificando se todas as claims estão presentes
        if (!decoded.Name || !decoded.Role || !decoded.Seed) {
            throw new Error('O JWT não contém todas as claims necessárias.');
        }
        // Verificando as regras específicas para cada claim
        if (!/^[a-zA-Z]+$/.test(decoded.Name) || decoded.Name.length > 256) {
            throw new Error('A claim "Name" não atende aos requisitos.');
        }
        if (!['Admin', 'Member', 'External'].includes(decoded.Role)) {
            throw new Error('A claim "Role" não atende aos requisitos.');
        }
        if (!isPrime(decoded.Seed)) {
            throw new Error('A claim "Seed" não atende aos requisitos.');
        }
        res.json({ decoded });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Iniciando o servidor
app.listen(PORT, () => {
    console.log(`Servidor em execução na porta ${PORT}`);
});
