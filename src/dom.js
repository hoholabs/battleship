export function createPage(){
    let mainContainer = document.createElement('main');
    mainContainer.id = 'main-container'; 
    document.body.appendChild(mainContainer);

    const table = document.createElement('div');
    table.id = 'table';   

    let playerBoard = domBoard(10);
    playerBoard.id = playerBoard;
    table.append(playerBoard);

    table.append(domBoard(10));

    mainContainer.append(table);
}

const domBoard = (num) =>{
    let board = document.createElement('div')
    board.classList.add('gameboard');
    
    let xAxis = document.createElement('div');
    xAxis.classList.add('axis');
    xAxis.style.gridColumnStart = 2;
    xAxis.style.gridColumnEnd = -1;

    let yAxis = document.createElement('div');
    yAxis.classList.add('axis');
    yAxis.style.gridRowStart = 1;
    yAxis.style.gridRowEnd = -1;

    board.append(xAxis);
    board.append(yAxis);
    
    //board.style.gridTemplateRows = `repeat(${num}, 25px)`; 
    board.style.gridTemplateRows = `repeat(${num}, ${100/(num+1)}%) ${100/(num+1)}%`;
    //board.style.gridTemplateColumns = `repeat(${num}, 25px)`;
    board.style.gridTemplateColumns =`repeat(${num}, ${100/(num+1)}%) ${100/(num+1)}%`;

    let axes = { 
        "x": ['0','1','2','3','4','5','6','7','8','9'],
        "y":   ['0','1','2','3','4','5','6','7','8','9']
    };

    for (let i = 0; i < (axes.x.length*axes.y.length); i++) {
        let tile = document.createElement('button');
        tile.classList.add('tile');
        tile.dataset.coord = [Math.floor(i/10),(i%10)];
        board.append(tile);
    };

    

    return board
}

export function showShips(name){
    console.log(name.ships);

    name.ships.forEach(element => {

        element.pos.forEach(e => {

            let thisTile = document.querySelectorAll(`[data-coord='${e.toString()}']`)[0];
            console.log(thisTile);
            thisTile.style.backgroundColor = 'grey';
        });

    });

}