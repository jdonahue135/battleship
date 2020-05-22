import React from "react";
import {
  populateGameboard,
  getComputerPlay,
  coordinatesToIndex,
} from "../helpers";
import Board from "./Board";
import Ship from "./Ship";

import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";

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
      shipCoordinates: null,
      shipOrientation: "horizontal",
      hoverSpaces: null,
      shipIndex: null,
    };
    this.players = [Player("Player"), Player("Computer")];
  }

  componentDidUpdate() {
    if (this.state.gameStatus) {
      if (this.state.activePlayer === this.players[1]) {
        this.playTurn(getComputerPlay());
      }
    }
  }

  setUpGame() {
    const playerGameboard = this.state.playerGameboard;
    const computerGameboard = this.state.computerGameboard;
    populateGameboard(computerGameboard);
    this.setState({
      playerGameboard,
      computerGameboard,
      gameStatus: true,
      activePlayer: this.players[0],
    });
  }

  playTurn(coordinateIndex) {
    let gameboard;
    this.state.activePlayer !== this.players[0]
      ? (gameboard = this.state.playerGameboard)
      : (gameboard = this.state.computerGameboard);

    const attackedGridItem = this.state.activePlayer.attack(
      gameboard,
      coordinateIndex
    );

    //check if this is a duplicate hit
    if (attackedGridItem === false || attackedGridItem === undefined) {
      if (this.state.activePlayer === this.players[0]) {
        return;
      } else {
        //computer attacks closest available coordinates
        let index = coordinateIndex;
        index < 99 ? index++ : (index = 0);
        this.playTurn(index);
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
      console.log(this.state.activePlayer.getName() + " won!");
      this.setState({ gameStatus: false });
      return true;
    }
  }

  handleAttack(e) {
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
  }

  handleFlip() {
    console.log("Flip, flip, flipadelphia");
    let shipOrientation =
      this.state.shipOrientation === "horizontal" ? "vertical" : "horizontal";
    this.setState({ shipOrientation });
  }

  handleDrop(coordinates) {
    //ignores if event was passed
    if (typeof coordinates === "string") {
      //get Ship info
      const shipName = this.state.shipIndex.slice(0, -1);
      const shipIndex = this.state.shipIndex[this.state.shipIndex.length - 1];

      //get first Space index
      const firstSpaceIndex =
        this.state.shipOrientation === "horizontal"
          ? coordinatesToIndex(coordinates) - shipIndex
          : coordinatesToIndex(coordinates) - shipIndex * 10;

      //place ship
      const playerGameboard = this.state.playerGameboard;
      playerGameboard.placeShip(
        shipName,
        this.state.shipOrientation,
        firstSpaceIndex
      );
      this.setState({ playerGameboard });
    }
  }

  handleDrag(e) {
    this.setState({ shipIndex: e.target.id });
  }

  renderShip(ship) {
    if (!ship.getPlacedStatus()) {
      return (
        <Ship
          onClick={this.handleDrag.bind(this)}
          ship={ship}
          orientation={this.state.shipOrientation}
        />
      );
    }
  }

  resetGame() {
    window.location.reload(false);
  }

  render() {
    let message = this.state.gameStatus ? "Reset" : "Play Game";
    let fn;
    let hiddenClassName = "";
    if (this.state.playerGameboard.allShipsOnBoard()) {
      fn = this.state.gameStatus
        ? this.resetGame.bind(this)
        : this.setUpGame.bind(this);
      hiddenClassName = "hidden";
    }

    let classList = "ships-container";
    classList =
      this.state.shipOrientation === "horizontal"
        ? classList
        : classList + " vertical";
    return (
      <DndProvider backend={Backend}>
        <div className="game-container">
          <h1>Battleship</h1>
          <button onClick={fn}>{message}</button>
          <div className="player-label-container">
            <h2>Player</h2>
            <h2>Enemy</h2>
          </div>
          <h3 className={hiddenClassName}>Your ships</h3>
          <div className={classList}>
            {this.renderShip(this.state.playerGameboard.getShips()[0])}
            {this.renderShip(this.state.playerGameboard.getShips()[1])}
            {this.renderShip(this.state.playerGameboard.getShips()[2])}
            {this.renderShip(this.state.playerGameboard.getShips()[3])}
            {this.renderShip(this.state.playerGameboard.getShips()[4])}
          </div>
          <div className="board-container">
            <Board
              key="playerGameboard"
              board={this.state.playerGameboard.getGrid()}
              onDrop={this.handleDrop.bind(this)}
            />

            <Board
              key="computerGameboard"
              board={this.state.computerGameboard.getGrid()}
              onClick={this.handleAttack.bind(this)}
            />
          </div>
          <button
            className={"flip-button " + hiddenClassName}
            onClick={this.handleFlip.bind(this)}
          >
            Flip
          </button>
        </div>
      </DndProvider>
    );
  }
}

export default Game;
