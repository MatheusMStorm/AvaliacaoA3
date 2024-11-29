const pool = require('../config/conexao.js');
const Crianca = require('../models/entity/crianca.js')

/**
 * Retorna a lista de todas as crianças.
 * 
 * @returns {Crianca[]} - Lista de crian as.
 * 
 * @throws {Error} - Se houver um erro ao obter lista de crian as.
 */
const getCriancas = async () => {
    let criancas = [];
    const res = await pool.query('SELECT rg_crianca, nome_crianca, idade_crianca, data_nasc FROM projeto_iessa.crianca');
    res.rows.forEach(row => {               
        let crianca = new Crianca(row.rg_crianca, row.nome_crianca, row.idade_crianca, row.data_nasc);
        criancas.push(crianca);       
    });
    return criancas;    
};

/**
 * Retorna uma criança pelo seu RG.
 * 
 * @param {string} rg_crianca - RG da criança.
 * 
 * @returns {Crianca | null} - Criança encontrada ou null se não houver.
 * 
 * @throws {Error} - Se houver um erro ao obter a crian a.
 */
const getCriancaByRg = async (rg_crianca) => {
    let crianca;
    const res = await pool.query('SELECT rg_crianca, nome_crianca, idade_crianca, data_nasc FROM projeto_iessa.crianca WHERE rg_crianca = $1', [rg_crianca]);
    res.rows.forEach(row => {
        crianca = new Crianca(row.rg_crianca, row.nome_crianca, row.idade_crianca, row.data_nasc);
    })
    return crianca;
}

/**
 * Cria uma nova criança.
 * 
 * @param {string} rg_crianca - N mero do RG da criança.
 * @param {string} nome_crianca - Nome da criança.
 * @param {number} idade_crianca - Idade da criança.
 * @param {string} data_nasc - Data de nascimento da criança (formato: 'YYYY-MM-DD').
 * 
 * @returns {Crianca} - Criança criada.
 * 
 * @throws {Error} - Se houver um erro ao criar a criança.
 */
const createCrianca = async (rg_crianca, nome_crianca, idade_crianca, data_nasc) => {
    const res = await pool.query(
      'INSERT INTO projeto_iessa.crianca (rg_crianca, nome_crianca, idade_crianca, data_nasc) VALUES ($1, $2, $3, $4) RETURNING *',
      [rg_crianca, nome_crianca, idade_crianca, data_nasc]
    );

    let crianca = new Crianca(rg_crianca, nome_crianca, idade_crianca, data_nasc)
    return crianca;
};

module.exports = { getCriancas, getCriancaByRg, createCrianca };