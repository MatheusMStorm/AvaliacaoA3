const { getMatriculas, createMatricula } = require('../../infra/matriculaBd');

/**
 * Recupera uma lista de matrículas do banco de dados de forma assíncrona.
 * 
 * @returns {Promise<Array>} Uma promessa que resolve para um array de matrículas.
 * @throws {Error} Se houver um problema ao recuperar as matrículas do banco de dados.
 */
const findMatriculas = async () => {
  let matricula = await getMatriculas();
  return matricula;
};

/**
 * Cria uma nova matrícula para uma criança em uma turma específica.
 *
 * @param {string} rg_crianca - RG da criança a ser matriculada.
 * @param {number} id_turma - ID da turma onde a criança será matriculada.
 * @returns {Promise<Matricula>} Uma promessa que resolve para o objeto Matrícula criado.
 * @throws {Error} Se ocorrer um erro ao criar a matrícula no banco de dados.
 */
const criarMatricula = async (rg_crianca, id_turma) => {
  let matricula = await createMatricula(rg_crianca, id_turma);
  return matricula;
};

/**
 * Verifica se uma criança existe no banco de dados.
 * 
 * @param {string} rg_crianca - RG da criança a ser verificada.
 * @returns {Promise<Crianca | null>} Uma promessa que resolve para o objeto Criança se a crian a for encontrada no banco de dados, ou null se a crian a n o for encontrada.
 * @throws {Error} Se houver um erro ao verificar a existência da criança no banco de dados.
 */
const verificarCadastro = async (rg_crianca) => {
  const { getCriancaByRg } = require('../../infra/criancaBd')
  return await getCriancaByRg(rg_crianca);
}

module.exports = { findMatriculas, criarMatricula, verificarCadastro };