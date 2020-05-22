const { indexToCoordinates, coordinatesToIndex } = require("../helpers");

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

  const placeShip = (shipName, orientation, firstIndex) => {
    //Validate ship placement
    const ship = ships.find((ship) => ship.getName() === shipName);

    //get all coordinates where ship should be placed
    let shipCoordinates = [];
    let coordinateIndex = firstIndex;
    for (let i = 0; i < ship.getLength(); i++) {
      shipCoordinates.push(indexToCoordinates(coordinateIndex));
      orientation === "horizontal"
        ? coordinateIndex++
        : (coordinateIndex = coordinateIndex + 10);
    }

    //check if coordinates exist and/or already have a ship
    let err;
    for (let i = 0; i < shipCoordinates.length; i++) {
      let space = getGridItem(coordinatesToIndex(shipCoordinates[i]));
      if (!space || space.shipName) {
        err = true;
        return false;
      }
    }

    //can't place ships where there is not enough room on the board (no wrapping of ships)
    if (orientation === "horizontal") {
      err = shipCoordinates.find(
        (theCoordinate) =>
          theCoordinate[0] !== indexToCoordinates(firstIndex)[0]
      );
    } else {
      let firstCoordinates = indexToCoordinates(firstIndex);
      let row = firstCoordinates[0];
      let distanceToWall = 10 - (row.charCodeAt(0) - 65);
      let wiggleRoom = distanceToWall - ship.getLength();
      err = wiggleRoom > 0 ? false : true;
    }
    if (err) {
      return false;
    }

    //place ship on grid items

    // Increments index correctly for horizontal or vertical orientation
    let increment = orientation === "horizontal" ? 1 : 10;

    for (let i = 0; i < ship.getLength(); i++) {
      // find gridItem
      let currentIndex = Number(firstIndex) + i * increment;
      if (currentIndex > 99) {
        currentIndex = currentIndex - 100;
      }
      let gridItem = grid.find((theItem) => theItem.index === currentIndex);

      // assign ship to gridName
      gridItem.shipName = shipName;
      gridItem.shipIndex = i;
      ship.place();
    }
  };

  // Track attacks
  const receiveAttack = (index) => {
    let gridSpace = grid.find((space) => space.index === Number(index));
    if (gridSpace.hitStatus === true) {
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

  const allShipsOnBoard = () => {
    for (let i = 0; i < ships.length; i++) {
      if (ships[i].getPlacedStatus() === false) {
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
    allShipsOnBoard,
  };
};

module.exports = Gameboard;
