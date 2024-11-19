const { findInstrutores, criarInstrutor } = require('../src/models/services/instrutorService.js');
const instrutorBd = require('../src/infra/instrutorBd');

jest.mock('../src/infra/instrutorBd');

describe('Testes de Serviço de Instrutor', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('deve retornar uma lista de instrutores', async () => {
    const mockInstrutores = [
      { rg_instrutor: "3333333", nome_instrutor: "Luis" },
      { rg_instrutor: "4444444", nome_instrutor: "Mário" },
    ];
    instrutorBd.getInstrutores.mockResolvedValue(mockInstrutores);

    const result = await findInstrutores();
    expect(result).toEqual(mockInstrutores);
    expect(instrutorBd.getInstrutores).toHaveBeenCalledTimes(1);
  });

  test('deve criar um novo instrutor e retornar os dados do instrutor criado', async () => {
    const mockInstrutor = { rg_instrutor: "4444444", nome_instrutor: "Mário" };
    instrutorBd.createInstrutor.mockResolvedValue(mockInstrutor);

    const result = await criarInstrutor('4444444', 'Mário');
    expect(result).toEqual(mockInstrutor);
    expect(instrutorBd.createInstrutor).toHaveBeenCalledWith('4444444', 'Mário');
    expect(instrutorBd.createInstrutor).toHaveBeenCalledTimes(1);
  });
});