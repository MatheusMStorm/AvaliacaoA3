const { getTurmas, createTurma } = require('../../infra/turmaBd');

const findTurmas = async () => {
    let turma = await getTurmas();
    return turma;
  };
  
  const criarTurma = async (rg_crianca, id_turma) => {
    let turma = await createTurma(rg_crianca, id_turma);
    return turma;
  };
  
  module.exports = { findTurmas, criarTurma };