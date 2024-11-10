const pool = require('../config/conexao.js');
const Matricula = require('../models/entity/matricula.js')

const getMatriculas = async () => {
    let matriculas = [];
    const res = await pool.query('SELECT rg_crianca, id_turma FROM projeto_iessa.matricula');
    res.rows.forEach(row => {
        let matricula = new Matricula(row.rg_crianca, row.id_turma);
        matriculas.push(matricula);
    });
    return matriculas;
};

const createMatricula = async (rg_crianca, id_turma) => {
  const res = await pool.query(
    'INSERT INTO projeto_iessa.matricula (rg_crianca, id_turma) VALUES ($1, $2) RETURNING *',
    [rg_crianca, id_turma]
  );

  await pool.query(
    'UPDATE projeto_iessa.turma SET numero_alunos = numero_alunos + 1 WHERE id_turma = $1', [id_turma]
  );

  let matricula = new Matricula(rg_crianca, id_turma);
  return matricula;
};

module.exports = { getMatriculas, createMatricula };