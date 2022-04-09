import './style.css';
import { createPage, showShips } from './dom.js';
import { gameboardFactory } from './factories';

createPage();

let playerBoard = gameboardFactory('player');
playerBoard.placeShip('patrol',2,0,0,0);
playerBoard.placeShip('submarine',3,3,3,1);

showShips(playerBoard);