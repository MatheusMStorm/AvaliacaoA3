const { getMatriculas, createMatricula } = require('../../infra/matriculaBd');

const findMatriculas = async () => {
  let matricula = await getMatriculas();
  return matricula;
};

const criarMatricula = async (rg_crianca, id_turma) => {
  let matricula = await createMatricula(rg_crianca, id_turma);
  return matricula;
};

const verificarCadastro = async (rg_crianca) => {
  const { getCriancaByRg } = require('../../infra/criancaBd')
  return await getCriancaByRg(rg_crianca);
}

module.exports = { findMatriculas, criarMatricula, verificarCadastro };