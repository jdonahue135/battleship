const Player = (enemyGameboard) => {
  const attack = (coordinateIndex) => {
    enemyGameboard.receiveAttack(coordinateIndex);

    return enemyGameboard.getGridItem(coordinateIndex);
  };

  const computerAttack = () => {
    //get number from 0-99
    let coordinateIndex = Math.floor(Math.random() * 100);
    enemyGameboard.receiveAttack(coordinateIndex);
  };

  return { attack, computerAttack };
};

module.exports = Player;
