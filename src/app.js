require("dotenv").config();

const port = process.env.PORT;

const express = require('express');
const db = require('./controllers/conexao.js');
const app = express();

app.use(express.json());

app.get('/', (req, res) => res.json({ message: "Funcionando!" }));
app.get('/criancas', async (req, res) => { 
    const criancas = await db.selecionaCriancas();
    res.json(criancas);
})
app.listen(port);
console.log('API rodando');