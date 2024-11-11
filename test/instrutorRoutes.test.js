const request = require('supertest');
const app = require('../src/app');
const db = require('../src/config/conexao')

describe('Testes de Integração para Rotas de Instrutor', () => {
    const rgInstrutor = '1595424644';

    test('GET /api/instrutores deve retornar lista de instrutores', async () => {
        const response = await request(app).get('/api/instrutores');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('POST /api/instrutores deve criar uma novo Instrutor', async () => {
        const novoInstrutor = {
            rg_instrutor: rgInstrutor,
            nome_instrutor: 'Pablo',
        };
        const response = await request(app).post('/api/instrutores').send(novoInstrutor);
        expect(response.status).toBe(201);
        expect(response.body.nome_instrutor).toBe('Pablo');
    });

    afterEach(async () => {
        await db.query('DELETE FROM projeto_iessa.instrutor WHERE rg_instrutor = $1', [rgInstrutor]);
    });
});
