const soma = require('../src/teste.js');

test('adiciona 1 + 2 e encontra 3', () => {
    expect(soma(1, 2)).toBe(3);
});
