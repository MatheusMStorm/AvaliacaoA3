const { getCriancas, createCrianca } = require('../../infra/bd');

const findCriancas = async () => {
  let crianca = await getCriancas();
  console.log(JSON.stringify(crianca.sort()))
  return crianca.sort();
};

const criarCrianca = async (rg_crianca, nome_crianca, idade_crianca, data_nasc) => {
  createCrianca(rg_crianca, nome_crianca, idade_crianca, data_nasc);
};

module.exports = { findCriancas, criarCrianca };