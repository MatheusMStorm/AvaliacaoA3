const { findResponsaveis, criarResponsavel, verificarSenha } = require('../models/services/responsavelService');

const responsavelController = {
  /**
   * Retorna a lista de todos os responsáveis.
   * @param {Object} req - Requisição da rota.
   * @param {Object} res - Resposta da rota.
   * @returns {Promise} Lista de responsáveis.
   */
  getResponsaveis: async (req, res) => {
    try {
      const responsaveis = await findResponsaveis();
      res.status(200).json(responsaveis);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao obter lista de responsáveis.' });
    }
  },

  /**
   * Cria um novo responsável.
   * @param {Object} req - Requisição da rota.
   * @param {Object} res - Resposta da rota.
   * @param {string} req.body.rg_responsavel - Número do RG do responsável.
   * @param {string} req.body.nome_responsavel - Nome do responsável.
   * @param {string} req.body.endereco - Endereço do responsável.
   * @param {string} req.body.graupa_responsavel - Grau de parentesco com a criança.
   * @param {string} req.body.rg_crianca - Número do RG da criança.
   * @param {string} req.body.senha - Senha para login.
   * @returns {Promise} - O novo responsável criado.
   */
  createResponsavel: async (req, res) => {
    const { rg_responsavel, nome_responsavel, endereco, graupa_responsavel, rg_crianca, senha } = req.body;

    const verificaSenha = await verificarSenha(senha, res);
    if (verificaSenha) return;
    try {
      const novoResponsavel = await criarResponsavel(rg_responsavel, nome_responsavel, endereco, graupa_responsavel, rg_crianca, senha);
      res.status(201).json(novoResponsavel);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar novo responsável.' });
    }
  }
};

module.exports = responsavelController;