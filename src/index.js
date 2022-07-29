import './style.css';
import { createPage, setupGameDom, showShips} from './dom.js';
import { playerFactory } from './factories';

createPage();

//create player objects for human and computer
export let human = playerFactory('human',10)
export let computer = playerFactory('computer',10)

//Show the player's ships on the board
//showShips(human);

//show thestart game menu 
setupGameDom(human);



