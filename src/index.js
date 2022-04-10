import './style.css';
import { createPage,showShips } from './dom.js';
import { gameboardFactory } from './factories';
import { setupGame } from './game';

createPage();
setupGame();

// let playerBoard = gameboardFactory('playerBoard',10);
// let computerBoard = gameboardFactory('computerBoard',10);

// let table = document.getElementById('table');
// table.append(playerBoard.board);
// table.append(computerBoard.board);

// playerBoard.placeShip('patrol',2,0,0,0);
// playerBoard.placeShip('submarine',3,3,3,1);
// playerBoard.placeShip('destroyer',3,5,5,1);
// playerBoard.placeShip('battleship',4,3,1,0);
// playerBoard.placeShip('carrier',5,3,9,0);

// computerBoard.placeShip('patrol',2,0,4,0);
// computerBoard.placeShip('submarine',3,4,3,0);
// computerBoard.placeShip('destroyer',3,5,5,1);
// computerBoard.placeShip('battleship',4,3,1,0);
// computerBoard.placeShip('carrier',5,3,9,0);

// showShips(playerBoard);
// showShips(computerBoard);
