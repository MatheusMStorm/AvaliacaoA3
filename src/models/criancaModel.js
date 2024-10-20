const pool = require('../config/conexao.js');

const getCriancas = async () => {
  const res = await pool.query('SELECT * FROM projeto_iessa.crianca');
  return res.rows;
};

const createCrianca = async (rg_crianca, nome_crianca, idade_crianca, data_nasc) => {
  const res = await pool.query(
    'INSERT INTO projeto_iessa.crianca (rg_crianca, nome_crianca, idade_crianca, data_nasc) VALUES ($1, $2, $3, $4) RETURNING *',
    [rg_crianca, nome_crianca, idade_crianca, data_nasc]
  );
  return res.rows[0];
};

module.exports = { getCriancas, createCrianca };