const { getInstrutores, createInstrutor } = require('../../infra/instrutorBd');

/**
 * Retorna a lista de todos os instrutores.
 * @returns {Promise<Instrutor[]>} A lista de instrutores.
 */
const findInstrutores = async () => {
  let instrutor = await getInstrutores();
  return instrutor;
};

/**
 * Cria um novo instrutor.
 * @param {string} rg_instrutor - RG do instrutor.
 * @param {string} nome_instrutor - Nome do instrutor.
 * @returns {Promise<Instrutor>} O instrutor criado.
 */
const criarInstrutor = async (rg_instrutor, nome_instrutor) => {
  let instrutor = await createInstrutor(rg_instrutor, nome_instrutor);
  return instrutor;
};

module.exports = { findInstrutores, criarInstrutor };