const Gameboard = require("./Gameboard");

test("gameboard tracks location of hits on grid", () => {
  const gameboard = Gameboard();

  expect(gameboard.receiveAttack("B4")).toEqual({
    coordinates: "B4",
    hitStatus: true,
    index: 13,
    shipIndex: null,
    shipName: null,
  });
});

test("gameboard tracks location of horizontal boat on grid", () => {
  const gameboard = Gameboard();

  gameboard.placeShip("Carrier", "horizontal", 13);

  expect(gameboard.receiveAttack("B4")).toEqual({
    coordinates: "B4",
    hitStatus: true,
    index: 13,
    shipIndex: 0,
    shipName: "Carrier",
  });
  expect(gameboard.receiveAttack("B5")).toEqual({
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

  expect(gameboard.receiveAttack("B4")).toEqual({
    coordinates: "B4",
    hitStatus: true,
    index: 13,
    shipIndex: 0,
    shipName: "Carrier",
  });
  expect(gameboard.receiveAttack("C4")).toEqual({
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

  gameboard.receiveAttack("C4");

  expect(gameboard.receiveAttack("B4")).toEqual({
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

  gameboard.receiveAttack("A1");
  gameboard.receiveAttack("A2");
  gameboard.receiveAttack("B1");
  gameboard.receiveAttack("B2");
  gameboard.receiveAttack("B3");
  gameboard.receiveAttack("C1");
  gameboard.receiveAttack("C2");
  gameboard.receiveAttack("C3");
  gameboard.receiveAttack("D1");
  gameboard.receiveAttack("D2");
  gameboard.receiveAttack("D3");
  gameboard.receiveAttack("D4");
  gameboard.receiveAttack("E1");
  gameboard.receiveAttack("E2");
  gameboard.receiveAttack("E3");
  gameboard.receiveAttack("E4");
  gameboard.receiveAttack("E5");

  expect(gameboard.areAllSunk()).toEqual(true);
});
