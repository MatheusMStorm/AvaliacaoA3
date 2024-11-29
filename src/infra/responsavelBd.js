const pool = require('../config/conexao.js');
const Responsavel = require('../models/entity/responsavel.js');

/**
 * Retorna a lista de todos os responsáveis.
 * @returns {Promise} A lista de responsáveis.
 */
const getResponsaveis = async () => {
    let responsaveis = [];
    const res = await pool.query('SELECT rg_responsavel, nome_responsavel, endereco, graupa_responsavel, rg_crianca FROM projeto_iessa.responsavel');
    res.rows.forEach(row => {
        let responsavel = new Responsavel(row.rg_responsavel, row.nome_responsavel, row.endereco, row.graupa_responsavel, row.rg_crianca);
        responsaveis.push(responsavel);
    });
    return responsaveis;
};

/**
 * Cria um novo responsável.
 * @param {string} rg_responsavel - Número do RG do responsável.
 * @param {string} nome_responsavel - Nome do responsável.
 * @param {string} endereco - Endereço do responsável.
 * @param {string} graupa_responsavel - Grau de parentesco com a criança.
 * @param {string} rg_crianca - Número do RG da criança.
 * @param {string} senha - Senha para login.
 * @returns {Promise<Responsavel>} O novo responsável criado.
 */
const createResponsavel = async (rg_responsavel, nome_responsavel, endereco, graupa_responsavel, rg_crianca, senha) => {
    const res = await pool.query(
        'INSERT INTO projeto_iessa.responsavel (rg_responsavel, nome_responsavel, endereco, graupa_responsavel, rg_crianca, senha) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [rg_responsavel, nome_responsavel, endereco, graupa_responsavel, rg_crianca, senha]
    );
    let responsavel = new Responsavel(rg_responsavel, nome_responsavel, endereco, graupa_responsavel, rg_crianca, senha);
    return responsavel;
};

module.exports = { getResponsaveis, createResponsavel };