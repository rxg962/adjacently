let totalScore = 0;
let totalPlays = 0;
let averageScore = 0;
let streak = 0;
let dataScreenShowing = false;
let lastPlayed = 0;
let todaysScore = 0;
let winOrLoss = 0;
let totalWins = 0;
let winPercentage = 0;
let rButton = 0;
let scoreDistribution = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let data = {
  tp: totalPlays,
  st: streak,
  ts: totalScore,
  lp: lastPlayed,
  av: averageScore,
  sc: todaysScore,
  wl: winOrLoss,
  tw: totalWins,
  wp: winPercentage,
  sd: scoreDistribution,
};
let todaysBoard = [];
let doneBlocks = [];

async function getData() {
  data = await getItem("data");

  if (!data) {
    data = {
      tp: 0,
      st: 0,
      ts: 0,
      lp: null,
      av: 0,
      sc: 0,
      wl: null,
      tw: 0,
      wp: 0,
      sd: new Array(10).fill(0),
    };
  }

  totalPlays = data.tp;
  streak = data.st;
  todaysScore = data.sc;
  totalScore = data.ts;
  lastPlayed = data.lp;
  averageScore = data.av;
  winOrLoss = data.wl;
  totalWins = data.tw;
  winPercentage = data.wp;
  scoreDistribution = data.sd;

  let today = new Date();
  let yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  let LP;
  if (lastPlayed) {
    LP = new Date(lastPlayed).toDateString();
  }
  let T = today.toDateString();
  let Y = yesterday.toDateString();

  if (LP != T) {
    todaysScore = "-";
    if (LP != Y || winOrLoss == "lost") {
      streak = 0;
    }
  } else if (LP == T && todaysScore == 0) {
    streak = 0;
  }
}

async function saveData() {
  await getItem("data");

  let today = new Date();
  let yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  let T = today.toDateString();
  let LP;
  if (lastPlayed) {
    LP = new Date(lastPlayed).toDateString();
  }
  let Y = yesterday.toDateString();

  if (LP != T) {
    if (totalPlays == null) {
      totalPlays = 0;
    }
    totalPlays++;

    if (totalScore == null) {
      totalScore = 0;
    }
    totalScore += score;
    todaysScore = score;

    if (totalPlays != 0) {
      averageScore = totalScore / totalPlays;
      averageScore = Math.round(averageScore * 2) / 2;
    } else {
      averageScore = 0;
    }

   if (LP == Y) {
      streak++;
      if (todaysScore == 0) {
        streak = 0;
      } 
    } else {
        streak = 1;
      }
  } else if (LP == T) {
    return;
  }


  lastPlayed = today;

  winOrLoss = gamestate;

  if (winOrLoss == "won") {
    totalWins++;
  }

  winPercentage = totalPlays != 0 ? floor((totalWins / totalPlays) * 100) : 0;

  if (todaysScore > 0) {
    scoreDistribution[todaysScore - 1]++;
  }

  await saveTodaysBoard();

  data.tp = totalPlays;
  data.st = streak;
  data.ts = totalScore;
  data.lp = lastPlayed;
  data.av = averageScore;
  data.sc = todaysScore;
  data.wl = winOrLoss;
  data.tw = totalWins;
  data.wp = winPercentage;
  data.sd = scoreDistribution;

  await storeItem("data", data);
  console.log(data);
}

function dataScreen() {
  rectMode(CORNER);
  fill(backgroundC);
  rect(0, 0, width, height);
  rectMode(CENTER);

  fill(255);
  rect(helpScreenX, helpScreenY, helpScreenW, helpScreenH, 20);

  textAlign(CENTER, CENTER);
  textSize(width / 8);
  let cornerbuffer = width / 10;
  let left = helpScreenX - helpScreenW / 2;
  let top = helpScreenY - helpScreenH / 2;
  fill(blueC);
  text("STATS", helpScreenX, top + cornerbuffer);

  // textSize(width/12);
  // let h = textAscent() + textDescent();
  let h = helpScreenH / 10;

  titleDividingLine(helpTop + h);

  fill(blueC);
  textSize(width / 24);
  let txt1 = "Today";
  let txt2 = "Average";
  let txt3 = "Streak";
  let txt4 = "Win %";

  let w1 = textWidth(txt1) / 2;
  let w2 = textWidth(txt2) / 2;
  let w3 = textWidth(txt3) / 2;
  let w4 = textWidth(txt4) / 2;

  textAlign(CENTER, CENTER);

  let txtY = helpTop + 1.75 * h;
  text(txt1, helpScreenW * 0.25 - w1, txtY);
  text(txt2, helpScreenW * 0.5 - w2, txtY);
  text(txt3, helpScreenW * 0.75 - w3, txtY);
  text(txt4, helpScreenW * 1 - w4, txtY);

  let val1 = todaysScore ? todaysScore : 0;
  let val2 = averageScore ? averageScore : 0;
  let val3 = streak ? streak : 0;
  let val4 = winPercentage ? winPercentage : 0;

  fill(blueC);
  let valY = helpTop + 2.25 * h;
  text(val1, helpScreenW * 0.25 - w1, valY);
  text(val2, helpScreenW * 0.5 - w2, valY);
  text(val3, helpScreenW * 0.75 - w3, valY);
  text(val4, helpScreenW * 1 - w4, valY);

  titleDividingLine(helpTop + h * 3);

  fill(blueC);
  textSize(width / 20);
  let tentxt = "10:";
  let wdist = textWidth(tentxt) / 2;
  let hsmall = textAscent() + textDescent();
  for (i = 0; i < 10; i++) {
    let index = i + 1;
    let distamt = scoreDistribution[i] ? scoreDistribution[i] : 0;
    let distY = helpTop + (3.75 + 0.5 * (9 - i)) * h;
    let barW = map(distamt, 0, totalPlays, 0, helpScreenW * 0.75);
    let disttxt = text(index + ": ", helpScreenW * 0.25 - w1, distY);
    let offset = wdist * 1;

    rectMode(CORNER);
    let c1 = color(255);
    let c2 = blueC;
    let d = helpScreenW * 0.75;
    let x = helpScreenW * 0.25 - wdist + offset;
    let y = distY - hsmall / 4;
    for (let i = 0; i < barW; i++) {
      let index = map(i, 0, barW, 0, 1);
      let c = lerpColor(c1, c2, index);
      fill(c);
      rect(x + i, y, 1, hsmall / 2);
    }
  }

  let buffer = width / 20;
  let exButtonX = helpScreenX + helpScreenW / 2 - buffer;
  let exButtonY = helpScreenY - helpScreenH / 2 + buffer;
  exButton = new exitButton(exButtonX, exButtonY);
  exButton.show();
}

function titleDividingLine(y) {
  let c1 = color(255);
  let c2 = blueC;
  let d = helpScreenW / 2 - 2;
  textSize(width / 12);
  let h = textAscent() + textDescent();
  let w = height / 75;
  let x = helpScreenX;
  this.y = y;
  noStroke();
  rectMode(CENTER);
  for (let i = 0; i < d; i++) {
    let index = map(i, 0, d, 0, 1);
    let c = lerpColor(c1, c2, index);
    fill(c);
    rect(x - d + i, this.y, 1, w);
  }

  for (let i = 0; i < d; i++) {
    let index = map(i, 0, d, 0, 1);
    let c = lerpColor(c2, c1, index);
    fill(c);
    rect(x + i, this.y, 1, w);
  }
}

async function saveTodaysBoard() {
  for (let i = 0; i < blocks.length; i++) {
    let b = blocks[i];
    let bc = getBlockColour(b);
    let tc = getTextColour(b);

    todaysBoard[i] = {
      x: b.x,
      y: b.y,
      finishY: b.finishY,
      index: b.index,
      w: b.w,
      h: b.h,
      letter: b.letter,
      bcolour: [red(bc), green(bc), blue(bc), alpha(bc)],
      tcolour: [red(tc), green(tc), blue(tc), alpha(tc)],
    };
  }
  await storeItem("todays board", todaysBoard);
}

async function getTodaysBoard() {
  await getData();

  let today = new Date();
  let T = today.toDateString();
  let LP;
  if (lastPlayed) {
    LP = new Date(lastPlayed).toDateString();
  }

  if (T === LP) {
    let savedBoard = await getItem("todays board");
    if (savedBoard) {
      todaysBoard = savedBoard;
    } else {
      todaysBoard = [];
    }
    gamestate = "played";
  } else {
    todaysBoard = [];
  }

  doneBlocks = [];

  for (let i = 0; i < todaysBoard.length; i++) {
    let b = todaysBoard[i];

    let block = new DoneBlock(b.x, b.y, b.letter);
    block.finishY = b.finishY;
    block.colour = color(
      b.bcolour[0],
      b.bcolour[1],
      b.bcolour[2],
      b.bcolour[3]
    );
    block.txtcolour = color(
      b.tcolour[0],
      b.tcolour[1],
      b.tcolour[2],
      b.tcolour[3]
    );
    doneBlocks.push(block);
  }
}

function getBlockColour(b) {
  let lastRowStart = blocks.length - 5;
  let c;

  if (gamestate == "won" && b.index >= lastRowStart) {
    c = pinkC;
  } else if (
    b.isNotAllowed() &&
    !b.matched &&
    !correctLetters.includes(b.letter)
  ) {
    c = greyC;
  } else {
    c = color(255);
  }
  return c;
}

function getTextColour(b) {
  let lastRowStart = blocks.length - 5;
  let c;

  if (gamestate == "won" && b.index >= lastRowStart) {
    c = color(255);
  } else if (
    target &&
    target.includes(b.letter) &&
    (b.LMatch > -1 || b.UMatch > -1 || b.RMatch > -1 || b.DMatch > -1)
  ) {
    c = pinkC;
  } else {
    c = color(0);
  }

  return c;
}

class DoneBlock {
  constructor(x, y, letter) {
    this.x = x;
    this.y = playAreaTop - h - random(15, 50);
    this.w = w;
    this.h = h;
    this.finishY = y;
    this.letter = letter;
    this.colour = color(255);
    this.txtcolour = color(0);
  }

  show() {
    let lastRowStart = blocks.length - 5;

    fill(this.colour);

    noStroke();
    rectMode(CORNER);
    let d = 3;

    rect(this.x + d, this.y + d, this.w - 2 * d, this.h - 2 * d, 15);

    //TEXTCOLOUR
    textSize(min(w, h) / 2);

    fill(this.txtcolour);

    noStroke();
    textAlign(CENTER, CENTER);
    text(this.letter, this.x + w / 2, this.y + h / 2);
  }

  update() {
    let speed = 10;
    if (this.y < this.finishY - speed) {
      this.y += speed;
    } else {
      this.y = this.finishY;
    }
  }
}
