const pool = require('../config/conexao.js');
const Crianca = require('../models/entity/crianca.js')

const getCriancas = async () => {
    let criancas = [];
    const res = await pool.query('SELECT rg_crianca, nome_crianca, idade_crianca, data_nasc FROM projeto_iessa.crianca');
    res.rows.forEach(row => {               
        let crianca = new Crianca(row.rg_crianca, row.nome_crianca, row.idade_crianca, row.data_nasc);
        criancas.push(crianca);       
    });
    return criancas;    
};

const getCriancaByRg = async (rg_crianca) => {
    let crianca;
    const res = await pool.query('SELECT rg_crianca, nome_crianca, idade_crianca, data_nasc FROM projeto_iessa.crianca WHERE rg_crianca = $1', [rg_crianca]);
    res.rows.forEach(row => {
        crianca = new Crianca(row.rg_crianca, row.nome_crianca, row.idade_crianca, row.data_nasc);
    })
    return crianca;
}

const createCrianca = async (rg_crianca, nome_crianca, idade_crianca, data_nasc) => {
    const res = await pool.query(
      'INSERT INTO projeto_iessa.crianca (rg_crianca, nome_crianca, idade_crianca, data_nasc) VALUES ($1, $2, $3, $4) RETURNING *',
      [rg_crianca, nome_crianca, idade_crianca, data_nasc]
    );
    let crianca = new Crianca(rg_crianca, nome_crianca, idade_crianca, data_nasc)
    return crianca;
};

module.exports = { getCriancas, getCriancaByRg, createCrianca };