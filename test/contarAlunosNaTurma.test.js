const { getQuantidadeAlunosNaTurma } = require('../src/models/services/turmaService');

jest.mock('../src/infra/turmaBd', () => ({
  contarAlunosNaTurma: jest.fn(),
}));

const { contarAlunosNaTurma } = require('../src/infra/turmaBd');

describe('getQuantidadeAlunosNaTurma', () => {
  beforeEach(() => {
    contarAlunosNaTurma.mockClear();
  });

  test('deve retornar a quantidade de alunos na turma quando `contarAlunosNaTurma` tem sucesso', async () => {
    const id_turma = 1;
    const mockQuantidade = 25;

    contarAlunosNaTurma.mockResolvedValue(mockQuantidade);

    const quantidadeAlunos = await getQuantidadeAlunosNaTurma(id_turma);

    expect(contarAlunosNaTurma).toHaveBeenCalledWith(id_turma);
    expect(quantidadeAlunos).toBe(mockQuantidade);
  });

  test('deve lançar um erro se `contarAlunosNaTurma` lançar um erro', async () => {
    const id_turma = 1;

    contarAlunosNaTurma.mockRejectedValue(new Error('Erro de banco de dados'));

    await expect(getQuantidadeAlunosNaTurma(id_turma)).rejects.toThrow('Erro ao consultar a quantidade de alunos na turma: Erro de banco de dados');

    expect(contarAlunosNaTurma).toHaveBeenCalledWith(id_turma);
  });
});