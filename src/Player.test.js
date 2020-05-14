const Player = require("./Player");
const Gameboard = require("./Gameboard");

test("Player can attack enemy gameboard", () => {
  const gameboard = Gameboard();
  const player = Player("player1");
  expect(player.attack(0, gameboard)).toEqual({
    coordinates: "A1",
    hitStatus: true,
    index: 0,
    shipIndex: null,
    shipName: null,
  });
});
