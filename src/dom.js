
import {computer, human} from './index';

const mainContainer = document.createElement('main');
mainContainer.id = 'main-container'; 

export function createPage(){

    document.body.appendChild(mainContainer);
    const table = document.createElement('div');
    table.id = 'table';   

    //mainContainer.append(table);
}

export function setupGameDom(player){

    //append the player's gameboard
    mainContainer.append(player.gameBoard.boardDisplay);

    let startMenu = document.createElement('div');
    startMenu.id = 'start-menu';

    let startMenuTitle = document.createElement('div');
    startMenuTitle.id = 'start-menu-title';
    //startMenuTitle.textContent = "Place your ships!";

    let startBtn = document.createElement('button');
    startBtn.id = 'start-btn';
    startBtn.innerHTML = "GO";

    // startBtn.addEventListener('click', ()=>{
    //     startMenu.remove();
    //     startGame();
    // })

    startMenu.append(startMenuTitle);
    
    //I want to call this once all ships are placed
    startMenu.append(startBtn);

   mainContainer.append(startMenu);
   //shipPickerBoard()
};

export function startGameDom(computer){

    mainContainer.append(computer.gameBoard.boardDisplay);
    readyBoard(computer.gameBoard.boardDisplay);

}

export function shipPickerBoard(){

    let shipPalette = domBoard('palette',10);
    shipPalette.id = 'ship-palette';
    mainContainer.append(shipPalette);


    //show ships
    showPickedShip([0,0],5,1);
    showPickedShip([2,2],4,1);
    showPickedShip([4,4],3,1);
    showPickedShip([6,6],3,1);
    showPickedShip([8,8],2,1);

}

export function showPickedShip(start,size,direction){
    let shipPalette = document.getElementById('ship-palette');

    shipPalette.querySelector(`[data-coord="${start}"]`).style.backgroundColor = 'green'

    let blueTileCoord = [...start];
    let greyTileCoord = [...start];

    for (let index = 0; index < size-1; index++) {

        blueTileCoord[(direction==0 ? 1 : 0)]+=1;
        let blueTile = shipPalette.querySelector(`[data-coord="${blueTileCoord}"]`)
        blueTile.style.backgroundColor = 'skyblue'

        greyTileCoord[direction]+=1
        let greyTile = shipPalette.querySelector(`[data-coord="${greyTileCoord}"]`)
        greyTile.style.backgroundColor = 'silver'

    }


}

export function highlightPickedShip(start,size,direction){

}


export const domBoard = (name, num) =>{
    

    let board = document.createElement('div')
    board.classList.add('gameboard');
    board.id = name+'Gameboard';
    
    //create a grid of a certain number of rows and columns
    board.style.gridTemplateRows = `repeat(${num}, ${100/(num)}%)`;
    board.style.gridTemplateColumns =`repeat(${num}, ${100/(num)}%)`;

    //populate the grid with buttons
    for (let i = 0; i < (num*num); i++) {
        let tile = document.createElement('button');
        tile.classList.add('tile');
        tile.dataset.coord = [(i%10),(Math.floor(i/10))];
        
        //click board button eventListener
        // tile.addEventListener('click', ()=>{
        //     const thisCoord = tile.dataset.coord.split(",");
        //     thisCoord[0] = parseInt(thisCoord[0]);
        //     thisCoord[1] = parseInt(thisCoord[1]);

        //     //in case of repeat click, don't move forward
        //     if (computer.gameBoard.receiveAttack(thisCoord)== 'repeat'){
        //         console.log('try again');
        //     }else{
        //         //update the board visuals
        //         showShips(computer);

        //         //check for game over
        //         if(computer.gameBoard.gameOver()){
        //             //game over screen
        //             gameOverDisplay(human);
        //         }else{
        //                 //computer attacks back
        //                 while (computer.attack(human,'random')=='repeat') {
        //                     console.log('again');
        //                 }

        //             // if(computer.attack(human,'random')=='repeat'){
        //             //     console.log('gotcha');
        //             // }

        //             showShips(human);

        //             //check for gameover again
        //             if(human.gameBoard.gameOver()){
        //                 //game over screen
        //                 gameOverDisplay(computer);
        //             }
        //         };
        //     }
        // })
        board.append(tile);
    };

    return board;
}

export function showShips(player){

    //look at all of the ships on the board owned by playerName
    player.gameBoard.ships.forEach(ship => {

        //remove the 'computer' part later
        if(player.name == 'human' 
         || 'computer'
        ){
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

// const newGameBtn = document.createElement('button');
// newGameBtn.id = 'new-game-btn';
// newGameBtn.textContent = 'play again?';

// newGameBtn.addEventListener('click', ()=>{
//     clearMainContainer();
// });


// newGameScreen.append(newGameBtn);

mainContainer.append(newGameScreen);
}

function readyBoard(board){

        console.log(board.children.length);
        for (let index = 0; index < board.children.length; index++) {
            const tile = board.children[index];

            tile.addEventListener('click', ()=>{
                const thisCoord = tile.dataset.coord.split(",");
                thisCoord[0] = parseInt(thisCoord[0]);
                thisCoord[1] = parseInt(thisCoord[1]);
    
                //in case of repeat click, don't move forward
                if (computer.gameBoard.receiveAttack(thisCoord)== 'repeat'){
                    console.log('try again');
                }else{
                    //update the board visuals
                    showShips(computer);
    
                    //check for game over
                    if(computer.gameBoard.gameOver()){
                        //game over screen
                        gameOverDisplay(human);
                    }else{
                            //computer attacks back
                            while (computer.attack(human,'random')=='repeat') {
                                console.log('again');
                            }
    
                        // if(computer.attack(human,'random')=='repeat'){
                        //     console.log('gotcha');
                        // }
    
                        showShips(human);
    
                        //check for gameover again
                        if(human.gameBoard.gameOver()){
                            //game over screen
                            gameOverDisplay(computer);
                        }
                    };
                }
            })
            
        }
}