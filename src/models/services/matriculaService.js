const { getMatriculas, createMatricula } = require('../../infra/matriculaBd');

const findMatriculas = async () => {
  let matricula = await getMatriculas();
  return matricula;
};

const criarMatricula = async (rg_crianca, id_turma) => {
  let matricula = await createMatricula(rg_crianca, id_turma);
  return matricula;
};

module.exports = { findMatriculas, criarMatricula };