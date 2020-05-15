const Player = (name) => {
  const getName = () => name;
  const attack = (gameboard, coordinateIndex) => {
    if (coordinateIndex) {
      console.log(coordinateIndex);
      return gameboard.receiveAttack(coordinateIndex);
    }
    //get number from 0-99
    coordinateIndex = Math.floor(Math.random() * 100);
    console.log(coordinateIndex);

    return gameboard.receiveAttack(coordinateIndex);
  };

  return { getName, attack };
};

module.exports = Player;
