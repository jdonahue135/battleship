const Ship = (name) => {
  let length;
  switch (name) {
    case "Carrier":
      length = 5;
      break;
    case "Battleship":
      length = 4;
      break;
    case "Destroyer":
      length = 3;
      break;
    case "Submarine":
      length = 3;
      break;
    case "Patrol Boat":
      length = 2;
      break;
    default:
      break;
  }
  const getName = () => name;
  const getLength = () => length;
  let ship = [];
  const getShip = () => ship;
  for (let i = 0; i < length; i++) {
    let shipSpace = {
      index: i,
      hitStatus: false,
    };
    ship.push(shipSpace);
  }

  const hit = (i) => {
    ship[i].hitStatus = true;
  };

  const isSunk = () => {
    let hitSpaces = 0;
    ship.forEach((shipSpace) => {
      if (shipSpace.hitStatus === true) {
        hitSpaces++;
      }
    });
    let sunkStatus = hitSpaces === length ? true : false;
    return sunkStatus;
  };

  return { getName, getLength, getShip, hit, isSunk };
};

module.exports = Ship;
