const request = require('supertest');
const app = require('../src/app');
const db = require('../src/config/conexao');

describe('Testes de Integração para Rotas de Turma', () => {
    let idTurma;

    test('GET /api/turmas deve retornar lista de turmas', async () => {
        try {
            const response = await request(app).get('/api/turmas');
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        } catch (error) {
            console.error("Erro no teste de GET /api/turmas:", error);
            throw error;
        }
    });

    test('POST /api/turmas deve criar uma nova turma', async () => {
        try {
            const novaTurma = {
                turno_turma: "Noturno",
                horario_turma: "19:00",
                rg_instrutor: "22222"
            };
            const response = await request(app).post('/api/turmas').send(novaTurma);
            
            console.log("Resposta da criação de turma:", response.body);
            
            expect(response.status).toBe(201);
            expect(response.body.rg_instrutor).toBe("22222");

            idTurma = response.body.id_turma;
            expect(idTurma).toBeDefined();
        } catch (error) {
            console.error("Erro no teste de POST /api/turmas:", error);
            throw error;
        }
    });

    afterEach(async () => {
        try {
            if (idTurma) {
                await db.query('DELETE FROM projeto_iessa.turma WHERE id_turma = $1', [idTurma]);
                idTurma = null;
            }
        } catch (error) {
            console.error("Erro na limpeza dos dados após o teste:", error);
            throw error;
        }
    });
});
