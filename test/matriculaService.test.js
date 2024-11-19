const { findMatriculas, criarMatricula } = require('../src/models/services/matriculaService.js');
const matriculaBd = require('../src/infra/matriculaBd');

jest.mock('../src/infra/matriculaBd');

describe('Testes de Serviço de Matrícula', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('deve retornar uma lista de matrículas', async () => {
    const mockMatriculas = [
      { rg_crianca: "70707070", id_turma: 1 },
      { rg_crianca: "65656565", id_turma: 2 },
    ];
    matriculaBd.getMatriculas.mockResolvedValue(mockMatriculas);

    const result = await findMatriculas();
    expect(result).toEqual(mockMatriculas);
    expect(matriculaBd.getMatriculas).toHaveBeenCalledTimes(1);
  });

  test('deve criar uma nova matrícula e retornar os dados da matrícula criada', async () => {
    const mockMatricula = { rg_crianca: "70707070", id_turma: 1 };
    matriculaBd.createMatricula.mockResolvedValue(mockMatricula);

    const result = await criarMatricula('70707070', 1);
    expect(result).toEqual(mockMatricula);
    expect(matriculaBd.createMatricula).toHaveBeenCalledWith('70707070', 1);
    expect(matriculaBd.createMatricula).toHaveBeenCalledTimes(1);
  });
});