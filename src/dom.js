import { startGame, setupGame, human, computer } from './game';

const mainContainer = document.createElement('main');
mainContainer.id = 'main-container'; 

export function createPage(){

    document.body.appendChild(mainContainer);
    const table = document.createElement('div');
    table.id = 'table';   

    //mainContainer.append(table);
}

export function setupGameDom(player){

    mainContainer.append(player.gameBoard.boardDisplay);

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

    mainContainer.append(computer.gameBoard.boardDisplay);

}

export const domBoard = (name, num) =>{

    let board = document.createElement('div')
    board.classList.add('gameboard');

    board.style.gridTemplateRows = `repeat(${num}, ${100/(num)}%)`;
    board.style.gridTemplateColumns =`repeat(${num}, ${100/(num)}%)`;

    for (let i = 0; i < (num*num); i++) {
        let tile = document.createElement('button');
        tile.classList.add('tile');
        tile.dataset.coord = [(i%10),(Math.floor(i/10))];
//click eventListener
        tile.addEventListener('click', ()=>{
            const thisCoord = tile.dataset.coord.split(",");
            computer.gameBoard.receiveAttack(thisCoord);
            showShips(computer);
            console.log(computer.gameBoard.gameOver());
            if (computer.gameBoard.gameOver()){
                gameOverDisplay(human);
            }
        })
        board.append(tile);
    };

    return board;
}

export function showShips(player){


    //look at all of the ships on the board owned by playerName
    player.gameBoard.ships.forEach(ship => {
        //remove the 'computer' part later
        if(player.name == 'human'){
            //show the tile of every ship as grey
            ship.pos.forEach(e => {
            let thisTile = player.gameBoard.boardDisplay.querySelectorAll(`[data-coord='${e.toString()}']`)[0];
            thisTile.style.backgroundColor = 'grey';
            });
        };
    });

    //show hits
    player.gameBoard.hits.forEach(hit => {
        let thisTile = player.gameBoard.boardDisplay.querySelectorAll(`[data-coord='${hit.toString()}']`)[0];
        thisTile.style.backgroundColor = 'orange';
    });

    //show misses
    player.gameBoard.misses.forEach(miss => {
        let thisTile = player.gameBoard.boardDisplay.querySelectorAll(`[data-coord='${miss.toString()}']`)[0];
        thisTile.style.backgroundColor = 'blue';
    });

    //show sunk ships
    player.gameBoard.ships.forEach(ship => {

        if(ship.isSunk()===true){
            ship.pos.forEach(pos => {
                let thisTile = player.gameBoard.boardDisplay.querySelectorAll(`[data-coord='${pos.toString()}']`)[0];
                 thisTile.style.backgroundColor = 'red';
            });
        }
    });



}

function clearMainContainer(){
    console.log(mainContainer.children);

    while (mainContainer.children.length>0) {
        mainContainer.lastChild.remove();
    }
}

function gameOverDisplay(player){

    clearMainContainer();

const newGameScreen = document.createElement('div');
newGameScreen.id = 'new-game-screen';
newGameScreen.textContent = `${player.name} wins!`

const newGameBtn = document.createElement('button');
newGameBtn.id = 'new-game-btn';
newGameBtn.textContent = 'play again?';

newGameBtn.addEventListener('click', ()=>{
    clearMainContainer();
    setupGame();

});


newGameScreen.append(newGameBtn);

mainContainer.append(newGameScreen);
}