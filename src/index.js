import './style.css';
import { createPage, setupGameDom, startGameDom, showShips, shipPickerBoard, showPickedShip } from './dom.js';
import { gameboardFactory, playerFactory } from './factories';
import { startGame, setupGame } from './game';

console.log('index');

createPage();

let human = playerFactory('human',10)
let computer = playerFactory('computer',10)

//console.log(human.gameBoard);

human.gameBoard.placeShip('patrol',2,0,0,1);
human.gameBoard.placeShip('submarine',3,0,3,1);
human.gameBoard.placeShip('destroyer',3,0,7,1);
human.gameBoard.placeShip('battleship',4,3,1,1);
human.gameBoard.placeShip('carrier',5,5,1,1);

showShips(human);
setupGameDom(human);

let startBtn = document.getElementById('start-btn');
let startMenu = document.getElementById('start-menu');

startBtn.addEventListener('click', ()=>{
    startMenu.remove();

    startGameDom(computer);

    computer.gameBoard.placeShip('patrol',2,0,0,0);
    computer.gameBoard.placeShip('submarine',3,3,3,1);
    computer.gameBoard.placeShip('destroyer',3,5,5,1);
    computer.gameBoard.placeShip('battleship',4,3,1,0);
    computer.gameBoard.placeShip('carrier',5,2,9,0);

    showShips(computer);
})

// shipPickerBoard();
// let shipPalette = document.getElementById('ship-palette');
// let directionCarrier = 1;
// let directionBattleShip = 1;
// let directionDestroyer = 1;
// let directionSubmarine = 1;
// let directionPatrol = 1;

// let rotateCarrier = shipPalette.querySelector(`[data-coord="0,0"]`)
// let rotateBattleship = shipPalette.querySelector(`[data-coord="2,2"]`)
// let rotateDestroyer = shipPalette.querySelector(`[data-coord="4,4"]`)
// let rotateSubmarine = shipPalette.querySelector(`[data-coord="6,6"]`)
// let rotatePatrol = shipPalette.querySelector(`[data-coord="8,8"]`)


// rotateCarrier.addEventListener('click',()=>{
//     directionCarrier = (directionCarrier == 1 ? 0 : 1);
//     showPickedShip([0,0],5,directionCarrier)
// })
// rotateBattleship.addEventListener('click',()=>{
//     directionBattleShip = (directionBattleShip == 1 ? 0 : 1);
//     showPickedShip([2,2],4,directionBattleShip)
// })
// rotateDestroyer.addEventListener('click',()=>{
//     directionDestroyer = (directionDestroyer == 1 ? 0 : 1);
//     showPickedShip([4,4],3,directionDestroyer)
// })
// rotateSubmarine.addEventListener('click',()=>{
//     directionSubmarine = (directionSubmarine == 1 ? 0 : 1);
//     showPickedShip([6,6],3,directionSubmarine)
// })
// rotatePatrol.addEventListener('click',()=>{
//     directionPatrol = (directionPatrol == 1 ? 0 : 1);
//     showPickedShip([8,8],2,directionPatrol)
// })


//showPickedShip([0,0],5,1);

//export let computer = playerFactory('computer',10)


// let playerBoard = gameboardFactory('startGameplayerBoard',10);
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
