import './style.css';
import { createPage } from './dom.js';


const shipFactory = (name, size) => {

  let shipState = [];

  for (let index = 0; index < size; index++) {
    shipState.push(0);
  };
    
  const hit = (i) =>{
    shipState[i] = 1;
    return shipState;
  };

  const isSunk = () =>{
    for (let index = 0; index < shipState.length; index++) {
      if(shipState[index] == 0){ 
        return false;
      };
    };
  
    return true;
  };

  return {name, size, hit, isSunk, shipState};
};

export const gameboardFactory = (name) => {
  // let axes = { 
  //   "x": ['0','1','2','3','4','5','6','7','8','9'],
  //   "y":   ['0','1','2','3','4','5','6','7','8','9']
  // };

  // for (let i = 0; i < (axes.x.length*axes.y.length); i++) {
  //   let tile = [Math.floor(i/10),(i%10),0];
  //   board.push(tile)
  // };

  // let board = [];
  let ships = [];
  let hits = [];
  let misses = [];
  // let shipCoords = [];

  const placeShip = (name,size,x,y,o) =>{
    
    // orientation, 0=horizontal, 1=vertical
    let ship = shipFactory(name,size);
    ship.pos = [];
    
    // add the ship coordinates to the ship
    for (let index = 0; index < size; index++) {
     
      if(o == 0){ //if horizontal
        ship.pos.push([x+index,y])

      } else { //if vertical
        ship.pos.push([x,y+index])
      };
    };
    ships.push(ship);


    // //add the ship's positions to the shipCoords
    // for (let index = 0; index < l; index++) {
    //   if(o=='x'){//if horizontal
    //     shipCoords.push([name,index,x+index,y]) 
    //   } else {//if vertical
    //     shipCoords.push([name,index,x,y+index]) 
    //   }
    // };


  };

  const receiveAttack = ([x,y]) =>{

    //look at each ship in the list
    for(let index = 0; index < ships.length; index++){

      let currentShip = ships[index];

      //look at each pos coordinate of this ship
      for(let index = 0; index<currentShip.pos.length; index++){

        let currentCoord = currentShip.pos[index];
        //if it hits
        if (currentCoord[0] == x && currentCoord[1] == y){
          hits.push([x,y]);
          currentShip.hit(index);
          return [true,currentShip.isSunk()];
        };
      };
    };
    //if it misses
    misses.push([x,y]);
    return [false,false];

  };

  const gameOver = () =>{
    for(let index = 0; index<ships.length;i++){
      if(ships[index].isSunk() == false){
        return false;
      } else{
        return true;
      }
    };
  }

  return {name, placeShip, receiveAttack, gameOver, hits, misses, ships};
};

const playerFactory = (name) => {

  const gameBoard = gameboardFactory();

  const attack = (target, coords) =>{

    if (coords == 'random'){
      let x = Math.floor(Math.random()*10);
      let y = Math.floor(Math.random()*10);
      coords = [x,y];
      console.log(coords)
    }

   return target.gameBoard.receiveAttack(coords);

  };

  return {name, gameBoard, attack};

}

//   module.exports = {
//     shipFactory,
//     gameboardFactory,
//     playerFactory
// };