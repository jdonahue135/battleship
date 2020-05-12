const Ship = (length) => {
    const getLength = () => length;
    let ship = []
    const getShip = () => ship
    for (let i = 0; i < length; i++) {
        let shipSpace = {
            'index': i,
            'hitStatus': false
        }
        ship.push(shipSpace);
    }

    const hit = (i) => {
        ship[i].hitStatus = true;
    }

    const isSunk = () => {
        let hitSpaces = 0;
        ship.forEach(shipSpace => {
            if (shipSpace.hitStatus === true) {
                hitSpaces++;
            }
        })
        let sunkStatus = (hitSpaces === length) ? true : false;
        return sunkStatus;
    }

    return { getLength, getShip, hit, isSunk }
};

module.exports =  Ship;
