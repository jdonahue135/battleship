const Player = (enemyGameboard) => {
  const attack = (coordinates) => {
    enemyGameboard.receiveAttack(coordinates);
  };

  return { attack };
};

module.exports = Player;
