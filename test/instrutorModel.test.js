const { getInstrutores, createInstrutor } = require('../src/models/instrutorModel.js');
const pool = require('../src/config/conexao.js');

jest.mock('../src/config/conexao.js');

describe('Testes do modelo Instrutor', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getInstrutores deve retornar uma lista de instrutores', async () => {
    const mockRows = [
      { rg_instrutor: '12345', nome_instrutor: 'Professor A' },
    ];
    pool.query.mockResolvedValue({ rows: mockRows });

    const instrutores = await getInstrutores();
    expect(instrutores).toEqual(mockRows);
    expect(pool.query).toHaveBeenCalledWith('SELECT * FROM projeto_iessa.instrutor');
  });

  test('createInstrutor deve inserir e retornar um novo instrutor', async () => {
    const novoInstrutor = { rg_instrutor: '67890', nome_instrutor: 'Professor B' };
    const mockResponse = { rows: [novoInstrutor] };
    pool.query.mockResolvedValue(mockResponse);

    const instrutor = await createInstrutor(novoInstrutor.rg_instrutor, novoInstrutor.nome_instrutor);
    expect(instrutor).toEqual(novoInstrutor);
    expect(pool.query).toHaveBeenCalledWith(
      'INSERT INTO projeto_iessa.instrutor (rg_instrutor, nome_instrutor) VALUES ($1, $2) RETURNING *',
      [novoInstrutor.rg_instrutor, novoInstrutor.nome_instrutor]
    );
  });
});
