const Player = (name) => {
  const getName = () => name;
  const attack = (coordinateIndex, gameboard) => {
    return gameboard.receiveAttack(coordinateIndex);
  };

  const computerAttack = (gameboard) => {
    //get number from 0-99
    let coordinateIndex = Math.floor(Math.random() * 100);
    return gameboard.receiveAttack(coordinateIndex);
  };

  return { getName, attack, computerAttack };
};

module.exports = Player;
