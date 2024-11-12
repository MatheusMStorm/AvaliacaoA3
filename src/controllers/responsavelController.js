const { findResponsaveis, criarResponsavel, verificarSenha } = require('../models/services/responsavelService');

const responsavelController = {
  getResponsaveis: async (req, res) => {
    try {
      const responsaveis = await findResponsaveis();
      res.status(200).json(responsaveis);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao obter lista de responsáveis.' });
    }
  },

  createResponsavel: async (req, res) => {
    const { rg_responsavel, nome_responsavel, endereco, graupa_responsavel, rg_crianca, senha } = req.body;

    verificarSenha(senha, res);
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