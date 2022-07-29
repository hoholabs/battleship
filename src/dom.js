
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

   //mainContainer.append(startMenu);
   //let currentShip = ['name','size','direction',];
   shipPickerBoard()
   shipDropperBoard();
};

function startGameDom(computer){

    let shipPalette = document.getElementById('ship-palette');
    shipPalette.remove();

    mainContainer.append(computer.gameBoard.boardDisplay);
    readyBoard(computer.gameBoard.boardDisplay);

    computer.gameBoard.placeShip('patrol',2,0,0,0);
    computer.gameBoard.placeShip('submarine',3,3,3,1);
    computer.gameBoard.placeShip('destroyer',3,5,5,1);
    computer.gameBoard.placeShip('battleship',4,3,1,0);
    computer.gameBoard.placeShip('carrier',5,2,9,0);

    //showShips(computer);

}

const currentShip = {
    name:'name',
    start:{x:0,y:0},
    size:'size',
    direction:'direction'
};

function shipPickerBoard(){

    let shipPalette = domBoard('palette',10);
    shipPalette.id = 'ship-palette';
    mainContainer.append(shipPalette);


    //show ships
    showPickedShip('carrier',[0,0],5,1);
    showPickedShip('battleship',[2,2],4,1);
    showPickedShip('destroyer',[4,4],3,1);
    showPickedShip('submarine',[6,6],3,1);
    showPickedShip('patrol',[8,8],2,1);

}

function shipDropperBoard(){
    let playerBoard = document.getElementById('humanGameboard');
    let shipDropCounter = 0;

    for (let index = 0; index < playerBoard.children.length; index++) {
        const element = playerBoard.children[index];

        let coords = element.dataset.coord.split(",");
        //console.log(coords);

        //place ship event listener
        element.addEventListener('click',()=>{

            let coordsX = parseInt(coords[0]);
            let coordsY = parseInt(coords[1]);

            let shipName = currentShip.name;
            let start = [currentShip.start.x,currentShip.start.y];
            let shipLength = currentShip.size;
            let shipDirection = currentShip.direction;

            human.gameBoard.placeShip(shipName,shipLength,coordsX,coordsY,shipDirection);

            

            hidePickedShip(shipName,start,shipLength,shipDirection);
            unHighlightShip();
            
            currentShip.name = 'name';
            currentShip.start.x = 'x';
            currentShip.start.y = 'y';
            currentShip.size = 'size';
            currentShip.direction = 'direction';

            
            showShips(human);
            shipDropCounter+=1
            if(shipDropCounter==5){
                console.log("start game")
                startGameDom(computer);
            };
        })
        
    }

}

function showPickedShip(name,start,size,direction){

    let shipPalette = document.getElementById('ship-palette');
    
    let rotateTile = shipPalette.querySelector(`[data-coord="${start}"]`);
    

    rotateTile.style.backgroundColor = 'green'

    //event listener to rotate tile to flip the ship
    
    rotateTile.addEventListener('click', ()=>{  

        hidePickedShip(name,start,size,direction);
        unHighlightShip();
        let newDirection = direction == 0 ? 1 : 0;   
           
        showPickedShip(name,start,size,newDirection)
        currentShip.name = name;
        currentShip.start.x = start[0];
        currentShip.start.y = start[1];
        currentShip.size = size;
        currentShip.direction = newDirection;
        highlightShip();
    })
    
    rotateTile.onclick = function(){};

    let greyTileCoord = [...start];

    for (let index = 0; index < size-1; index++) {

        greyTileCoord[direction]+=1
        let greyTile = shipPalette.querySelector(`[data-coord="${greyTileCoord}"]`)
        greyTile.style.backgroundColor = 'silver'
        greyTile.addEventListener('click',unHighlightShip,true);
        greyTile.onclick = function(){
            //currentShip  = {...currentShip, name:name, start:start, size:size, direction:direction}
            currentShip.name = name;
            currentShip.start.x = start[0];
            currentShip.start.y = start[1];
            currentShip.size = size;
            currentShip.direction = direction;
        };
        greyTile.addEventListener('click',highlightShip,true);
     
        
    } 

}

function hidePickedShip(name,start,size,direction){

    let shipPalette = document.getElementById('ship-palette');
    let blueTileCoord = [...start];
   

    for (let index = 0; index < size; index++) {

        //turns tiles in not direction blue
        
        let blueTile = shipPalette.querySelector(`[data-coord="${blueTileCoord}"]`)
        blueTile.style.backgroundColor = 'skyblue'
        
        blueTile.removeEventListener('click',highlightShip,true);
        blueTile.onclick = null;

        blueTileCoord[(direction==0 ? 0 : 1)]+=1;
    }

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
        board.append(tile);
    };

    return board;
}

function showShips(player){

    //look at all of the ships on the board owned by playerName
    player.gameBoard.ships.forEach(ship => {

        //remove the 'computer' part later
        if(player.name == 'human' 
         //|| 'computer'
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
//readys the computer's board for play
        for (let index = 0; index < board.children.length; index++) {
            const tile = board.children[index];

            tile.addEventListener('click', ()=>{
                const thisCoord = tile.dataset.coord.split(",");
                thisCoord[0] = parseInt(thisCoord[0]);
                thisCoord[1] = parseInt(thisCoord[1]);
    
                //in case of repeat click, don't move forward
                if (computer.gameBoard.receiveAttack(thisCoord)== 'repeat'){
                  
                }else{
                    //update the board visuals
                    showShips(computer);
    
                    //check for game over
                    if(computer.gameBoard.gameOver()){
                        //game over screen
                        gameOverDisplay(human);
                    }else{
                            //computer attacks back
                            while (computer.attack(human,'ai')=='repeat') {
                                //only repeats if 'repeat' is returned
                            }
    
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

function highlightShip(){

    let shipPalette = document.getElementById('ship-palette');

    let startTile = shipPalette.querySelector(`[data-coord="${[currentShip.start.x,currentShip.start.y]}"]`);


    if(currentShip.direction == 0){

        //add tile-border-left ot start tile
        startTile.classList.add('tile-border-left')

        for (let index = 0; index < currentShip.size; index++) {
            //add tile border top and bottom to every tile in ship
            shipPalette.querySelector(`[data-coord="${currentShip.start.x+index},${currentShip.start.y}"]`).classList.add('tile-border-top','tile-border-bottom');
        }

        //add tile-border-right to last tile
        shipPalette.querySelector(`[data-coord="${currentShip.start.x+currentShip.size-1},${currentShip.start.y}"]`).classList.add('tile-border-right');

   };

   if(currentShip.direction == 1){

        //add tile-border-left ot start tile
        startTile.classList.add('tile-border-top')

        for (let index = 0; index < currentShip.size; index++) {
            //add tile border top and bottom to every tile in ship
            shipPalette.querySelector(`[data-coord="${currentShip.start.x},${currentShip.start.y+index}"]`).classList.add('tile-border-left','tile-border-right');
        }

        //add tile-border-right to last tile
        shipPalette.querySelector(`[data-coord="${currentShip.start.x},${currentShip.start.y+currentShip.size-1}"]`).classList.add('tile-border-bottom');


   };
   
}

function unHighlightShip(){

    //let currentShip = ['name','start','size','direction'];
    let shipPalette = document.getElementById('ship-palette');

    let startCoord = [currentShip.start.x,currentShip.start.y]
    let startTile = shipPalette.querySelector(`[data-coord="${startCoord}"]`);

    if(currentShip.direction == 0){

        //add tile-border-left ot start tile
        startTile.classList.remove('tile-border-left')

        for (let index = 0; index < currentShip.size; index++) {
            //add tile border top and bottom to every tile in ship
            shipPalette.querySelector(`[data-coord="${currentShip.start.x+index},${currentShip.start.y}"]`).classList.remove('tile-border-top','tile-border-bottom');
        }

        //add tile-border-right to last tile
        shipPalette.querySelector(`[data-coord="${currentShip.start.x+currentShip.size-1},${currentShip.start.y}"]`).classList.remove('tile-border-right');

   };

   if(currentShip.direction == 1){

        //add tile-border-left ot start tile
        startTile.classList.remove('tile-border-top')

        for (let index = 0; index < currentShip.size; index++) {
            //add tile border top and bottom to every tile in ship
            shipPalette.querySelector(`[data-coord="${currentShip.start.x},${currentShip.start.y+index}"]`).classList.remove('tile-border-left','tile-border-right');
        }

        //add tile-border-right to last tile
        shipPalette.querySelector(`[data-coord="${currentShip.start.x},${currentShip.start.y+currentShip.size-1}"]`).classList.remove('tile-border-bottom');


   };

}