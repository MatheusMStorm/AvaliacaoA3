const { getTurmas, createTurma, contarAlunosNaTurma } = require('../../infra/turmaBd');

const findTurmas = async () => {
    let turma = await getTurmas();
    return turma;
  };
  
const criarTurma = async (turno_turma, horario_turma, rg_instrutor) => {
    let turma = await createTurma(turno_turma, horario_turma, rg_instrutor);
    return turma;
  };

const getQuantidadeAlunosNaTurma = async (id_turma) => {
    try {
      const quantidadeAlunos = await contarAlunosNaTurma(id_turma);
      return quantidadeAlunos;
    } catch (error) {
      throw new Error('Erro ao consultar a quantidade de alunos na turma: ' + error.message);
    }
  };
  
module.exports = { findTurmas, criarTurma, getQuantidadeAlunosNaTurma };