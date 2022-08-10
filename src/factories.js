import { domBoard } from './dom.js';

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

const gameboardFactory = (name,spaces) => {

  let ships = [];
  let spots = [];
  let hits = [];
  let sinks = [];
  let misses = [];

  //Immediately invoked function to generate spots array//
  (function() {
    for (let index = 0; index < spaces*spaces; index++) {
      let x = Math.floor(index/spaces);
      let y = index%spaces;
      let coord = [x,y];
      spots.push(coord);
    }
  })();

  const placeShip = (name,size,x,y,o) =>{
    let isError = 1;

    if(name === null){
      console.log('invalid ship');
      return 0;
    }

    if((o== 0 && spaces-size-x<0) || (o==1 && spaces-size-y<0)){
      console.log('invalid ship placement');
      return 0;
    }

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

    //check ship's pos against other ships' positions to prevent overlap

    ships.forEach(existingShip => {

      existingShip.pos.forEach(existingShipPosition => {
        
        ship.pos.forEach(newShipPosition => {

          if(newShipPosition[0] === existingShipPosition[0] && 
            newShipPosition[1] === existingShipPosition[1]){
            console.log('ships overlap');
             ///I don't like this at all. But it works for now. Should fix when I know more
             ///return 0 didn't work here, and I don't know why
            isError = 0;
          }
        });

      });
    });
    ///I don't like this at all. But it works for now. Should fix when I know more
    if(isError === 0){
      return 0;
    }

    //add the ship to ships
    ships.push(ship);
    return 1;

  };

  const receiveAttack = ([x,y]) =>{
    console.log('attack received'+x+y)
    
    //check to see if the coord has already been used

    for (let index = 0; index < misses.length; index++) {
      if(misses[index][0] == x && misses[index][1] == y){
        return 'repeat';
      };
    }

    for (let index = 0; index < hits.length; index++) {
      if(hits[index][0] == x && hits[index][1] == y){
        return 'repeat';
      };
    }

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
          
          if(currentShip.isSunk()){
            currentShip.pos.forEach(sunkShipPosition => {
              sinks.push(sunkShipPosition);
            });
            //console.log(sinks);
          }

          return [true,currentShip.isSunk()];
        };
      };
    };
    //if it misses
    misses.push([x,y]);
    return [false,false];

  };

  const gameOver = () =>{
    for(let index = 0; index<ships.length;index++){
      if(ships[index].isSunk() == false){
        return false;
      } 
    };
return true;

  }

  let boardDisplay = domBoard(name, spaces);

  return {name, placeShip, receiveAttack, gameOver, hits, sinks, misses, ships, boardDisplay};
};

export const playerFactory = (name,spaces) => {

  const gameBoard = gameboardFactory(name,spaces);

  const attack = (target, coords) =>{

    let attackCoords = [0,0];
    
    if (coords == 'ai'){
      console.log('coords = ai'); 

      //random square chosen
      let x = Math.floor(Math.random()*10);
      let y = Math.floor(Math.random()*10);
      attackCoords = [x,y];

      let sinkArray = target.gameBoard.sinks;
      let hitsArray = target.gameBoard.hits;
      let nakedHitsArray = [];

      //clear any sinks from nakedHitsArray

      nakedHitsArray.forEach(nakedHit => {

        for (let index = 0; index < sinkArray.length; index++) {
          let thisSink = sinkArray[index];

          if(thisSink[0]==nakedHit[0] && thisSink[1]==nakedHit[1]){
            
          }
          
        }
 
      });


      //make a list of hits that are not in sinks
      hitsArray.forEach(hitPosition => {
        if (!sinkArray.includes(hitPosition)){
         
          nakedHitsArray.push(hitPosition);
          //console.log(nakedHitsArray);
        }

      });
      //randomly choose one of those hits

      let randomNakedHit = nakedHitsArray[Math.floor(Math.random() * nakedHitsArray.length)];
      //console.log(randomNakedHit);

      //if randomNakedHit is defined
      if (typeof randomNakedHit !== 'undefined') {

      //choose x or y
      let zeroOrOne = Math.round(Math.random());

      //add or subtract 1
      let plusOrMinus = Math.random() < 0.5 ? -1 : 1;

      attackCoords = [...randomNakedHit];
      attackCoords[zeroOrOne] += plusOrMinus;
      }
      //attack next to that hit


      ////////IDK ABOUT THIS/////

      //check hits against sinks. If hit doesn't match any sinks, strike near the hit

      // hitsArray.forEach(hitPosition => {
      //   //check to see if it's in a sink
      //   //if it's not in a sink, attack a nearby position
      //   if(!sinkArray.some(checkSinks)){
      //     console.log(hitPosition+'hit position not in sink')

      //     //choose x or y
      //     let zeroOrOne = Math.round(Math.random());

      //     //add or subtract 1
      //     let plusOrMinus = Math.random() < 0.5 ? -1 : 1;

      //     attackCoords = [...hitPosition];
      //     attackCoords[zeroOrOne] += plusOrMinus;

      //     /////////
      //     /* 
      //     Issue is that if the last hit 
      //     (the one that is actually used for attackCoords)
      //     is surrounded by previously hit tiles,
      //     it can't attack a tile next to it
      //     */
      //   }

      //   function checkSinks(sinkPosition){
      //     return hitPosition[0]==sinkPosition[0] && hitPosition[1]==sinkPosition[1];
      //   }

      // });
      ///////
      ////
    }else{
      attackCoords = coords;
    }

   return target.gameBoard.receiveAttack(attackCoords);

  };

  return {name, gameBoard, attack};

}

var module = module || {};

  module.exports = {
    shipFactory,
    gameboardFactory,
    playerFactory
};