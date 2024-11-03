const { getCriancas, createCrianca } = require('../src/models/criancaModel.js');
const pool = require('../src/config/conexao.js');

jest.mock('../src/config/conexao.js'); 

describe('Testes do modelo Crianca', () => {

  afterEach(() => {
    jest.clearAllMocks(); 
  });

  test('getCriancas deve retornar uma lista de crianças', async () => {
    const mockRows = [
      { rg_crianca: '12345678', nome_crianca: 'Joãozinho', idade_crianca: 8, data_nasc: '2015-05-01' },
    ];
    pool.query.mockResolvedValue({ rows: mockRows });

    const criancas = await getCriancas();
    expect(criancas).toEqual(mockRows);
    expect(pool.query).toHaveBeenCalledWith('SELECT * FROM projeto_iessa.crianca');
  });

  test('createCrianca deve inserir e retornar uma nova criança', async () => {
    const novaCrianca = { rg_crianca: '87654321', nome_crianca: 'Maria', idade_crianca: 6, data_nasc: '2017-09-15' };
    const mockResponse = { rows: [novaCrianca] };
    pool.query.mockResolvedValue(mockResponse);

    const crianca = await createCrianca(novaCrianca.rg_crianca, novaCrianca.nome_crianca, novaCrianca.idade_crianca, novaCrianca.data_nasc);
    expect(crianca).toEqual(novaCrianca);
    expect(pool.query).toHaveBeenCalledWith(
      'INSERT INTO projeto_iessa.crianca (rg_crianca, nome_crianca, idade_crianca, data_nasc) VALUES ($1, $2, $3, $4) RETURNING *',
      [novaCrianca.rg_crianca, novaCrianca.nome_crianca, novaCrianca.idade_crianca, novaCrianca.data_nasc]
    );
  });
});
