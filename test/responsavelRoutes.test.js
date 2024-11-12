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
        try {
            const response = await request(app).get('/api/responsaveis');
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        } catch (error) {
            console.error("Erro no teste de GET /api/responsaveis:", error);
            throw error;
        }
    });

    test('POST /api/responsaveis deve criar um novo responsável', async () => {
        try {
            const novoResponsavel = {
                rg_responsavel: rgResponsavel,
                nome_responsavel: "Luiz", 
                endereco: "Rua do Sol, 122", 
                graupa_responsavel: "Pai",  
                rg_crianca: rgCrianca, 
                senha: "12345678",
            };
            const response = await request(app).post('/api/responsaveis').send(novoResponsavel);
            
            console.log("Resposta da criação de responsável:", response.body); 
            
            expect(response.status).toBe(201);
            expect(response.body.nome_responsavel).toBe('Luiz');
        } catch (error) {
            console.error("Erro no teste de POST /api/responsaveis:", error);
            throw error;
        }
    });

    afterEach(async () => {
        try {
            await db.query('DELETE FROM projeto_iessa.responsavel WHERE rg_responsavel = $1', [rgResponsavel]);
            await db.query('DELETE FROM projeto_iessa.crianca WHERE rg_crianca = $1', [rgCrianca]);
        } catch (error) {
            console.error("Erro ao limpar os dados após o teste:", error);
            throw error;
        }
    });
});
