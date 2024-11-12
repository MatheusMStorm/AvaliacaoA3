const request = require('supertest');
const app = require('../src/app');
const db = require('../src/config/conexao');

describe('Testes de Integração para Rotas de Matrícula', () => {
    let idMatricula;

    test('GET /api/matriculas deve retornar lista de matrículas', async () => {
        try {
            const response = await request(app).get('/api/matriculas');
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        } catch (error) {
            console.error("Erro no teste de GET /api/matriculas:", error);
            throw error;
        }
    });

    test('POST /api/matriculas deve criar uma nova matrícula', async () => {
        try {
            const novaMatricula = {
                rg_crianca: "60606060",
                id_turma: 6
            };
            const response = await request(app).post('/api/matriculas').send(novaMatricula);
            
            console.log("Resposta da criação de matrícula:", response.body);  // Log para ver o conteúdo da resposta
            
            expect(response.status).toBe(201);
            expect(response.body.id_turma).toBe(6);

            idMatricula = response.body.id_matricula;
            expect(idMatricula).toBeDefined();
        } catch (error) {
            console.error("Erro no teste de POST /api/matriculas:", error);
            throw error;
        }
    });

    afterEach(async () => {
        try {
            if (idMatricula) {
                await db.query('DELETE FROM projeto_iessa.matricula WHERE id_matricula = $1', [idMatricula]);
                idMatricula = null;
            }
        } catch (error) {
            console.error("Erro na limpeza dos dados após o teste:", error);
            throw error;
        }
    });
});
