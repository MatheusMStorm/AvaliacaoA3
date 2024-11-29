const { getTurmas, createTurma, contarAlunosNaTurma } = require('../../infra/turmaBd');

/**
 * Retorna a lista de todas as turmas.
 * 
 * @returns {Turma[]} - Lista de turmas.
 * 
 * @throws {Error} - Se houver um erro ao obter lista de turmas.
 */
const findTurmas = async () => {
    let turma = await getTurmas();
    return turma;
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
const criarTurma = async (turno_turma, horario_turma, rg_instrutor) => {
    let turma = await createTurma(turno_turma, horario_turma, rg_instrutor);
    return turma;
  };

/**
 * Retorna o número de alunos na turma especificada.
 * 
 * @param {Number} id_turma - ID da turma.
 * @returns {Number} - Número de alunos na turma.
 * 
 * @throws {Error} - Se houver um erro ao consultar a quantidade de alunos na turma.
 */
const getQuantidadeAlunosNaTurma = async (id_turma) => {
    try {
      const quantidadeAlunos = await contarAlunosNaTurma(id_turma);
      return quantidadeAlunos;
    } catch (error) {
      throw new Error('Erro ao consultar a quantidade de alunos na turma: ' + error.message);
    }
  };
  
module.exports = { findTurmas, criarTurma, getQuantidadeAlunosNaTurma };