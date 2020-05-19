const Player = (name) => {
  const getName = () => name;
  const attack = (gameboard, coordinateIndex) => {
    const result = gameboard.receiveAttack(coordinateIndex);
    return result;
  };

  return { getName, attack };
};

module.exports = Player;
