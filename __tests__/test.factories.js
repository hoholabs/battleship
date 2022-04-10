/**
 * @jest-environment jsdom
 */

const { shipFactory, gameboardFactory, playerFactory } = require('../src/factories')


describe('ship stuff', () => {

    let ship2 

    beforeAll(() => {
        ship2 = shipFactory('patrol', 2);
    });

    test('Check size of ship2', () => {
        expect(ship2.size).toBe(2);
    });

    test('Hit ship2, in position 0', () => {
        expect(ship2.hit(0)).toStrictEqual([1, 0]);
    });

    test('check if ship2 is sunk // false', () => {
        expect(ship2.isSunk()).toBe(false);
    });

    test('Hit ship2, in position 1', () => {
        expect(ship2.hit(1)).toStrictEqual([1, 1]);
    });

    test('check if ship2 is sunk // true', () => {
        expect(ship2.isSunk()).toBe(true);
    });


});

describe('gameboard', () => {

    let board

    beforeAll(() => {
        board = gameboardFactory();
        board.placeShip('patrol',2,0,0,0)
    });

    test('shoot at 0,0', () => {
        expect(board.receiveAttack([0,0])).toStrictEqual([true,false]);
    });

    test('check hits', () => {
        expect(board.hits).toStrictEqual([[0,0]]);
    });

    test('shoot at 7,7', () => {
        expect(board.receiveAttack([7,7])).toStrictEqual([false,false]);
    });

    test('check misses', () => {
        expect(board.misses).toStrictEqual([[7,7]]);
    });

    test('check for gameOver', () => {
        expect(board.gameOver()).toBe(false);
    });

    test('shoot at 0,1', () => {
        expect(board.receiveAttack([1,0])).toStrictEqual([true,true]);
    });

    test('check hits', () => {
        expect(board.hits).toStrictEqual([[0,0],[1,0]]);
    });

    test('check for gameOver', () => {
        expect(board.gameOver()).toBe(true);
    });

});

describe('player things', ()=>{

    let player;
    let computer;

    beforeAll(() => {
        player = playerFactory('Hoho');
        player.gameBoard.placeShip('patrol',2,0,0,0);
        computer = playerFactory('computer');
        computer.gameBoard.placeShip('patrol',2,0,0,0);
    });

    test('player testing players name', () =>{
        expect(player.name).toBe('Hoho');
    });

    test('check for gameOver', () => {
        expect(player.gameBoard.gameOver()).toBe(false);
    });

    test('player can recieve attacks',()=>{
        expect(player.gameBoard.receiveAttack([0,0])).toStrictEqual([true,false]);
    });

    test('player attacks computer at 0,0', () =>{
        expect(player.attack(computer,[0,0])).toEqual([true,false]); //hit, not sunk
    });

    test('computer attacks randomly',()=>{
        expect(computer.attack(player,'random')).toHaveLength(2);
    });

    test('player attacks computer at 1,0', () =>{
        expect(player.attack(computer,[1,0])).toStrictEqual([true,true]); //hit and sunk
    });

    test('check computer for gameOver', () => {
        expect(computer.gameBoard.gameOver()).toBe(true); //all of computer's ships are sunk
    });

});