import React from "react";
import { populateGameboard, getComputerPlay } from "../helpers";
import Board from "./Board";
import Ship from "./Ship";

import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

const Gameboard = require("../factories/Gameboard");
const Player = require("../factories/Player");

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playerGameboard: Gameboard(),
      computerGameboard: Gameboard(),
      activePlayer: null,
      gameStatus: false,
    };
    this.players = [Player("player1"), Player("player2")];
  }

  setUpGame() {
    const playerGameboard = Gameboard();
    populateGameboard(playerGameboard);
    const computerGameboard = Gameboard();
    populateGameboard(computerGameboard);
    this.setState({
      playerGameboard,
      computerGameboard,
      gameStatus: true,
      activePlayer: this.players[0],
    });
  }

  componentDidUpdate() {
    if (this.state.activePlayer !== this.players[0]) {
      this.playTurn(getComputerPlay());
    }
  }
  playTurn(coordinateIndex) {
    let gameboard;
    this.state.activePlayer !== this.players[0]
      ? (gameboard = this.state.computerGameboard)
      : (gameboard = this.state.playerGameboard);

    const attackedGridItem = this.state.activePlayer.attack(
      gameboard,
      coordinateIndex
    );

    //check if this is a duplicate hit
    if (attackedGridItem === false || attackedGridItem === undefined) {
      if (this.state.activePlayer === this.players[0]) {
        return;
      } else {
        this.playTurn(getComputerPlay());
        //need to call return here so a second attackGridItem with index of 0 is not added to the callstack
        return;
      }
    }
    //add appropriate class to gridItem
    attackedGridItem.shipIndex !== null
      ? this.addClass(attackedGridItem.index, "hit")
      : this.addClass(attackedGridItem.index, "miss");

    //Check for winner
    const winner = this.checkForWinner();

    if (!winner) {
      //turn over, switch player
      if (this.state.activePlayer === this.players[0]) {
        this.setState({ activePlayer: this.players[1] });
      } else {
        this.setState({ activePlayer: this.players[0] });
      }
    }
  }
  checkForWinner() {
    const result =
      this.state.activePlayer === this.players[0]
        ? this.state.computerGameboard.areAllSunk()
        : this.state.playerGameboard.areAllSunk();
    if (result) {
      console.log("someone won!");
      this.setState({ gameStatus: false });
      return true;
    }
  }
  handleClick(e) {
    if (this.state.gameStatus && this.state.activePlayer === this.players[0]) {
      this.playTurn(e.target.id);
    }
  }
  addClass(target, className) {
    const parentID =
      this.state.activePlayer === this.players[0]
        ? "#computer-container"
        : "#player-container";
    const parent = document.querySelector(parentID);
    parent.childNodes.item(target).classList.add(className);
    this.state.activePlayer === this.players[0]
      ? this.playerCounter++
      : this.computerCounter++;
  }

  render() {
    //reset doesn't do anything yet
    let message = this.state.gameStatus ? "Reset" : "Play Game";
    return (
      <div className="game-container">
        <button onClick={this.setUpGame.bind(this)}>{message}</button>
        <div className="board-container">
          <Board
            board={this.state.computerGameboard.getGrid()}
            onClick={this.handleClick.bind(this)}
          />
          <Board
            player={true}
            board={this.state.playerGameboard.getGrid()}
            onClick={this.handleClick.bind(this)}
          />
        </div>
        <div className="ships-container">
          <Ship ship={this.state.playerGameboard.getShips()[0]} />
          <Ship ship={this.state.playerGameboard.getShips()[1]} />
          <Ship ship={this.state.playerGameboard.getShips()[2]} />
          <Ship ship={this.state.playerGameboard.getShips()[3]} />
          <Ship ship={this.state.playerGameboard.getShips()[4]} />
        </div>
      </div>
    );
  }
}

export default Game;
