const populateGameboard = (gameboard) => {
  console.log("gameboard being populated...");
  gameboard.placeShip("Patrol Boat", "horizontal", 0);
  gameboard.placeShip("Submarine", "horizontal", 10);
  gameboard.placeShip("Destroyer", "horizontal", 20);
  gameboard.placeShip("Battleship", "horizontal", 30);
  gameboard.placeShip("Carrier", "horizontal", 40);
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

export { populateGameboard, sinkAllShips };
