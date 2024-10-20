const { getInstrutores, createInstrutor } = require('../models/instrutorModel.js');

const instrutorController = {
  getInstrutores: async (req, res) => {
    try {
      const instrutores = await getInstrutores();
      res.status(200).json(instrutores);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao obter lista de instrutores.' });
    }
  },

  createInstrutor: async (req, res) => {
    const { rg_instrutor, nome_instrutor } = req.body;
    try {
      const novoInstrutor = await createInstrutor(rg_instrutor, nome_instrutor);
      res.status(201).json(novoInstrutor);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar novo instrutor.' });
    }
  }
};

module.exports = instrutorController;