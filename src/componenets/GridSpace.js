import React from "react";

import { ItemTypes } from "../constants";
import { useDrop } from "react-dnd";

const GridSpace = (props) => {
  let clickSetting = props.onClick ? props.onClick : null;
  let className = "gridspace";
  //if props.onClick
  if (!clickSetting) {
    className = props.gridSpace.shipName ? "gridspace has-ship" : "gridspace";
  }
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.SHIP,
    drop: () => props.onDrop(props.gridSpace.coordinates),
    collect: (mon) => ({
      isOver: !!mon.isOver(),
    }),
  });
  return (
    <div
      ref={drop}
      style={{
        backgroundColor: isOver ? "grey" : null,
      }}
      key={props.gridSpace.coordinates}
      className={className}
      onClick={clickSetting}
      onDrop={props.onDrop}
      id={props.gridSpace.index}
    />
  );
};

export default GridSpace;
