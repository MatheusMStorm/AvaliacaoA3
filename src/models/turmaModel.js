const pool = require('../config/conexao.js');

const getTurmas = async () => {
  const res = await pool.query('SELECT * FROM projeto_iessa.turma');
  return res.rows;
};

const createTurma = async (turno_turma, horario_turma, rg_instrutor) => {
  const res = await pool.query(
    'INSERT INTO projeto_iessa.turma (turno_turma, horario_turma, rg_instrutor) VALUES ($1, $2, $3) RETURNING *',
    [turno_turma, horario_turma, rg_instrutor]
  );
  return res.rows[0];
};

module.exports = { getTurmas, createTurma };