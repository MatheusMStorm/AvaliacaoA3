const request = require('supertest');
const app = require('../src/app');
const db = require('../src/config/conexao');

describe('Testes de Integração para Rotas de Responsável', () => {
    const rgResponsavel = '10101010';
    const rgCrianca = '80808080';

    beforeEach(async () => {
        await db.query(
            'INSERT INTO projeto_iessa.crianca (rg_crianca, nome_crianca, idade_crianca, data_nasc) VALUES ($1, $2, $3, $4)',
            [rgCrianca, 'Maria', 9, '2015-06-15']
        );
    });


    test('GET /api/responsaveis deve retornar lista de responsáveis', async () => {
        const response = await request(app).get('/api/responsaveis');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('POST /api/responsaveis deve criar um novo responsável', async () => {
        const novoResponsavel = {
            rg_responsavel: rgResponsavel,
            nome_responsavel: "Luiz",
            endereco: "Rua do Sol, 122",
            graupa_responsavel: "Pai",
            rg_crianca: rgCrianca,
            senha: "12345678",
        };
        const response = await request(app).post('/api/responsaveis').send(novoResponsavel);

        expect(response.status).toBe(201);
    });

    test('POST /api/responsaveis deve retornar um erro 400', async () => {
        const novoResponsavel = {
            rg_responsavel: rgResponsavel,
            nome_responsavel: "Luiz",
            endereco: "Rua do Sol, 122",
            graupa_responsavel: "Pai",
            rg_crianca: rgCrianca,
            senha: "123A456E",
        };
        const response = await request(app).post('/api/responsaveis').send(novoResponsavel);

        expect(response.status).toBe(400);
    });

    afterEach(async () => {
        await db.query('DELETE FROM projeto_iessa.responsavel WHERE rg_responsavel = $1', [rgResponsavel]);
        await db.query('DELETE FROM projeto_iessa.crianca WHERE rg_crianca = $1', [rgCrianca]);
    });
});
