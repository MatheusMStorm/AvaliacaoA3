const { getTurmas, createTurma } = require('../models/turmaModel.js');

const turmaController = {
  getTurmas: async (req, res) => {
    try {
      const turmas = await getTurmas();
      res.status(200).json(turmas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao obter lista de turmas.' });
    }
  },

  createTurma: async (req, res) => {
    const { turno_turma, horario_turma, rg_instrutor } = req.body;
    try {
      const novaTurma = await createTurma(turno_turma, horario_turma, rg_instrutor);
      res.status(201).json(novaTurma);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar nova turma.' });
    }
  }
};

module.exports = turmaController;