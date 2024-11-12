const { verificarIdade } = require('../src/models/services/criancaService');

describe('verificar idade da criança', () => {
    let res;

    beforeEach(() => {
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
    });
  
    test('deve retornar erro se idade_crianca for menor que 7', async () => {
      const idade_crianca = 6;
  
      await verificarIdade(idade_crianca, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "A idade do aluno deve estar entre 7 e 17 anos." });
    });
  
    test('deve retornar erro se idade_crianca for maior que 17', async () => {
      const idade_crianca = 18;
  
      await verificarIdade(idade_crianca, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "A idade do aluno deve estar entre 7 e 17 anos." });
    });
  
    test('não deve retornar erro se idade_crianca estiver entre 7 e 17', async () => {
      const idade_crianca = 10;
  
      await verificarIdade(idade_crianca, res);
  
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
  });