const { getCriancas, createCrianca } = require('../../infra/criancaBd');

/**
 * Retorna uma lista de todas as crianças.
 * 
 * @returns {Promise<Crianca[]>} - Uma promessa que resolve em um array de objetos de crianças.
 * 
 * @throws {Error} - Se houver um erro ao obter a lista de crianças.
 */
const findCriancas = async () => {
  let crianca = await getCriancas();
  return crianca;
};

/**
 * Cria uma nova criança.
 * 
 * @param {string} rg_crianca - Número do RG da criança.
 * @param {string} nome_crianca - Nome da criança.
 * @param {number} idade_crianca - Idade da criança.
 * @param {string} data_nasc - Data de nascimento da criança (formato: 'YYYY-MM-DD').
 * 
 * @returns {Crianca} - Criança criada.
 * 
 * @throws {Error} - Se houver um erro ao criar a criança.
 */
const criarCrianca = async (rg_crianca, nome_crianca, idade_crianca, data_nasc) => {
  let crianca = await createCrianca(rg_crianca, nome_crianca, idade_crianca, data_nasc);
  return crianca;
};

/**
 * Verifica se a idade da criança está dentro do intervalo permitido.
 *
 * @param {number} idade_crianca - Idade da criança.
 * @param {Object} res - Objeto de resposta HTTP.
 *
 * @returns {void} - Retorna uma resposta HTTP com erro 400 se a idade estiver fora do intervalo de 7 a 17 anos.
 */
const verificarIdade = async (idade_crianca, res) => {
  if (idade_crianca < 7 || idade_crianca > 17) {
    return res.status(400).json({ error: "A idade do aluno deve estar entre 7 e 17 anos."});
  }
}

module.exports = { findCriancas, criarCrianca, verificarIdade };