import React from "react";
import { formatShipName } from "../helpers";

const Ship = (props) => {
  //render shipSpaces inside of the ship
  let shipSpaces = [];
  for (let i = 0; i < props.ship.getLength(); i++) {
    shipSpaces.push(i);
  }
  //construct ship out of ship Spaces
  const theShip = shipSpaces.map((space) => (
    <div key={props.ship.getName() + space} className="ship-space" />
  ));
  return (
    <div className="ship-container">
      <div
        key={props.ship.getName()}
        className={formatShipName(props.ship.getName()) + " ship"}
      >
        {theShip}
      </div>
      <form onSubmit={props.onSubmit}>
        <label htmlFor="coordinates">Coordinates: </label>
        <input onChange={props.onChange} type="text"></input>
        <button type="submit">Place Ship</button>
      </form>
    </div>
  );
};
export default Ship;
