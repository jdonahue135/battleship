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
  const [, drop] = useDrop({
    accept: ItemTypes.SHIP,
    drop: () => props.onDrop(props.gridSpace.coordinates),
    collect: (mon) => ({
      isOver: !!mon.isOver(),
    }),
  });
  return (
    <div
      ref={!props.onClick ? drop : null}
      key={props.gridSpace.coordinates}
      className={className}
      onClick={clickSetting}
      onDrop={props.onDrop}
      id={props.gridSpace.index}
    />
  );
};

export default GridSpace;
