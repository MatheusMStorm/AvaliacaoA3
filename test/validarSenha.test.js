const { verificarSenha } = require('../src/models/services/responsavelService');

describe('verificar senha cadastrada', () => {
  let res;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  test('deve retornar erro se a senha não tiver exatamente 8 dígitos numéricos', async () => {
    const senhaInvalida = '1234567';

    await verificarSenha(senhaInvalida, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'A senha deve conter exatamente 8 caracteres numéricos.' });
  });

  test('não deve retornar erro se a senha tiver exatamente 8 dígitos numéricos', async () => {
    const senhaValida = '12345678';

    await verificarSenha(senhaValida, res);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});
