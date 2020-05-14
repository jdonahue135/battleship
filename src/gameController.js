import { populateGameboard } from "./helpers";
const Gameboard = require("./Gameboard");
const Player = require("./Player");

const gameController = (() => {
  let gameboards;
  let players;

  const setUpGame = () => {
    // Set up gameboards and players
    const player1Gameboard = Gameboard();
    populateGameboard(player1Gameboard);
    const player2Gameboard = Gameboard();
    populateGameboard(player2Gameboard);

    //players only interact with the opposing player's gameboard right now
    const player1 = Player("player1");
    const player2 = Player("player2");

    gameboards = [player1Gameboard, player2Gameboard];
    players = [player1, player2];
  };

  const playGame = () => {
    setUpGame();
    let activePlayer = players[0];
    let gameStatus = true;

    //Game loop
    while (gameStatus) {
      //play turn
      activePlayer === players[0]
        ? playTurn(activePlayer, gameboards[1])
        : playTurn(activePlayer, gameboards[0]);

      //check for winner
      const result =
        activePlayer === players[0]
          ? gameboards[1].areAllSunk()
          : gameboards[0].areAllSunk();
      if (result === true) {
        gameStatus = false;
      } else {
        //no winner, switch activePlayer
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
      }
    }
    return "game over";
  };
  const playTurn = (player, gameboard) => {
    //dummy attack for testing
    const attackedGridItem = player.computerAttack(gameboard);
    if (attackedGridItem === false) {
      playTurn(player, gameboard);
    }
    return attackedGridItem;
  };

  return { playGame };
})();

module.exports = gameController;
