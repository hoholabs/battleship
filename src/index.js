import './style.css';
import { createPage, setupGameDom} from './dom.js';
import { playerFactory } from './factories';

createPage();

//create player objects for human and computer
export let human = playerFactory('human',10)
export let computer = playerFactory('computer',10)

//show thestart game menu 
setupGameDom(human);



