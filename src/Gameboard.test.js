const Gameboard = require("./Gameboard");

test("gameboard tracks location of hits on grid", () => {
  const gameboard = Gameboard();

  expect(gameboard.receiveAttack(0)).toEqual({
    coordinates: "A1",
    hitStatus: true,
    index: 0,
    shipIndex: null,
    shipName: null,
  });
});

test("gameboard does not allow the same coordinates to be hit more than once", () => {
  const gameboard = Gameboard();

  gameboard.receiveAttack(0);

  expect(gameboard.receiveAttack(0)).toEqual(false);
});

test("gameboard tracks location of horizontal boat on grid", () => {
  const gameboard = Gameboard();

  gameboard.placeShip("Carrier", "horizontal", 13);

  expect(gameboard.receiveAttack(13)).toEqual({
    coordinates: "B4",
    hitStatus: true,
    index: 13,
    shipIndex: 0,
    shipName: "Carrier",
  });
  expect(gameboard.receiveAttack(14)).toEqual({
    coordinates: "B5",
    hitStatus: true,
    index: 14,
    shipIndex: 1,
    shipName: "Carrier",
  });
});

test("gameboard tracks location of vertical boat on grid", () => {
  const gameboard = Gameboard();

  gameboard.placeShip("Carrier", "vertical", 13);

  expect(gameboard.receiveAttack(13)).toEqual({
    coordinates: "B4",
    hitStatus: true,
    index: 13,
    shipIndex: 0,
    shipName: "Carrier",
  });
  expect(gameboard.receiveAttack(23)).toEqual({
    coordinates: "C4",
    hitStatus: true,
    index: 23,
    shipIndex: 1,
    shipName: "Carrier",
  });
});

test("gameboard tracks when ship is sunk", () => {
  const gameboard = Gameboard();

  gameboard.placeShip("Patrol Boat", "vertical", 13);

  gameboard.receiveAttack(23);

  expect(gameboard.receiveAttack(13)).toEqual({
    coordinates: "B4",
    hitStatus: true,
    index: 13,
    shipIndex: 0,
    shipName: "Patrol Boat",
  });
});

test("gameboard reports when all ships are sunk", () => {
  const gameboard = Gameboard();

  gameboard.placeShip("Patrol Boat", "horizontal", 0);
  gameboard.placeShip("Submarine", "horizontal", 10);
  gameboard.placeShip("Destroyer", "horizontal", 20);
  gameboard.placeShip("Battleship", "horizontal", 30);
  gameboard.placeShip("Carrier", "horizontal", 40);

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

  expect(gameboard.areAllSunk()).toEqual(true);
});
