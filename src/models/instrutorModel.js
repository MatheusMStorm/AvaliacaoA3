const pool = require('../config/conexao.js');

const getInstrutores = async () => {
  const res = await pool.query('SELECT * FROM projeto_iessa.instrutor');
  return res.rows;
};

const createInstrutor = async (rg_instrutor, nome_instrutor) => {
  const res = await pool.query(
    'INSERT INTO projeto_iessa.instrutor (rg_instrutor, nome_instrutor) VALUES ($1, $2) RETURNING *',
    [rg_instrutor, nome_instrutor]
  );
  return res.rows[0];
};

module.exports = { getInstrutores, createInstrutor };