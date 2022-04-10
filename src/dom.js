import { startGame, player, computer } from './game';

const mainContainer = document.createElement('main');
mainContainer.id = 'main-container'; 

export function createPage(){

    document.body.appendChild(mainContainer);
    const table = document.createElement('div');
    table.id = 'table';   

    //mainContainer.append(table);
}

export function setupGameDom(player){

    //console.log(player.gameBoard.board);

    mainContainer.append(player.gameBoard.board);

    let startMenu = document.createElement('div');
    startMenu.id = 'start-menu';

    let startMenuTitle = document.createElement('div');
    startMenuTitle.id = 'start-menu-title';
    startMenuTitle.textContent = "Place your ships!";

    let startBtn = document.createElement('button');
    startBtn.id = 'start-btn';
    startBtn.innerHTML = "GO";
    startBtn.addEventListener('click', ()=>{
        startMenu.remove();
        startGame();
    })

    startMenu.append(startMenuTitle);
    startMenu.append(startBtn);

    mainContainer.append(startMenu);
};

export function startGameDom(computer){

    mainContainer.append(computer.gameBoard.board);

}

export const domBoard = (name, num) =>{

    let board = document.createElement('div')
    board.classList.add('gameboard');

    board.style.gridTemplateRows = `repeat(${num}, ${100/(num)}%)`;
    board.style.gridTemplateColumns =`repeat(${num}, ${100/(num)}%)`;

    for (let i = 0; i < (num*num); i++) {
        let tile = document.createElement('button');
        tile.classList.add('tile');
        tile.dataset.coord = [(i%10),Math.floor(i/10)];
        tile.addEventListener('click', ()=>{
            console.log(tile.dataset.coord);
            console.log(computer.gameBoard);
            console.log(computer.gameBoard.receiveAttack(tile.dataset.coord));

        })
        board.append(tile);
    };

    return board
}

export function showShips(name){

    name.gameBoard.ships.forEach(element => {

        element.pos.forEach(e => {
            let thisTile = name.gameBoard.board.querySelectorAll(`[data-coord='${e.toString()}']`)[0];
            thisTile.style.backgroundColor = 'grey';
        });

    });

}