import { setupGameDom, startGameDom, showShips } from './dom.js';
import { gameboardFactory, playerFactory } from './factories';

export let player 
export let computer

export function setupGame(){

    player = playerFactory('player',10)
    

    setupGameDom(player);

    player.gameBoard.placeShip('patrol',2,0,0,0);
    player.gameBoard.placeShip('submarine',3,3,3,1);
    player.gameBoard.placeShip('destroyer',3,5,5,1);
    player.gameBoard.placeShip('battleship',4,3,1,0);
    player.gameBoard.placeShip('carrier',5,3,9,0);
    
    showShips(player);
};

export function startGame(){

    computer = playerFactory('computer',10)

    startGameDom(computer);

    computer.gameBoard.placeShip('patrol',2,0,0,0);
    computer.gameBoard.placeShip('submarine',3,3,3,1);
    computer.gameBoard.placeShip('destroyer',3,5,5,1);
    computer.gameBoard.placeShip('battleship',4,3,1,0);
    computer.gameBoard.placeShip('carrier',5,2,9,0);

    showShips(computer);
}