function getWidthOfRing(ringName, numOfRings, minWidth, maxWidth) {
  let difference = maxWidth - minWidth;
  let delta = difference / numOfRings;
  let ringNum = Number(ringName.substring(1));
  return minWidth + delta * ringNum;
}

function getColorOfRing(ringName, numOfRings) {
  let difference = 255 - 0;
  let delta = difference / numOfRings;
  let ringNum = Number(ringName.substring(1));
  return 0 + delta * ringNum;
}

function solveTowersofBrahmaFor0(towersIn, moveFrom, moveTo, using) {
  let towers = towersIn
  const moves = [];
  return {
    moves: moves,
    towers: towers,
    movedRing: 'N/A',
    ringMovedFrom: 'N/A',
    ringMovedTo: 'N/A'
  };
}

function solveTowersofBrahmaFor1(towersIn, moveFrom, moveTo, using) {
  let towers = towersIn
  const moves = [];
  let r0 = towers[moveFrom].rings.shift();
  towers[moveTo].rings.unshift(r0);
  moves.push({
    [towers[0].name]: [...towers[0].rings],
    [towers[1].name]: [...towers[1].rings],
    [towers[2].name]: [...towers[2].rings],
    movedRing: r0,
    ringMovedFrom: towers[moveFrom],
    ringMovedTo: towers[moveTo]
  });
  return {
    moves: moves,
    towers: towers
  };
}



function solveTowersofBrahma(towersIn, numOfRingsToInspect, moveFrom, moveTo, using) {
  let towers = [...towersIn];
  if (numOfRingsToInspect === 0) {
    return solveTowersofBrahmaFor0(towersIn, moveFrom, moveTo, using);
  } else if (numOfRingsToInspect === 1) {
    let returnValue = solveTowersofBrahmaFor1(towersIn, moveFrom, moveTo, using);
    return returnValue;
  } else {
    let returnValue = solveTowersofBrahma([towers[0], towers[1], towers[2]], numOfRingsToInspect - 1, moveFrom, using, moveTo);
    towers = returnValue.towers
    let lastRing = towers[moveFrom].rings.shift();
    towers[moveTo].rings.unshift(lastRing);
    let singleMove = {
      [towers[0].name]: [...towers[0].rings],
      [towers[1].name]: [...towers[1].rings],
      [towers[2].name]: [...towers[2].rings],
      movedRing: lastRing,
      ringMovedFrom: towers[moveFrom],
      ringMovedTo: towers[moveTo]
    };
    let returnValue2 = solveTowersofBrahma([towers[0], towers[1], towers[2]], numOfRingsToInspect - 1, using, moveTo, moveFrom);
    towers = returnValue2.towers;
    let rv = {
      moves: [],
      towers: []
    };
    rv.moves = [
      ...returnValue.moves,
      singleMove,
      ...returnValue2.moves
    ];
    rv.towers = [...towers];
    return rv;
  }
}

let counter = 0;
let fr = 1;
let colorChanger = 90;

let numOfRings = prompt('How many rings do you want ')
while (true) {
  if (isNaN(numOfRings)) {
    console.log('Enter a valid number.');
    numOfRings = prompt('How many rings do you want ');
  } else {
    numOfRings = Number(numOfRings);
    break;
  }
}
const towersGlobal = [{
  name: 'T0',
  rings: []
}, {
  name: 'T1',
  rings: []
}, {
  name: 'T2',
  rings: []
}];
for (let i = 0; i < numOfRings; i++) {
  towersGlobal[0].rings.push('R' + i.toString());
}
let t0rings = [...towersGlobal[0].rings];
let rv = solveTowersofBrahma(towersGlobal, numOfRings, 0, 2, 1);
rv.moves.unshift({
  T0: t0rings,
  T1: [],
  T2: [],
  movedRing: 'N/A',
  ringMovedFrom: 'N/A',
  ringMovedTo: 'N/A'
});

let minWidth = 100;
let maxWidth = 300;

let maxHeight = 400;
let ringHeight = (maxHeight / numOfRings > 50) ? 50 : (maxHeight / numOfRings);

console.log(rv);

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  frameRate(fr)
}

function draw() {
  background(255);
  fill(0)
  rect(window.innerWidth * 3/16, window.innerHeight - window.innerHeight * 3/4, 10, window.innerHeight - window.innerHeight * 1/4)
  rect(window.innerWidth * 1/2, window.innerHeight - window.innerHeight * 3/4, 10, window.innerHeight - window.innerHeight * 1/4)
  rect(window.innerWidth * 13/16, window.innerHeight - window.innerHeight * 3/4, 10, window.innerHeight - window.innerHeight * 1/4)
  textSize((window.innerHeight * 3/40 + window.innerWidth * 3/40) / 2);
  textAlign(CENTER, CENTER)
  text('Towers Of Brahma', window.innerWidth / 2, window.innerHeight * 7/80);
  textSize((window.innerHeight * 1/20 + window.innerWidth * 1/20) / 2);
  textAlign(CENTER, CENTER)
  text('Moves: ' + counter, window.innerWidth / 2, window.innerHeight * 7/40);
  for (let i in rv.moves[counter].T0) {
    let width = getWidthOfRing(rv.moves[counter].T0[i], numOfRings, minWidth, maxWidth);
    let bwColor = getColorOfRing(rv.moves[counter].T0[i], numOfRings);
    let rgbColor = color(bwColor, 255 - bwColor, numOfRings * colorChanger)
    fill(rgbColor)
    rect(window.innerWidth * 3/16 - (width / 2), window.innerHeight - (ringHeight * (rv.moves[counter].T0.length - i)), width, ringHeight);
  }
  for (let i in rv.moves[counter].T1) {
    let width = getWidthOfRing(rv.moves[counter].T1[i], numOfRings, minWidth, maxWidth);
    let bwColor = getColorOfRing(rv.moves[counter].T1[i], numOfRings);
    let rgbColor = color(bwColor, 255 - bwColor, numOfRings * colorChanger)
    fill(rgbColor)
    rect(window.innerWidth * 1/2 - (width / 2), window.innerHeight - (ringHeight * (rv.moves[counter].T1.length - i)), width, ringHeight);
  }
  for (let i in rv.moves[counter].T2) {
    let width = getWidthOfRing(rv.moves[counter].T2[i], numOfRings, minWidth, maxWidth);
    let bwColor = getColorOfRing(rv.moves[counter].T2[i], numOfRings);
    let rgbColor = color(bwColor, 255 - bwColor, numOfRings * colorChanger)
    fill(rgbColor)
    rect(window.innerWidth * 13/16 - (width / 2), window.innerHeight - (ringHeight * (rv.moves[counter].T2.length - i)), width, ringHeight);
  }
  counter++;
  if (counter === rv.moves.length) {
    noLoop();
  }
}
