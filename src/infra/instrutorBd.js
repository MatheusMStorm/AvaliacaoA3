const pool = require('../config/conexao.js');
const Instrutor = require('../models/entity/instrutor.js');

const getInstrutores = async () => {
    let instrutores = [];
    const res = await pool.query('SELECT rg_instrutor, nome_instrutor FROM projeto_iessa.instrutor');
    res.rows.forEach(row => {
        let instrutor = new Instrutor(row.rg_instrutor, row.nome_instrutor);
        instrutores.push(instrutor);
    });
    return instrutores;
};

const createInstrutor = async (rg_instrutor, nome_instrutor) => {
    await pool.query(
        'INSERT INTO projeto_iessa.instrutor (rg_instrutor, nome_instrutor) VALUES ($1, $2) RETURNING *',
        [rg_instrutor, nome_instrutor]
    );
    let instrutor = new Instrutor(rg_instrutor, nome_instrutor);
    return instrutor;
};

module.exports = { getInstrutores, createInstrutor };