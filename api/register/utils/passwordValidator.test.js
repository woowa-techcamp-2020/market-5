
const passwordValidator = require('./passwordValidator.js');

test('패스워드 검증', () => {
    const result = passwordValidator('rla48625');
    expect(result).toBe(true);
})
