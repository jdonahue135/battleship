const Gameboard = require("./Gameboard");

test("gameboard has a grid", () => {
  const gameboard = Gameboard();

  expect(gameboard.getGrid()).toEqual([]);
});
