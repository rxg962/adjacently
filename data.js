let totalScore;
let totalPlays;
let averageScore;
let streak;
let dataScreenShowing = false;
let lastPlayed;
let todaysScore;
let winOrLoss;
let data = {
  tp: totalPlays,
  st: streak,
  ts: totalScore,
  lp: lastPlayed,
  av: averageScore,
  sc: todaysScore,
  wl: winOrLoss,
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
    };
  }

  totalPlays = data.tp;
  streak = data.st;
  totalScore = data.ts;
  lastPlayed = data.lp;
  averageScore = data.av;
  todaysScore = data.sc;
  winOrLoss = data.wl;
  


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
    if (LP != Y || streak == undefined) {
      streak = 0;
    }
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
    } else {
      streak = 1;
    }
  } else if (LP == T) {
    return;
  }

  lastPlayed = today;
  
  winOrLoss = gamestate;

  await saveTodaysBoard();

  data.tp = totalPlays;
  data.st = streak;
  data.ts = totalScore;
  data.lp = lastPlayed;
  data.av = averageScore;
  data.sc = todaysScore;
  data.wl = winOrLoss;

  await storeItem("data", data);
  console.log(data);
}

class dataButton {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.txt = "!";
    this.colour = undefined;
    this.pressed = false;
  }

  show() {
    if (this.pressed) {
      navigator.vibrate(1);
      this.colour = darkblueC;
    } else {
      this.colour = blueC;
    }

    if (this.r > width / 20) {
      noStroke();
      fill(darkblueC);
      circle(this.x + shadowSize / 2, this.y + shadowSize / 2, this.r * 2);
    }

    fill(this.colour);
    circle(this.x, this.y, this.r * 2);
    fill(255);
    textSize(this.r);
    textAlign(CENTER, CENTER);
    text(this.txt, this.x, this.y);
  }

  keyPressed() {
    if (
      mouseX > this.x - this.r &&
      mouseX < this.x + this.r &&
      mouseY > this.y - this.r &&
      mouseY < this.y + this.r
    ) {
      this.pressed = true;

      setTimeout(() => {
        getData();
        dataScreenShowing = true;
      }, 100);
    }

    setTimeout(() => {
      this.pressed = false;
    }, 100);
  }
}

function dataScreen() {
  rectMode(CORNER);
  fill(backgroundC);
  rect(0, 0, width, height);
  rectMode(CENTER);

  fill(255);
  rect(helpScreenX, helpScreenY, helpScreenW, helpScreenH, 20);

  if (!averageScore) {
    txt2 = "AVERAGE: 0";
  } else {
    txt2 = "AVERAGE: " + averageScore;
  }

  if (streak == null) {
    txt3 = "STREAK: 0";
  } else {
    txt3 = "STREAK: " + streak;
  }

  textAlign(CENTER, CENTER);
  fill(blueC);
  textSize(width / 15);
  text(txt2, width / 2, height * 0.33);
  text(txt3, width / 2, height * 0.66);

  let buffer = width / 20;
  let exButtonX = helpScreenX + helpScreenW / 2 - buffer;
  let exButtonY = helpScreenY - helpScreenH / 2 + buffer;
  exButton = new exitButton(exButtonX, exButtonY);
  exButton.show();
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
