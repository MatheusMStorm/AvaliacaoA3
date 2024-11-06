const { getCriancas, createCrianca } = require('../../infra/criancaBd');

const findCriancas = async () => {
  let crianca = await getCriancas();
  return crianca;
};

const criarCrianca = async (rg_crianca, nome_crianca, idade_crianca, data_nasc) => {
  let crianca = await createCrianca(rg_crianca, nome_crianca, idade_crianca, data_nasc);
  return crianca;
};

module.exports = { findCriancas, criarCrianca };