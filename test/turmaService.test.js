const { findTurmas, criarTurma } = require('../src/models/services/turmaService.js');
const turmaBd = require('../src/infra/turmaBd');

jest.mock('../src/infra/turmaBd');

describe('Testes de Serviço de Turma', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('deve retornar uma lista de turmas', async () => {
    const mockTurmas = [
      { turno_turma: 'Vespertino', horario_turma: '14:00', rg_instrutor: '22222' },
      { turno_turma: 'Matutino', horario_turma: '09:00', rg_instrutor: '33333' },
    ];
    turmaBd.getTurmas.mockResolvedValue(mockTurmas);

    try {
      const result = await findTurmas();
      expect(result).toEqual(mockTurmas);
      expect(turmaBd.getTurmas).toHaveBeenCalledTimes(1);
    } catch (error) {
      throw new Error(`Erro ao buscar turmas: ${error.message}`);
    }
  });

  test('deve criar uma nova turma e retornar os dados da turma criada', async () => {
    const mockTurma = { turno_turma: 'Vespertino', horario_turma: '14:00', rg_instrutor: '22222' };
    turmaBd.createTurma.mockResolvedValue(mockTurma);

    try {
      const result = await criarTurma('Vespertino', '14:00', '22222');
      expect(result).toEqual(mockTurma);
      expect(turmaBd.createTurma).toHaveBeenCalledWith('Vespertino', '14:00', '22222');
      expect(turmaBd.createTurma).toHaveBeenCalledTimes(1);
    } catch (error) {
      throw new Error(`Erro ao criar turma: ${error.message}`);
    }
  });
});