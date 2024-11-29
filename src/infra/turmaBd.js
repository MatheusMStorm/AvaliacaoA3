const pool = require('../config/conexao.js');
const Turma = require('../models/entity/turma.js');

/**
 * Retorna a lista de todas as turmas.
 * 
 * @returns {Turma[]} - Lista de turmas.
 * 
 * @throws {Error} - Se houver um erro ao obter lista de turmas.
 */
const getTurmas = async () => {
    let turmas = [];
    const res = await pool.query('SELECT id_turma, turno_turma, horario_turma, rg_instrutor, numero_alunos FROM projeto_iessa.turma');
    res.rows.forEach(row => {
        let turma = new Turma(row.id_turma,row.turno_turma, row.horario_turma, row.rg_instrutor, row.numero_alunos);
        turmas.push(turma);
    });
    return turmas;
};

/**
 * Cria um novo registro de turma no banco de dados.
 * 
 * @param {string} turno_turma - Turno da turma.
 * @param {string} horario_turma - Horário da turma.
 * @param {string} rg_instrutor - RG do instrutor responsável pela turma.
 * 
 * @returns {Turma} - Objeto Turma recém-criado.
 * 
 * @throws {Error} - Se a consulta ao banco de dados falhar.
 */
const createTurma = async (turno_turma, horario_turma, rg_instrutor) => {
    const res = await pool.query(
        'INSERT INTO projeto_iessa.turma (turno_turma, horario_turma, rg_instrutor) VALUES ($1, $2, $3) RETURNING *',
        [turno_turma, horario_turma, rg_instrutor]
    );

    const { id_turma } = res.rows[0]
    let turma = new Turma(id_turma, turno_turma, horario_turma, rg_instrutor);
    return turma;
};

/**
 * Conta o número de alunos na turma especificada.
 * 
 * @param {Number} id_turma - ID da turma.
 * @returns {Number} - Número de alunos na turma.
 * 
 * @throws {Error} - Se a consulta ao banco de dados falhar.
 */
const contarAlunosNaTurma = async (id_turma) => {
    try {
      const result = await pool.query('SELECT numero_alunos FROM projeto_iessa.turma WHERE id_turma = $1', [id_turma]);
      if (result.rows.length > 0) {
        return result.rows[0].numero_alunos;
      }
      throw new Error('Turma não encontrada.');
    } catch (error) {
      console.error('Erro ao contar alunos na turma:', error);
      throw error;
    }
  };

module.exports = { getTurmas, createTurma, contarAlunosNaTurma };