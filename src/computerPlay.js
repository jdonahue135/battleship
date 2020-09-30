let hits = [];
let missesAfterHits = [];

const computerPlay = (gameboard) => {
  let play;
  if (hits.length < 1) {
    play = Math.floor(Math.random() * 100);
  }

  //one hit exists
  if (hits.length === 1) {
    const hit = hits[0];
    let letterValue = hit.charCodeAt(0) - 65;
    //number is a string
    let number = hit.slice(1);

    //check misses
    if (!missesAfterHits) {
      //no misses, make play
      if (letterValue !== 0) {
        //play up
        play = String.fromCharCode(letterValue - 1) + number;
      } else {
        play = String.fromCharCode(letterValue + 1) + number;
      }
    } else {
      //there are misses,
    }
  }
};
