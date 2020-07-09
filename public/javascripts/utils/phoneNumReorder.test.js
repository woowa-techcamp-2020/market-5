const phoneNumReorder = require('./phoneNumReorder.js');

test('폰 번호 재정렬', () => {
    const result = phoneNumReorder('010-5658');
    expect(result).toBe('010-5658-');
})