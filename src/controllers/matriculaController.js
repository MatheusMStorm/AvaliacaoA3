const { findMatriculas, criarMatricula, verificarCadastro } = require('../models/services/matriculaService');

const matriculaController = {
  /**
   * @api {get} /api/matriculas Get all matriculas
   * @apiName GetMatriculas
   * @apiGroup Matricula
   *
   * @apiSuccess {Object[]} matriculas List of matriculas
   *
   * @apiSuccessExample Success-Response:
   * HTTP/1.1 200 OK
   * [
   *   {
   *     id_matricula: 1,
   *     rg_crianca: "70707070",
   *     id_turma: 1
   *   },
   *   {
   *     id_matricula: 2,
   *     rg_crianca: "60606060",
   *     id_turma: 2
   *   }
   * ]
   *
   * @apiError (500) ServerError Erro ao obter lista de matrículas.
   * @apiErrorExample {json} Error-Response:
   * HTTP/1.1 500 Internal Server Error
   * {
   *   "error": "Erro ao obter lista de matrículas."
   * }
   */
  getMatriculas: async (req, res) => {
    try {
      const matriculas = await findMatriculas();
      res.status(200).json(matriculas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao obter lista de matrículas.' });
    }
  },

  /**
   * @api {post} /api/matriculas Create a new matricula
   * @apiName CreateMatricula
   * @apiGroup Matricula
   *
   * @apiParam {String} rg_crianca RG da criança
   * @apiParam {Number} id_turma ID da turma
   *
   * @apiSuccess {Object} matricula Matrícula criada
   *
   * @apiSuccessExample Success-Response:
   * HTTP/1.1 201 Created
   * {
   *   id_matricula: 3,
   *   rg_crianca: "70707070",
   *   id_turma: 1
   * }
   *
   * @apiError (400) BadRequest Turma lotada ou criança não cadastrada.
   * @apiError (500) ServerError Erro ao criar nova matrícula.
   * @apiErrorExample {json} Error-Response:
   * HTTP/1.1 500 Internal Server Error
   * {
   *   "error": "Erro ao criar nova matrícula."
   * }
   */
  createMatricula: async (req, res) => {
    const { rg_crianca, id_turma } = req.body;
    const { getQuantidadeAlunosNaTurma } = require('../models/services/turmaService');

    try {
      const criancaExiste = await verificarCadastro(rg_crianca);
      const quantidadeAlunos = await getQuantidadeAlunosNaTurma(id_turma);

      if (quantidadeAlunos >= 20) {
        res.status(400).json({ error: 'A turma já atingiu o limite de 20 alunos.' });
        return; 
      } else if (!criancaExiste) {
        res.status(404).json({ error: 'Criança não cadastrada.' });
        return;
      }

      const novaMatricula = await criarMatricula(rg_crianca, id_turma);
      res.status(201).json(novaMatricula);
    } catch (error) {
      console.error();
      res.status(500).json({ error: 'Erro ao criar nova matrícula.' });
    }
  }
};

module.exports = matriculaController;