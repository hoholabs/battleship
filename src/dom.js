
import {computer, human} from './index';

const mainContainer = document.createElement('main');
mainContainer.id = 'main-container'; 

const infoContainer = document.createElement('div');
infoContainer.id = 'info-container';

const tableTop = document.createElement('div');
tableTop.id = 'table-top';   

export function createPage(){

    document.body.appendChild(mainContainer);

}

export function setupPlayersDom(){

     

     const playerSelect = document.createElement('div');
     playerSelect.id = 'player-select';

     const playerName = document.createElement('input');
     playerName.id = 'player-name-input';

     let startBtn = document.createElement('button');
     startBtn.textContent = 'GO!';
     
     startBtn.addEventListener('click', ()=>{
        playerSelect.remove();
        setupGameDom(human);
     })

     playerSelect.append(playerName);
     playerSelect.append(startBtn);

     mainContainer.append(playerSelect);
}

export function setupGameDom(player){

   mainContainer.append(infoContainer);

    mainContainer.append(tableTop);

    //append the player's gameboard
    tableTop.append(player.gameBoard.boardDisplay);
    console.log(player.gameBoard);
    showShips(player);

    //set info container text
    infoContainer.textContent = 'Click the green tile to rotate your ships. \r\n Once you have selected a ship, click on your board to place it';

    //place the boards used for setting ships
    shipPickerBoard()

    //make the player's board a shipDropperBoard
    shipDropperBoard();
};

function startGameDom(computer){

    let shipPalette = document.getElementById('ship-palette');
    shipPalette.remove();

    tableTop.append(computer.gameBoard.boardDisplay);
    readyBoard(computer.gameBoard.boardDisplay);

    //randomly place computer ships
    // while (computer.gameBoard.placeShip('patrol',2,     'rnd','rnd','rnd') == 0) {}
    // while (computer.gameBoard.placeShip('submarine',3,  'rnd','rnd','rnd') == 0) {}
    // while (computer.gameBoard.placeShip('destroyer',3,  'rnd','rnd','rnd') == 0) {}
    // while (computer.gameBoard.placeShip('battleship',4, 'rnd','rnd','rnd') == 0) {}
    // while (computer.gameBoard.placeShip('carrier',5,    'rnd','rnd','rnd') == 0) {}

    computer.gameBoard.placeShip('patrol',2,0,0,0)

    infoContainer.textContent = "Click on the computer's board to attack!"

    //showShips(computer);
}

const currentShip = {
    name:null,
    start:{x:null,y:null},
    size: null,
    direction:null
};

function shipPickerBoard(){

    let shipPalette = domBoard('palette',10);
    shipPalette.id = 'ship-palette';
    tableTop.append(shipPalette);


    //show ships
    showPickedShip('carrier',[0,0],5,1);
    showPickedShip('battleship',[2,2],4,1);
    showPickedShip('destroyer',[4,4],3,1);
    showPickedShip('submarine',[6,6],3,1);
    showPickedShip('patrol',[8,8],2,1);

}

function shipDropperBoard(){
    let playerBoard = document.getElementById('humanGameboard');

    for (let index = 0; index < playerBoard.children.length; index++) {
        const tile = playerBoard.children[index];

        //add the coords dataset to each tile
        let coords = tile.dataset.coord.split(",");

        //color each tile skyblue
        tile.style.backgroundColor = 'skyblue'

        //place ship event listener
        tile.addEventListener('click',()=>{
            console.log(human);

            let coordsX = parseInt(coords[0]);
            let coordsY = parseInt(coords[1]);

            let shipName = currentShip.name;
            let start = [currentShip.start.x,currentShip.start.y];
            let shipLength = currentShip.size;
            let shipDirection = currentShip.direction;


            if(human.gameBoard.placeShip(shipName,shipLength,coordsX,coordsY,shipDirection)===1){
            hidePickedShip(shipName,start,shipLength,shipDirection);
            unHighlightShip();

            currentShip.name = null;
            currentShip.start.x = null;
            currentShip.start.y = null;
            currentShip.size = null;
            currentShip.direction = null;
            }

            showShips(human);
            if(human.gameBoard.ships.length==5){
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

const newGameBtn = document.createElement('button');
newGameBtn.id = 'new-game-btn';
newGameBtn.textContent = 'play again?';

newGameBtn.addEventListener('click', ()=>{

    //IDK, I gave up on this. Reload the page instead.
    location.reload();

    // clearMainContainer();
    // //clear tableTop
    // while (tableTop.children.length>0) {
    //     tableTop.lastChild.remove();
    // }
    // //clear gameBoards
    // human.gameBoard.clearBoard();
    // computer.gameBoard.clearBoard();

    // // human.gameBoard.ships = [];
    // // human.gameBoard.spots = [];
    // // human.gameBoard.hits = [];
    // // human.gameBoard.sinks = [];
    // // human.gameBoard.misses = [];

    // setupGameDom(human);
    // showShips(human);
});


newGameScreen.append(newGameBtn);

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