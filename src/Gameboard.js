const Ship = require("./Ship");

const Gameboard = () => {
  let grid = [];

  // Tracks ships
  const ships = [
    Ship("Carrier"),
    Ship("Battleship"),
    Ship("Destroyer"),
    Ship("Submarine"),
    Ship("Patrol Boat"),
  ];

  const getShips = () => ships;

  // Tracks the coordinates of it's grid
  let index = 0;
  for (let i = 65; i < 75; i++) {
    //'i' is based on charcodes A (65) - J (74)
    for (let n = 1; n < 11; n++) {
      //this gives us coordinates like 'A5' and 'D1'
      let gridItem = {
        //starts with index 0
        index: index,
        coordinates: String.fromCharCode(i) + n,
        hitStatus: false,
        shipName: null,
        shipIndex: null,
      };
      grid.push(gridItem);
      index++;
    }
  }

  //maybe simplify by combining orientation and indexes into an array of indexes?
  const placeShip = (shipName, orientation, firstIndex) => {
    const ship = ships.find((ship) => ship.getName() === shipName);

    // Increments index correctly for horizontal or vertical orientation
    let increment = orientation === "horizontal" ? 1 : 10;

    //place ship on grid items
    for (let i = 0; i < ship.getLength(); i++) {
      // find gridItem
      let gridItem = grid.find(
        (theItem) => theItem.index === firstIndex + i * increment
      );

      // assign ship to gridName
      gridItem.shipName = shipName;
      gridItem.shipIndex = i;
    }
  };

  // Tracks attacks
  const receiveAttack = (index) => {
    let gridSpace = grid.find((space) => space.index === Number(index));
    if (gridSpace.hitStatus === true) {
      console.log("space has already been hit");
      return false;
    } else {
      gridSpace.hitStatus = true;

      if (gridSpace.shipIndex !== null) {
        // ship was hit()!
        let theShip = ships.find(
          (ship) => gridSpace.shipName === ship.getName()
        );
        theShip.hit(gridSpace.shipIndex);

        //is ship sunk?
        if (theShip.isSunk() === true) {
          console.log("You sunk my " + theShip.getName());
        }
      }

      //This won't be neccesary post-testing
      console.log(gridSpace);

      return gridSpace;
    }
  };

  const areAllSunk = () => {
    for (let i = 0; i < ships.length; i++) {
      if (ships[i].isSunk() === false) {
        return false;
      }
    }
    return true;
  };

  //this function is for testing only I think
  const getGridItem = (index) => {
    const gridItem = grid.find((item) => item.index === index);
    return gridItem;
  };

  const getGrid = () => grid;

  return {
    receiveAttack,
    placeShip,
    getShips,
    areAllSunk,
    getGridItem,
    getGrid,
  };
};

module.exports = Gameboard;
