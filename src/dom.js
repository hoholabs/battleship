export function createPage(){
    let mainContainer = document.createElement('main');
    mainContainer.id = 'main-container'; 
    document.body.appendChild(mainContainer);
    console.log('created page');
    mainContainer.append(domBoard(10));
    mainContainer.append(domBoard(10));
}

const domBoard = (num) =>{
    let board = document.createElement('div')
    board.classList.add('gameboard');
    let ba = num;
    //board.style.gridTemplateRows = `repeat(${num}, 25px)`;
    //board.style.gridTemplateColumns = `repeat(${num}, 25px)`;

    let axes = { 
        "x": ['0','1','2','3','4','5','6','7','8','9'],
        "y":   ['0','1','2','3','4','5','6','7','8','9']
    };

    for (let i = 0; i < (axes.x.length*axes.y.length); i++) {
        let tile = document.createElement('button');
        tile.classList.add('tile');
        tile.dataset.coord = [Math.floor(i/10),(i%10),0];
        board.append(tile);
    };

    return board
}