import React from "react";
import GridSpace from "./GridSpace";

const Board = (props) => {
  let containerId = props.onClick ? "computer-container" : "player-container";
  const grid = props.board.map((gridSpace) => {
    const hoverSpaces = props.hoverSpaces;
    if (hoverSpaces && hoverSpaces.includes(gridSpace.index)) {
      return (
        <GridSpace
          hover={true}
          onHover={props.onHover}
          key={gridSpace.coordinates}
          gridSpace={gridSpace}
          onClick={props.onClick}
          onDrop={props.onDrop}
        />
      );
    } else {
      return (
        <GridSpace
          onHover={props.onHover}
          key={gridSpace.coordinates}
          gridSpace={gridSpace}
          onClick={props.onClick}
          onDrop={props.onDrop}
        />
      );
    }
  });
  return (
    <div id={containerId} className="gameboard-container">
      {grid}
    </div>
  );
};

export default Board;
