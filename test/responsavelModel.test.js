const { getResponsaveis, createResponsavel } = require('../src/models/responsavelModel.js');
const pool = require('../src/config/conexao.js');

jest.mock('../src/config/conexao.js');

describe('Testes do modelo Responsavel', () => {

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('getResponsaveis deve retornar uma lista de responsáveis', async () => {
    const mockRows = [
      { 
        rg_responsavel: '14667',
        nome_responsavel: 'Responsável A',
        endereco: 'Endereço A',
        graupa_responsavel: 'Grupo A',
        rg_crianca: 'RG da criança A'
      },
    ];
    pool.query.mockResolvedValue({ rows: mockRows });
  
    const responsaveis = await getResponsaveis();
    expect(responsaveis).toEqual(mockRows);
    expect(pool.query).toHaveBeenCalledWith('SELECT * FROM projeto_iessa.responsavel');
  });

  test('createResponsavel deve inserir e retornar um novo responsável', async () => {
    const novoResponsavel = {
      rg_responsavel: '67880',
      nome_responsavel: 'Responsável B',
      endereco: 'Endereço B',
      graupa_responsavel: 'Grupo B',
      rg_crianca: 'RG da criança B'
    };
    const mockResponse = { rows: [novoResponsavel] };
    pool.query.mockResolvedValue(mockResponse);

    const responsavel = await createResponsavel(
      novoResponsavel.rg_responsavel,
      novoResponsavel.nome_responsavel,
      novoResponsavel.endereco,
      novoResponsavel.graupa_responsavel,
      novoResponsavel.rg_crianca
    );

    expect(responsavel).toEqual(novoResponsavel);
    expect(pool.query).toHaveBeenCalledWith(
      'INSERT INTO projeto_iessa.responsavel (rg_responsavel, nome_responsavel, endereco, graupa_responsavel, rg_crianca) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      ['67880', 'Responsável B', 'Endereço B', 'Grupo B', 'RG da criança B']
    );
  });
});
