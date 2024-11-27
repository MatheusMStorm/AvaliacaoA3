const pool = require('../config/conexao.js');
const Turma = require('../models/entity/turma.js');

const getTurmas = async () => {
    let turmas = [];
    const res = await pool.query('SELECT id_turma, turno_turma, horario_turma, rg_instrutor, numero_alunos FROM projeto_iessa.turma');
    res.rows.forEach(row => {
        let turma = new Turma(row.id_turma,row.turno_turma, row.horario_turma, row.rg_instrutor, row.numero_alunos);
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

const contarAlunosNaTurma = async (id_turma) => {
    try {
      const result = await pool.query('SELECT numero_alunos FROM projeto_iessa.turma WHERE id_turma = $1', [id_turma]);
      if (result.rows.length > 0) {
        return result.rows[0].numero_alunos;
      }
      throw new Error('Turma não encontrada.');
    } catch (error) {
      console.error('Erro ao contar alunos na turma:', error);
      throw error;
    }
  };

module.exports = { getTurmas, createTurma, contarAlunosNaTurma };