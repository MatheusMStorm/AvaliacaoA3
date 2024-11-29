const { findCriancas, criarCrianca, verificarIdade } = require('../models/services/criancaService.js');

const criancaController = {
  /**
   * Retorna a lista de todas as crianças.
   * 
   * @param {Object} req - Requisição HTTP.
   * @param {Object} res - Resposta HTTP.
   * 
   * @returns {Object[]} - Lista de crianças.
   * 
   * @throws {Error} - Se houver um erro ao obter lista de crianças.
   */
  getCriancas: async (req, res) => {
    try {
      const criancas = await findCriancas();
      res.status(200).json(criancas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao obter lista de crianças.' });
    }
  },

  /**
   * Cria uma nova criança.
   * 
   * @param {Object} req - Requisição HTTP.
   * @param {Object} res - Resposta HTTP.
   * 
   * @prop {string} req.body.rg_crianca - Número do RG da criança.
   * @prop {string} req.body.nome_crianca - Nome da criança.
   * @prop {number} req.body.idade_crianca - Idade da criança.
   * @prop {string} req.body.data_nasc - Data de nascimento da criança (formato: 'YYYY-MM-DD').
   * 
   * @returns {Object} - Criança criada.
   * 
   * @throws {Error} - Se houver um erro ao criar a criança.
   */
  createCrianca: async (req, res) => {
    const { rg_crianca, nome_crianca, idade_crianca, data_nasc } = req.body;

    
    try {
      await verificarIdade(idade_crianca, res);
      if (res.headersSent) {
        return;
      }
      const novaCrianca = await criarCrianca(rg_crianca, nome_crianca, idade_crianca, data_nasc);
      res.status(201).json(novaCrianca);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar nova criança.' });
    }
  }
};

module.exports = criancaController;