const { findMatriculas, criarMatricula } = require('../models/services/matriculaService');

const matriculaController = {
  getMatriculas: async (req, res) => {
    try {
      const matriculas = await findMatriculas();
      res.status(200).json(matriculas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao obter lista de matrículas.' });
    }
  },

  createMatricula: async (req, res) => {
    const { rg_crianca, id_turma } = req.body;
    try {
      const novaMatricula = await criarMatricula(rg_crianca, id_turma);
      res.status(201).json(novaMatricula);
    } catch (error) {
      console.error();
      res.status(500).json({ error: 'Erro ao criar nova matrícula.' });
    }
  }
};

module.exports = matriculaController;