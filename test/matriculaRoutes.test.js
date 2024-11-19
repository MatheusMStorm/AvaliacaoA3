const request = require('supertest');
const app = require('../src/app');
const db = require('../src/config/conexao');

describe('Testes de Integração para Rotas de Matrícula', () => {
    let idMatricula;

    test('GET /api/matriculas deve retornar lista de matrículas', async () => {
        const response = await request(app).get('/api/matriculas');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('POST /api/matriculas deve criar uma nova matrícula', async () => {
        const novaMatricula = {
            rg_crianca: "9883299000",
            id_turma: 70
        };
        const response = await request(app).post('/api/matriculas').send(novaMatricula);

        console.log("Resposta da criação de matrícula:", response.body);

        expect(response.status).toBe(201);
        expect(response.body.id_turma).toBe(70);

        idMatricula = response.body.id_matricula;
        expect(idMatricula).toBeDefined();
    });

    afterEach(async () => {
        if (idMatricula) {
            await db.query('DELETE FROM projeto_iessa.matricula WHERE id_matricula = $1', [idMatricula]);
            idMatricula = null;
        }
    });
});