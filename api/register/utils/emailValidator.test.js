const emailValidator = require('./emailValidator.js');

test('이메일 검증', () => {
    const result = emailValidator('naver.com');
    expect(result).toBe(true)
})