const pool = require('../config/conexao.js');
const Turma = require('../models/entity/turma.js');

const getTurmas = async () => {
    let turmas = [];
    const res = await pool.query('SELECT turno_turma, horario_turma, rg_instrutor, numero_alunos FROM projeto_iessa.turma');
    res.rows.forEach(row => {
        let turma = new Turma(row.turno_turma, row.horario_turma, row.rg_instrutor, row.numero_alunos);
        turmas.push(turma);
    });
    return turmas;
};

const createTurma = async (turno_turma, horario_turma, rg_instrutor) => {
    const res = await pool.query(
        'INSERT INTO projeto_iessa.turma (turno_turma, horario_turma, rg_instrutor) VALUES ($1, $2, $3) RETURNING *',
        [turno_turma, horario_turma, rg_instrutor]
    );

    const { id_turma } = res.rows[0]
    let turma = new Turma(id_turma, turno_turma, horario_turma, rg_instrutor);
    return turma;
};

module.exports = { getTurmas, createTurma };