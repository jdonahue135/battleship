const Player = require("./Player");
const Gameboard = require("./Gameboard");

test("Player can attack enemy gameboard", () => {
  const gameboard = Gameboard();
  const player = Player(gameboard);
  expect(player.attack(0)).toEqual({
    coordinates: "A1",
    hitStatus: true,
    index: 0,
    shipIndex: null,
    shipName: null,
  });
});
