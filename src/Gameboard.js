const Ship = require("./Ship");

const Gameboard = () => {
  let grid = [];
  const getGrid = () => grid;
  //Gameboard needs to track the coordinates of it's grid
  //first for loop is based on charcodes A (65) - J (74)
  for (let i = 65; i < 75; i++) {
    for (let n = 1; n < 11; n++) {
      let gridItem = {
        index: String.fromCharCode(i) + n,
        hitStatus: false,
        ship: null,
      };
      grid.push(gridItem);
    }
  }
  //and weather all of their ships are sunk or not
  let ships = [
    Ship("Carrier"),
    Ship("Battleship"),
    Ship("Destroyer"),
    Ship("Submarine"),
    Ship("Patrol Boat"),
  ];

  //and needs to be able to absord hits
  return { getGrid };
};

module.exports = Gameboard;
