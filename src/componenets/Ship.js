import React from "react";
import { formatShipName } from "../helpers";

import { ItemTypes } from "../constants";
import { useDrag } from "react-dnd";

const Ship = (props) => {
  //render shipSpaces inside of the ship
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: ItemTypes.SHIP,
      shipName: props.ship.getName(),
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  let shipSpaces = [];
  for (let i = 0; i < props.ship.getLength(); i++) {
    shipSpaces.push(i);
  }

  //construct ship out of ship Spaces
  const theShip = shipSpaces.map((space) => (
    <div
      id={props.ship.getName() + space}
      key={props.ship.getName() + space}
      className="ship-space"
    />
  ));
  let classlist = formatShipName(props.ship.getName()) + " ship";
  classlist =
    props.orientation === "horizontal"
      ? classlist
      : classlist + " vertical-" + formatShipName(props.ship.getName());
  return (
    <div className="ship-container">
      <div
        key={props.ship.getName()}
        onMouseOver={props.onClick}
        className={classlist}
        ref={drag}
        style={{
          opacity: isDragging ? 0.5 : 1,
        }}
      >
        {theShip}
      </div>
    </div>
  );
};
export default Ship;
