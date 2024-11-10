const request = require('supertest');
const app = require('../src/app');

describe('Testes de Integração para Rotas de Criança', () => {
  test('GET /api/criancas deve retornar lista de crianças', async () => {
    const response = await request(app).get('/api/criancas');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('POST /api/criancas deve criar uma nova criança', async () => {
    const novaCrianca = {
      rg_crianca: '10101010',
      nome_crianca: 'Marcos',
      idade_crianca: 12,
      data_nasc: '2012-05-01'
    };
    const response = await request(app).post('/api/criancas').send(novaCrianca);
    expect(response.status).toBe(201);
    expect(response.body.nome_crianca).toBe('Marcos');
  });
});
