const { getInstrutores, createInstrutor } = require('../../infra/instrutorBd');

const findInstrutores = async () => {
  let instrutor = await getInstrutores();
  return instrutor;
};

const criarInstrutor = async (rg_instrutor, nome_instrutor) => {
  let instrutor = await createInstrutor(rg_instrutor, nome_instrutor);
  return instrutor;
};

module.exports = { findInstrutores, criarInstrutor };