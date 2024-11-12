const { getTurmas, createTurma } = require('../../infra/turmaBd');

const findTurmas = async () => {
    let turma = await getTurmas();
    return turma;
  };
  
const criarTurma = async (turno_turma, horario_turma, rg_instrutor) => {
    let turma = await createTurma(turno_turma, horario_turma, rg_instrutor);
    return turma;
  };
  
  module.exports = { findTurmas, criarTurma };