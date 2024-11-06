const pool = require('../config/conexao.js');
const Crianca = require('../models/entity/crianca.js')

const getCriancas =
     async () => {
        let criancas = [];
        const res = await pool.query('SELECT rg_crianca, nome_crianca, idade_crianca, data_nasc FROM projeto_iessa.crianca');
        // console.log("antes" + JSON.stringify(res.rows))
        res.rows.forEach(row => {               
            let crianca = new Crianca(row.rg_crianca, row.nome_crianca, row.idade_crianca, row.data_nasc);
            criancas.push(crianca);       
            // console.log("lista" + JSON.stringify(criancas)) 
        });
        // console.log("depois" + JSON.stringify(criancas))
        return criancas;    
};

const createCrianca = async (rg_crianca, nome_crianca, idade_crianca, data_nasc) => {
  const res = await pool.query(
    'INSERT INTO projeto_iessa.crianca (rg_crianca, nome_crianca, idade_crianca, data_nasc) VALUES ($1, $2, $3, $4) RETURNING *',
    [rg_crianca, nome_crianca, idade_crianca, data_nasc]
  );
  return res.rows[0];
};

module.exports = { getCriancas, createCrianca };