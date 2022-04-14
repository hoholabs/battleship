import { setupGameDom, startGameDom, showShips } from './dom.js';
import { gameboardFactory, playerFactory } from './factories';

export let human 
export let computer

export function setupGame(){

    human = playerFactory('human',10)
    

    setupGameDom(human);

    human.gameBoard.placeShip('patrol',2,0,0,0);
    human.gameBoard.placeShip('submarine',3,3,3,1);
    human.gameBoard.placeShip('destroyer',3,5,5,1);
    human.gameBoard.placeShip('battleship',4,3,1,0);
    human.gameBoard.placeShip('carrier',5,3,9,0);
    
    showShips(human);
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