const Ship = (name) => {
  let ship = [];
  let length;
  // eslint-disable-next-line default-case
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
  }
  const getName = () => name;
  const getShip = () => ship;
  const getLength = () => length;
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
