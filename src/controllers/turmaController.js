const { findTurmas, criarTurma } = require('../models/services/turmaService');

const turmaController = {
  /**
   * Retorna a lista de todas as turmas.
   * 
   * @param {Object} req - Requisição HTTP.
   * @param {Object} res - Resposta HTTP.
   * 
   * @returns {Object[]} - Lista de turmas.
   * 
   * @throws {Error} - Se houver um erro ao obter lista de turmas.
   */
  getTurmas: async (req, res) => {
    try {
      const turmas = await findTurmas();
      res.status(200).json(turmas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao obter lista de turmas.' });
    }
  },

  /**
   * Cria uma nova turma.
   * 
   * @param {Object} req - Requisi o HTTP.
   * @param {Object} res - Resposta HTTP.
   * 
   * @prop {string} req.body.turno_turma - Turno da turma.
   * @prop {string} req.body.horario_turma - Hor rio da turma.
   * @prop {string} req.body.rg_instrutor - RG do instrutor da turma.
   * 
   * @returns {Object} - Turma criada.
   * 
   * @throws {Error} - Se houver um erro ao criar a turma.
   */
  createTurma: async (req, res) => {
    const { turno_turma, horario_turma, rg_instrutor } = req.body;
    try {
      const novaTurma = await criarTurma(turno_turma, horario_turma, rg_instrutor);
      res.status(201).json(novaTurma);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar nova turma.' });
    }
  }
};

module.exports = turmaController;