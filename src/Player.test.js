const Player = require("./Player");
const Gameboard = require("./Gameboard");

test("Player can attack enemy gameboard", () => {
  const gameboard = Gameboard();
  const player = Player(gameboard);
  player.attack("A1");
  expect(gameboard.getGridItem("A1")).toEqual({
    coordinates: "A1",
    hitStatus: true,
    index: 0,
    shipIndex: null,
    shipName: null,
  });
});
