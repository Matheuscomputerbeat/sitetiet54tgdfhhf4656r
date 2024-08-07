const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Conectar ao MongoDB
mongoose.connect('mongodb://localhost:27017/aliexpress', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Rota para buscar produtos
app.get('/api/products', async (req, res) => {
    try {
        const response = await fetch('https://s.click.aliexpress.com/e/_DmdQHht');
        if (!response.ok) {
            throw new Error('Erro na requisição ao AliExpress');
        }
        const data = await response.json();
        res.json({ products: data.products });
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        res.status(500).json({ error: 'Erro ao buscar produtos' });
    }
});

// Rota para comprar produto
app.get('/buy', (req, res) => {
    const productUrl = decodeURIComponent(req.query.productUrl);
    res.redirect(`https://login.aliexpress.com?redirect=${productUrl}`);
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
