const { getResponsaveis, createResponsavel } = require('../../infra/responsavelBd');

const findResponsaveis = async () => {
    let responsavel = await getResponsaveis();
    return responsavel;
  };
  
const criarResponsavel = async (rg_responsavel, nome_responsavel, endereco, graupa_responsavel, rg_crianca, senha) => {
    let responsavel = await createResponsavel(rg_responsavel, nome_responsavel, endereco, graupa_responsavel, rg_crianca, senha);
    return responsavel;
  };

const verificarSenha = async (senha, res) => {
  if (!/^\d{8}$/.test(senha)) {
    return res.status(400).json({ error: 'A senha deve conter exatamente 8 caracteres numéricos.' });
  }
}
  
module.exports = { findResponsaveis, criarResponsavel, verificarSenha };