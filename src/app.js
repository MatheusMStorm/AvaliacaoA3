require("dotenv").config();

const express = require('express');
const db = require('./config/conexao.js');
const criancaRoutes = require('./routes/criancaRoutes.js');
const responsavelRoutes = require('./routes/responsavelRoutes.js');
const instrutorRoutes = require('./routes/instrutorRoutes.js');
const turmaRoutes = require('./routes/turmaRoutes.js');
const matriculaRoutes = require('./routes/matriculaRoutes.js');

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use('/', criancaRoutes);
app.use('/', responsavelRoutes);
app.use('/', instrutorRoutes);
app.use('/', turmaRoutes);
app.use('/', matriculaRoutes);

app.listen(port, () => {
    console.log('API rodando na porta ' + port);
});