const { findResponsaveis, criarResponsavel } = require('../src/models/services/responsavelService.js');
const responsavelBd = require('../src/infra/responsavelBd');

jest.mock('../src/infra/responsavelBd');

describe('Testes de Serviço de Responsável', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('deve retornar uma lista de responsáveis', async () => {
    const mockResponsaveis = [
      { rg_responsavel: '1111111', nome_responsavel: 'Carlos', endereco: 'Rua Estados Unidos, 122', graupa_responsavel: 'Avô', rg_crianca: '70707070', senha: '12345678' },
      { rg_responsavel: '2222222', nome_responsavel: 'Mariana', endereco: 'Rua Uruguai, 259', graupa_responsavel: 'Mãe', rg_crianca: '60606060', senha: '19928991' },
    ];
    responsavelBd.getResponsaveis.mockResolvedValue(mockResponsaveis);

    try {
      const result = await findResponsaveis();
      expect(result).toEqual(mockResponsaveis);
      expect(responsavelBd.getResponsaveis).toHaveBeenCalledTimes(1);
    } catch (error) {
      throw new Error(`Erro ao buscar responsáveis: ${error.message}`);
    }
  });

  test('deve criar um novo responsável e retornar os dados do responsável criado', async () => {
    const mockResponsavel = { rg_responsavel: '1111111', nome_responsavel: 'Carlos', endereco: 'Rua Estados Unidos, 122', graupa_responsavel: 'Avô', rg_crianca: '70707070', senha: '12345678' };
    responsavelBd.createResponsavel.mockResolvedValue(mockResponsavel);

    try {
      const result = await criarResponsavel('1111111', 'Carlos', 'Rua Estados Unidos, 122', 'Avô', '70707070', '12345678');
      expect(result).toEqual(mockResponsavel);
      expect(responsavelBd.createResponsavel).toHaveBeenCalledWith('1111111', 'Carlos', 'Rua Estados Unidos, 122', 'Avô', '70707070', '12345678');
      expect(responsavelBd.createResponsavel).toHaveBeenCalledTimes(1);
    } catch (error) {
      throw new Error(`Erro ao criar responsável: ${error.message}`);
    }
  });
});