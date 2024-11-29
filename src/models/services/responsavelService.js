const { getResponsaveis, createResponsavel } = require('../../infra/responsavelBd');

/**
 * Retorna a lista de todos os responsáveis.
 * @returns {Promise} A lista de responsáveis.
 */
const findResponsaveis = async () => {
    let responsavel = await getResponsaveis();
    return responsavel;
  };
  
  /**
   * Cria um novo responsável.
   * @param {string} rg_responsavel - Número do RG do responsável.
   * @param {string} nome_responsavel - Nome do responsável.
   * @param {string} endereco - Endereço do responsável.
   * @param {string} graupa_responsavel - Grau de parentesco com a criança.
   * @param {string} rg_crianca - Número do RG da criança.
   * @param {string} senha - Senha para login.
   * @returns {Promise} - O novo responsável criado.
   */
const criarResponsavel = async (rg_responsavel, nome_responsavel, endereco, graupa_responsavel, rg_crianca, senha) => {
    let responsavel = await createResponsavel(rg_responsavel, nome_responsavel, endereco, graupa_responsavel, rg_crianca, senha);
    return responsavel;
  };

  /**
   * Verifica se a senha tem 8 caracteres numéricos.
   * @param {string} senha - Senha a ser verificada.
   * @param {Object} res - Resposta da rota.
   * @returns {Promise} - null se a senha for válida, ou um erro 400 caso contrário.
   */
const verificarSenha = async (senha, res) => {
  if (!/^\d{8}$/.test(senha)) {
    return res.status(400).json({ error: 'A senha deve conter exatamente 8 caracteres numéricos.' });
  }
}
  
module.exports = { findResponsaveis, criarResponsavel, verificarSenha };