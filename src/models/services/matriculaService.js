const { getMatriculas, createMatricula } = require('../../infra/matriculaBd');

const findMatriculas = async () => {
  let matricula = await getMatriculas();
  return matricula;
};

const criarMatricula = async (rg_crianca, id_turma) => {

  const quantidadeAlunos = await getQuantidadeAlunosNaTurma(id_turma);
  if (quantidadeAlunos >= 20) {
    throw new Error('A turma já atingiu o limite de 20 alunos.');
  }
  return await createMatricula(rg_crianca, id_turma);
};

const verificarCadastro = async (rg_crianca) => {
  const { getCriancaByRg } = require('../../infra/criancaBd')
  return await getCriancaByRg(rg_crianca);
}

module.exports = { findMatriculas, criarMatricula, verificarCadastro };