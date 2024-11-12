const { getResponsaveis, createResponsavel } = require('../../infra/responsavelBd');

const findResponsaveis = async () => {
    let responsavel = await getResponsaveis();
    return responsavel;
  };
  
  const criarResponsavel = async (req, res) => {
    const { senha, rg_responsavel, nome_responsavel, endereco, grau_responsavel, rg_crianca } = req.body;
  
    if (!/^\d{8}$/.test(senha)) {
      return res.status(400).json({ error: 'A senha deve conter exatamente 8 caracteres numéricos.' });
    }
  
    try {
      const novoResponsavel = await criarResponsavel(rg_responsavel, nome_responsavel, endereco, grau_responsavel, rg_crianca);
      res.status(201).json(novoResponsavel);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar novo responsável.' });
    }
  };
  
  module.exports = { findResponsaveis, criarResponsavel };