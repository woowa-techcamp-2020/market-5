const idValidator = require('./idValidator.js');

test('아이디 검증', () => {
    const result = idValidator('nohgijin');
    expect(result).toBe(true)
})