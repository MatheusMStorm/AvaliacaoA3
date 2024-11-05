const { getMatricula, createMatricula, getMatriculas } = require('../src/models/matriculaModel.js');
const pool = require('../src/config/conexao.js');

jest.mock('../src/config/conexao.js');

describe('Testes do modelo Matricula', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getMatriculas deve retornar uma lista de Matricula', async () => {
    const mockRows = [
      { rg_crianca: '5664', id_turma: 'Turma A' },
    ];
    pool.query.mockResolvedValue({ rows: mockRows });

    const matricula = await getMatriculas();
    expect(matricula).toEqual(mockRows);
    expect(pool.query).toHaveBeenCalledWith('SELECT * FROM projeto_iessa.matricula');
  });

  test('createMatricula deve inserir e retornar uma nova Matricula', async () => {
    const novaMatricula = { rg_crianca: '4565', id_turma: 'Turma B' };
    const mockResponse = { rows: [novaMatricula] };
    pool.query.mockResolvedValue(mockResponse);

    const matricula = await createMatricula(novaMatricula.rg_crianca, novaMatricula.id_turma);
    expect(matricula).toEqual(novaMatricula);
    expect(pool.query).toHaveBeenCalledWith(
      'INSERT INTO projeto_iessa.matricula (rg_crianca, id_turma) VALUES ($1, $2) RETURNING *',
      [novaMatricula.rg_crianca, novaMatricula.id_turma]
    );
  });
});