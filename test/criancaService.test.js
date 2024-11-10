const { findCriancas, criarCrianca } = require('../src/models/services/criancaService.js');
const criancaBd = require('../src/infra/criancaBd');

jest.mock('../src/infra/criancaBd');

describe('Testes de Serviço de Criança', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('deve retornar uma lista de crianças', async () => {
    const mockCriancas = [
      { rg_crianca: '12345678', nome_crianca: 'Joãozinho', idade_crianca: 8, data_nasc: '2015-05-01' },
      { rg_crianca: '23828198', nome_crianca: 'Mariazinha', idade_crianca: 9, data_nasc: '2014-05-01' },
    ];
    criancaBd.getCriancas.mockResolvedValue(mockCriancas);

    const result = await findCriancas();

    expect(result).toEqual(mockCriancas);
    expect(criancaBd.getCriancas).toHaveBeenCalledTimes(1);
  });

  test('deve criar uma nova criança e retornar os dados da criança criada', async () => {
    const mockCrianca = { rg_crianca: '34577898', nome_crianca: 'Luiza', idade_crianca: 10, data_nasc: '2013-05-01' };
    criancaBd.createCrianca.mockResolvedValue(mockCrianca);

    const result = await criarCrianca('34577898', 'Luiza', 10, '2013-05-01');

    expect(result).toEqual(mockCrianca);
    expect(criancaBd.createCrianca).toHaveBeenCalledWith('34577898', 'Luiza', 10, '2013-05-01');
    expect(criancaBd.createCrianca).toHaveBeenCalledTimes(1);
  });
});
