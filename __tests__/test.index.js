const { shipFactory } = require('../src/index')

test('ship is created with length', () => {
    expect(shipFactory(2)).toStrictEqual({length:2});
    });
