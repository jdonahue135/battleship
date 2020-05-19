import React from "react";
import { formatShipName } from "../helpers";

//do I need to require the ship module to use getName and getLength?

const Ships = (props) => {
  //make UI Ships
  const ships = props.ships.map((ship) => {
    let shipSpaces = [];

    for (let i = 0; i < ship.getLength(); i++) {
      shipSpaces.push(i);
    }
    const theShip = shipSpaces.map((space) => (
      <div key={ship.getName() + space} className="ship-space" />
    ));
    return (
      <div
        key={ship.getName()}
        className={formatShipName(ship.getName()) + " ship"}
      >
        {theShip}
      </div>
    );
  });
  return <div className="ships-container">{ships}</div>;
};

export default Ships;
