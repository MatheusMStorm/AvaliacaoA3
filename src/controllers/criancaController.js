const { getCriancas, createCrianca } = require('../models/criancaModel.js');

const criancaController = {
  getCriancas: async (req, res) => {
    try {
      const criancas = await getCriancas();
      res.status(200).json(criancas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao obter lista de crianças.' });
    }
  },

  createCrianca: async (req, res) => {
    const { rg_crianca, nome_crianca, idade_crianca, data_nasc } = req.body;
    try {
      const novaCrianca = await createCrianca(rg_crianca, nome_crianca, idade_crianca, data_nasc);
      res.status(201).json(novaCrianca);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar nova criança.' });
    }
  }
};

module.exports = criancaController;