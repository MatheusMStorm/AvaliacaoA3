const { getCriancas, createCrianca } = require('../../infra/criancaBd');

const findCriancas = async () => {
  let crianca = await getCriancas();
  return crianca;
};

const criarCrianca = async (rg_crianca, nome_crianca, idade_crianca, data_nasc) => {
  let crianca = await createCrianca(rg_crianca, nome_crianca, idade_crianca, data_nasc);
  return crianca;
};

const verificarIdade = async (idade_crianca, res) => {
  if (idade_crianca < 7 || idade_crianca > 17) {
    return res.status(400).json({ error: "A idade do aluno deve estar entre 7 e 17 anos."});
  }
}

module.exports = { findCriancas, criarCrianca, verificarIdade };