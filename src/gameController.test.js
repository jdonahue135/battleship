import { sinkAllShips } from "./helpers";
const gameController = require("./gameController");

test("game ends when all ships are sunk", () => {
  expect(gameController.playGame()).toEqual("game over");
});

//needs to be mocked in to work
/*test("can't attack the same location twice", () => {
    const player1 = gameController.playGame().player1;

    gameController.playTurn(player1)
    expect(gameController.playTurn(player1)).toEqual(false) 
})*/
