const request = require('supertest');
const app = require('../src/app');
const db = require('../src/config/conexao')

describe('Testes de Integração para Rotas de Criança', () => {
    const rgCrianca = '20202020';

    test('GET /api/criancas deve retornar lista de crianças', async () => {
        const response = await request(app).get('/api/criancas');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('POST /api/criancas deve criar uma nova criança', async () => {
        const novaCrianca = {
            rg_crianca: rgCrianca,
            nome_crianca: 'Marcos',
            idade_crianca: 12,
            data_nasc: '2012-05-01'
        };
        const response = await request(app).post('/api/criancas').send(novaCrianca);
        expect(response.status).toBe(201);
        expect(response.body.nome_crianca).toBe('Marcos');
    });

    afterEach(async () => {
        await db.query('DELETE FROM projeto_iessa.crianca WHERE rg_crianca = $1', [rgCrianca]);
    });
});
