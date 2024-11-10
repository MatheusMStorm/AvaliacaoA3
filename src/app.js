const express = require('express');

const criancaRoutes = require('./routes/criancaRoutes.js');
const responsavelRoutes = require('./routes/responsavelRoutes.js');
const instrutorRoutes = require('./routes/instrutorRoutes.js');
const turmaRoutes = require('./routes/turmaRoutes.js');
const matriculaRoutes = require('./routes/matriculaRoutes.js');

const app = express();

app.use(express.json());

app.use('/', criancaRoutes);
app.use('/', responsavelRoutes);
app.use('/', instrutorRoutes);
app.use('/', turmaRoutes);
app.use('/', matriculaRoutes);

module.exports = app;