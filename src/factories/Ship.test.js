const Ship = require("./Ship");

test("get Ship length", () => {
  const mockShip = Ship("Submarine");

  expect(mockShip.getLength()).toEqual(3);
});

test("get ship hit array", () => {
  const mockShip = Ship("Submarine");

  expect(mockShip.getShip()).toEqual([
    { index: 0, hitStatus: false },
    { index: 1, hitStatus: false },
    { index: 2, hitStatus: false },
  ]);
});

test("ship can be hit", () => {
  const mockShip = Ship("Submarine");
  mockShip.hit(1);

  expect(mockShip.getShip()).toEqual([
    { index: 0, hitStatus: false },
    { index: 1, hitStatus: true },
    { index: 2, hitStatus: false },
  ]);
});

test("check if ship is sunk", () => {
  const mockShip = Ship("Submarine");
  mockShip.hit(0);
  mockShip.hit(1);
  mockShip.hit(2);

  expect(mockShip.isSunk()).toEqual(true);
});
