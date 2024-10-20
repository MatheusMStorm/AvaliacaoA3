const pool = require('../config/conexao.js');

const getMatriculas = async () => {
  const res = await pool.query('SELECT * FROM projeto_iessa.matricula');
  return res.rows;
};

const createMatricula = async (rg_crianca, id_turma) => {
  const res = await pool.query(
    'INSERT INTO projeto_iessa.matricula (rg_crianca, id_turma) VALUES ($1, $2) RETURNING *',
    [rg_crianca, id_turma]
  );
  return res.rows[0];
};

module.exports = { getMatriculas, createMatricula };