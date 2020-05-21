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
    this.players = [Player("player1"), Player("player2")];
  }

  setUpGame() {
    const playerGameboard = this.state.playerGameboard;
    populateGameboard(playerGameboard);
    const computerGameboard = this.state.computerGameboard;
    populateGameboard(computerGameboard);
    this.setState({
      playerGameboard,
      computerGameboard,
      gameStatus: true,
      activePlayer: this.players[0],
    });
  }

  componentDidUpdate() {
    if (this.state.activePlayer === this.players[1]) {
      this.playTurn(getComputerPlay());
    }
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
    if (typeof coordinates === "string") {
      //ignores if event was passed
      const shipName = this.state.shipIndex.slice(0, -1);
      const index = this.state.shipIndex[this.state.shipIndex.length - 1];
      let firstIndex = coordinatesToIndex(coordinates) - index;
      const playerGameboard = this.state.playerGameboard;
      playerGameboard.placeShip(
        shipName,
        this.state.shipOrientation,
        firstIndex
      );
      this.setState({ playerGameboard });
    }
  }
  handleDrag(e) {
    this.setState({ shipIndex: e.target.id });
  }
  handleHover(coordinates) {
    const shipName = this.state.shipIndex.slice(0, -1);
    const shipLength = this.state.playerGameboard
      .getShips()
      .find((ship) => ship.getName() === shipName)
      .getLength();
    const index = this.state.shipIndex[this.state.shipIndex.length - 1];
    let coordinateIndex = coordinatesToIndex(coordinates) - index;
    let hoverSpaces = [];
    for (let i = 0; i < shipLength; i++) {
      hoverSpaces.push(coordinateIndex);
      coordinateIndex++;
    }
    //this.setState({hoverSpaces})
  }
  renderShip(ship) {
    return (
      <Ship
        onClick={this.handleDrag.bind(this)}
        ship={ship}
        orientation={this.state.shipOrientation}
      />
    );
  }

  render() {
    //reset doesn't do anything yet
    let message = this.state.gameStatus ? "Reset" : "Play Game";
    let classList = "ships-container";
    classList =
      this.state.shipOrientation === "horizontal"
        ? classList
        : classList + " vertical";
    return (
      <DndProvider backend={Backend}>
        <div className="game-container">
          <button onClick={this.setUpGame.bind(this)}>{message}</button>
          <div className="board-container">
            <Board
              key="playerGameboard"
              hoverSpaces={this.state.hoverSpaces}
              board={this.state.playerGameboard.getGrid()}
              onDrop={this.handleDrop.bind(this)}
              onHover={this.handleHover.bind(this)}
            />
            <Board
              key="computerGameboard"
              board={this.state.computerGameboard.getGrid()}
              onClick={this.handleAttack.bind(this)}
            />
          </div>
          <div className={classList}>
            {this.renderShip(this.state.playerGameboard.getShips()[0])}
            {this.renderShip(this.state.playerGameboard.getShips()[1])}
            {this.renderShip(this.state.playerGameboard.getShips()[2])}
            {this.renderShip(this.state.playerGameboard.getShips()[3])}
            {this.renderShip(this.state.playerGameboard.getShips()[4])}
          </div>
          <button onClick={this.handleFlip.bind(this)}>Flip</button>
        </div>
      </DndProvider>
    );
  }
}

export default Game;
