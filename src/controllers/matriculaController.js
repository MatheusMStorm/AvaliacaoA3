const { findMatriculas, criarMatricula, verificarCadastro } = require('../models/services/matriculaService');

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
    const { getQuantidadeAlunosNaTurma } = require('../models/services/turmaService');

    try {
      const criancaExiste = await verificarCadastro(rg_crianca);
      const quantidadeAlunos = await getQuantidadeAlunosNaTurma(id_turma);

      if (quantidadeAlunos >= 20) {
        res.status(400).json({ error: 'A turma já atingiu o limite de 20 alunos.' });
        return; 
      } else if (!criancaExiste) {
        res.status(404).json({ error: 'Criança não cadastrada.' });
        return;
      }

      const novaMatricula = await criarMatricula(rg_crianca, id_turma);
      res.status(201).json(novaMatricula);
    } catch (error) {
      console.error();
      res.status(500).json({ error: 'Erro ao criar nova matrícula.' });
    }
  }
};

module.exports = matriculaController;