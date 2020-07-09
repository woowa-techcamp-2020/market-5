const nameValidator = require('./nameValidator');

test('이름 검증', () => {
    const result = nameValidator('박@지@환');
    expect(result).toBe(false)
})