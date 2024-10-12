const soma = require('../src/soma');

test('soma 1 + 2 para encontrar 3', () => {
    expect(soma(1, 2)).toBe(3);
});