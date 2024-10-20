const { getResponsaveis, createResponsavel } = require('../models/responsavelModel.js');

const responsavelController = {
  getResponsaveis: async (req, res) => {
    try {
      const responsaveis = await getResponsaveis();
      res.status(200).json(responsaveis);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao obter lista de responsáveis.' });
    }
  },

  createResponsavel: async (req, res) => {
    const { rg_responsavel, nome_responsavel, endereco, graupa_responsavel, rg_crianca } = req.body;
    try {
      const novoResponsavel = await createResponsavel(rg_responsavel, nome_responsavel, endereco, graupa_responsavel, rg_crianca);
      res.status(201).json(novoResponsavel);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar novo responsável.' });
    }
  }
};

module.exports = responsavelController;