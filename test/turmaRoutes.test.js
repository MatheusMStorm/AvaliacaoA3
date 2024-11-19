const request = require('supertest');
const app = require('../src/app');
const db = require('../src/config/conexao');

describe('Testes de Integração para Rotas de Turma', () => {
    let idTurma;

    test('GET /api/turmas deve retornar lista de turmas', async () => {
        const response = await request(app).get('/api/turmas');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('POST /api/turmas deve criar uma nova turma', async () => {
        const novaTurma = {
            turno_turma: "Noturno",
            horario_turma: "19:00",
            rg_instrutor: "1426927355"
        };
        const response = await request(app).post('/api/turmas').send(novaTurma);

        console.log("Resposta da criação de turma:", response.body);

        expect(response.status).toBe(201);
        expect(response.body.rg_instrutor).toBe("1426927355");

        idTurma = response.body.id_turma;
        expect(idTurma).toBeDefined();
    });

    afterEach(async () => {
        if (idTurma) {
            await db.query('DELETE FROM projeto_iessa.turma WHERE id_turma = $1', [idTurma]);
            idTurma = null;
        }
    });
});
