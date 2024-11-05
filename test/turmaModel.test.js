const { getTurmas, createTurma } = require('../src/models/turmaModel.js');
const pool = require('../src/config/conexao.js');

jest.mock('../src/config/conexao.js'); 

describe('Testes do modelo Turma', () => {

  afterEach(() => {
    jest.clearAllMocks(); 
  });

  test('getTurmas deve retornar uma lista de Turmas', async () => {
    const mockRows = [
      { turno_turma: "manhã", horario_turma: "08:00", rg_instrutor: "123456789" },
    ];
    pool.query.mockResolvedValue({ rows: mockRows });

    const turmas = await getTurmas();
    expect(turmas).toEqual(mockRows);
    expect(pool.query).toHaveBeenCalledWith('SELECT * FROM projeto_iessa.turma');
  });

  test('createTurma deve inserir e retornar uma nova turma', async () => {
    const novaTurma =  { turno_turma: "manhã", horario_turma: "08:00", rg_instrutor: "123456789" };
    const mockResponse = { rows: [novaTurma] };
    pool.query.mockResolvedValue(mockResponse);

    const turma = await createTurma (novaTurma.turno_turma, novaTurma.horario_turma, novaTurma.rg_instrutor);
    expect(turma).toEqual(novaTurma);
    expect(pool.query).toHaveBeenCalledWith(
    "INSERT INTO projeto_iessa.turma (turno_turma, horario_turma, rg_instrutor) VALUES ($1, $2, $3) RETURNING *",
      [novaTurma.turno_turma, novaTurma.horario_turma, novaTurma.rg_instrutor]
    );
  });
});
