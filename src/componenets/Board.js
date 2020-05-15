import React from "react";

const Board = (props) => {
  let containerId;
  const grid = props.board.map((gridSpace) => {
    let clickSetting = null;
    let className = "gridspace";
    if (props.player) {
      clickSetting = props.onClick;
      containerId = "computer-container";
    } else {
      className = gridSpace.shipName ? "gridspace has-ship" : "gridspace";
      containerId = "player-container";
    }
    return (
      <div
        key={gridSpace.coordinates}
        className={className}
        onClick={clickSetting}
        id={gridSpace.index}
      />
    );
  });
  return (
    <div id={containerId} className="gameboard-container">
      {grid}
    </div>
  );
};

export default Board;
