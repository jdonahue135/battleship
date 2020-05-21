const populateGameboard = (gameboard) => {
  const ships = gameboard.getShips();
  for (let i = 0; i < ships.length; i++) {
    const name = ships[i].getName();
    const orientation = Math.random() < 0.5 ? "horizontal" : "vertical";
    const index = Math.floor(Math.random() * 100);
    const result = gameboard.placeShip(name, orientation, index);
    if (result === false) {
      i--;
    }
  }
  /*gameboard.placeShip("Patrol Boat", "horizontal", 0);
  gameboard.placeShip("Submarine", "horizontal", 10);
  gameboard.placeShip("Destroyer", "horizontal", 20);
  gameboard.placeShip("Battleship", "horizontal", 30);
  gameboard.placeShip("Carrier", "horizontal", 40);*/
};

const sinkAllShips = (gameboard) => {
  gameboard.receiveAttack(0);
  gameboard.receiveAttack(1);
  gameboard.receiveAttack(10);
  gameboard.receiveAttack(11);
  gameboard.receiveAttack(12);
  gameboard.receiveAttack(20);
  gameboard.receiveAttack(21);
  gameboard.receiveAttack(22);
  gameboard.receiveAttack(30);
  gameboard.receiveAttack(31);
  gameboard.receiveAttack(32);
  gameboard.receiveAttack(33);
  gameboard.receiveAttack(40);
  gameboard.receiveAttack(41);
  gameboard.receiveAttack(42);
  gameboard.receiveAttack(43);
  gameboard.receiveAttack(44);
};

const coordinatesToIndex = (coordinates) => {
  const letter = coordinates.charAt(0).toUpperCase();
  const letterValue = (letter.charCodeAt(0) - 65) * 10;
  const number = Number(coordinates.slice(1));
  return letterValue + number - 1;
};

const indexToCoordinates = (index) => {
  const letter = String.fromCharCode(Math.floor(index / 10) + 65);
  const number = (index % 10) + 1;
  return letter + number;
};

const getComputerPlay = () => {
  return Math.floor(Math.random() * 100);
};

const formatShipName = (name) => {
  //formats shipName to be added to a css class
  return name.replace(" ", "-").toLowerCase();
};

export {
  populateGameboard,
  sinkAllShips,
  getComputerPlay,
  formatShipName,
  coordinatesToIndex,
  indexToCoordinates,
};
