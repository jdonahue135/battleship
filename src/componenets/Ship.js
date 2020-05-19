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
    <div
      key={props.ship.getName()}
      className={formatShipName(props.ship.getName()) + " ship"}
    >
      {theShip}
    </div>
  );
};
export default Ship;
