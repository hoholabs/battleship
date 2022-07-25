import './style.css';
import { createPage, setupGameDom, startGameDom, showShips} from './dom.js';
import { playerFactory } from './factories';

createPage();

//create player objects for human and computer
export let human = playerFactory('human',10)
export let computer = playerFactory('computer',10)


//automatically place all the ships for the human player
human.gameBoard.placeShip('patrol',2,0,0,1);
human.gameBoard.placeShip('submarine',3,0,3,1);
human.gameBoard.placeShip('destroyer',3,0,7,1);
human.gameBoard.placeShip('battleship',4,3,1,1);
human.gameBoard.placeShip('carrier',5,5,1,1);

//Show the player's ships on the board
showShips(human);

//show thestart game menu 
setupGameDom(human);


let startBtn = document.getElementById('start-btn');
let startMenu = document.getElementById('start-menu');

//temp function that loads the computer's ships when start button is clicked
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

