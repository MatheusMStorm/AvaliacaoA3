const { verificarCadastro } = require('../src/models/services/matriculaService');

jest.mock('../src/infra/criancaBd', () => ({
  getCriancaByRg: jest.fn(),
}));

const { getCriancaByRg } = require('../src/infra/criancaBd');

describe('verificar cadastro para matrícula', () => {
  beforeEach(() => {
    getCriancaByRg.mockClear();
  });

  test('deve retornar os dados da criança se o rg_crianca for encontrado', async () => {
    const rg_crianca = '12345678';
    const mockCrianca = { nome: 'João', idade: 10, rg: rg_crianca };

    getCriancaByRg.mockResolvedValue(mockCrianca);

    const result = await verificarCadastro(rg_crianca);

    expect(getCriancaByRg).toHaveBeenCalledWith(rg_crianca);
    expect(result).toEqual(mockCrianca);
  });

  test('deve retornar null se o rg_crianca não for encontrado', async () => {
    const rg_crianca = '87654321';

    getCriancaByRg.mockResolvedValue(null);

    const result = await verificarCadastro(rg_crianca);

    expect(getCriancaByRg).toHaveBeenCalledWith(rg_crianca);
    expect(result).toBeNull();
  });
});
