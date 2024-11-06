const { getResponsaveis, createResponsavel } = require('../../infra/responsavelBd');

const findResponsaveis = async () => {
    let responsavel = await getResponsaveis();
    return responsavel;
  };
  
  const criarResponsavel = async (rg_responsavel, nome_responsavel, endereco, graupa_responsavel, rg_crianca) => {
    let responsavel = await createResponsavel(rg_responsavel, nome_responsavel, endereco, graupa_responsavel, rg_crianca);
    return responsavel;
  };
  
  module.exports = { findResponsaveis, criarResponsavel };