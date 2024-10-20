const pool = require('../config/conexao.js');

const getResponsaveis = async () => {
  const res = await pool.query('SELECT * FROM projeto_iessa.responsavel');
  return res.rows;
};

const createResponsavel = async (rg_responsavel, nome_responsavel, endereco, graupa_responsavel, rg_crianca) => {
  const res = await pool.query(
    'INSERT INTO projeto_iessa.responsavel (rg_responsavel, nome_responsavel, endereco, graupa_responsavel, rg_crianca) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [rg_responsavel, nome_responsavel, endereco, graupa_responsavel, rg_crianca]
  );
  return res.rows[0];
};

module.exports = { getResponsaveis, createResponsavel };