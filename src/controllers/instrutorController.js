const { findInstrutores, criarInstrutor } = require('../models/services/instrutorService');

const instrutorController = {
  /**
   * Retorna a lista de todos os instrutores.
   * @param {Object} req - Requisição da rota.
   * @param {Object} res - Resposta da rota.
   * @returns {Promise} Lista de instrutores.
   */
  getInstrutores: async (req, res) => {
    try {
      const instrutores = await findInstrutores();
      res.status(200).json(instrutores);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao obter lista de instrutores.' });
    }
  },

  /**
   * Cria um novo instrutor.
   * @param {Object} req - Requisi o da rota.
   * @param {Object} res - Resposta da rota.
   * @param {string} req.body.rg_instrutor - RG do instrutor.
   * @param {string} req.body.nome_instrutor - Nome do instrutor.
   * @returns {Promise} O novo instrutor criado.
   */
  createInstrutor: async (req, res) => {
    const { rg_instrutor, nome_instrutor } = req.body;
    try {
      const novoInstrutor = await criarInstrutor(rg_instrutor, nome_instrutor);
      res.status(201).json(novoInstrutor);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar novo instrutor.' });
    }
  }
};

module.exports = instrutorController;