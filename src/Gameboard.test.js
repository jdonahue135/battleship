import { populateGameboard, sinkAllShips } from "./helpers";
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

  populateGameboard(gameboard);
  sinkAllShips(gameboard);

  expect(gameboard.areAllSunk()).toEqual(true);
});
