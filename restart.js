let guessWords = [],
  targetWords = [];
let blocks = [];
let w, h;
let letters = [];
let target;
let index = 0;
let guessY;
let guessWord;
let totalGuesses = 10;
let inputArr = [];
let redC,
  yellowC,
  greenC,
  blueC,
  pinkC,
  greyC,
  lightredC,
  lightblueC,
  darkblueC,
  darkpinkC,
  darkredC;
let targetIndex;
let invalidWord = false;
let timeNow;
let gameStarted = false;
let targetType;
let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let fallingBlocks = [];
let fireworks = [];
let fireworkcolours = [];
let fireworkpinkC,
  fireworkblueC,
  fireworkpurpleC,
  fireworkorangeC,
  fireworkgreenC,
  fireworkyellowC;
let fireworkDelay;
let fireworkCounter = 0;
let score = 0;
let lastFireworkTime = 0;
let fireworksStarted = false;
let gameWidth, gameHeight;
let letterKeys = [];
let functionKeys = [];
let keyW, keyH;
let buttonW, buttonH;
let correctLetters = [];
let incorrectLetters = [];
let keyboardTop;
let gameState;
let startmenuButtons = [];
let dividingLineH;
let dailytxt = "Daily";
let infinitetxt = "Infinite";
let experttxt = "Expert";
let playAgButton;
let hButton, exButton;
let helpScreenShowing = false;
let txt1, txt2, txt3, txtStrokeC, txtFillC, text1Size, text2Size;
let restartTexts = [];
let restartTextsCreated = false;
let restartMenuShowing = false;
let failFireworks = [];
let bombs = [];
let bombDropped = false;
let bombExplodedTime;
let bombExploded = false;
let expertMode = false;
let titleTextBlocksStartMenu = [];
let titleTextBlocksTopBar = [];
let title = ["A", "D", "J", "A", "C", "E", "N", "T", "L", "Y"];
let hintScreenShowing = false;

function restart() {
  blocks = [];
  letters = [];
  index = 0;
  guessY = gameHeight - h;
  inputArr = [];
  targetType = null;
  fallingBlocks = [];
  fireworks = [];
  fireworkCounter = 0;
  score = 0;
  lastFireworkTime = 0;
  playAgain = false;
  keyboardShowing = false;
  fireworksStarted = false;
  correctLetters = [];
  incorrectLetters = [];
  gamestate = "startmenu";
  restartTexts = [];
  restartTextsCreated = false;
  playAgButton.y = height * 1.3;
  playAgButton.acc = 0.2;
  playAgButton.speed = 8;
  restartText.y = height * 1.3;
  restartText.acc = 0.2;
  restartText.speed = 8;
  restartTextRect.y = -height * 0.3;
  restartTextRect.acc = 0.2;
  restartTextRect.speed = 8;
  restartMenuShowing = true;
  failFireworks = [];
  bombs = [];
  bombDropped = false;
  bombExplodedTime = undefined;
  bombExploded = false;
  hintBlocks = [];
  hintRevealed = false;
  hintChosen = false;
  showKeyboardHint = false;
  hint = undefined;
  doneBlocks = [];

  for (let k of letterKeys) {
    k.state = "default";
  }
}

async function restartMenu() {
  textAlign(CENTER, CENTER);
  await getData();

  if (gamestate == "played") {
    if (data.wl == "won") {
      txt1 = "TODAY: " + todaysScore;
      txt2 = "AVERAGE: " + averageScore;
      txt3 = "STREAK: " + streak;
      txtStrokeC = pinkC;
      txtFillC = pinkC;

      text1Size = 64;
      textSize(text1Size);
      while (textWidth(txt1) > playAgButton.w * 0.8 && text1Size > 0) {
        text1Size -= 1;
        textSize(text1Size);
      }
      text2Size = 64;
      textSize(text2Size);
      while (textWidth(txt2) > playAgButton.w * 0.8 && text2Size > 0) {
        text2Size -= 1;
        textSize(text2Size);
      }
      text3Size = 64;
      textSize(text3Size);
      while (textWidth(txt3) > playAgButton.w * 0.8 && text3Size > 0) {
        text3Size -= 1;
        textSize(text3Size);
      }

      let textWinSize = min(text1Size, text2Size);
      textWinSize = min(text3Size, textWinSize);

      let textX = width / 4;
      let buffer = width / 30;
      let boxH = height * 0.2;

      let text1Y = height - (3 * (height - dividingLineH)) / 4 + buffer;
      let text2Y = height - (height - dividingLineH) / 2;
      let text3Y = height - (1 * (height - dividingLineH)) / 4 - buffer;

      if (!restartTextsCreated) {
        restartTxtRect = new restartTextRect(txtStrokeC);
        restartTexts.push(
          new restartText(txt1, textX, text1Y, txtFillC, textWinSize)
        );
        restartTexts.push(
          new restartText(txt2, textX, text2Y, txtFillC, textWinSize)
        );
        restartTexts.push(
          new restartText(txt3, textX, text3Y, txtFillC, textWinSize)
        );
        restartTextsCreated = true;
      }
    } else if (data.wl == "lost") {
      txt1 = "TARGET:";
      txt2 = target.join("");
      txtStrokeC = redC;
      txtFillC = redC;

      text1Size = 64;
      textSize(text1Size);
      while (textWidth(txt1) > playAgButton.w / 3 && text1Size > 0) {
        text1Size -= 1;
        textSize(text1Size);
      }
      text2Size = 64;
      textSize(text2Size);
      while (textWidth(txt2) > playAgButton.w * 0.9 && text2Size > 0) {
        text2Size -= 1;
        textSize(text2Size);
      }
      let textX = width / 4;
      let buffer = width / 30;
      let text1Y = height - (3 * (height - dividingLineH)) / 4 + buffer;
      let text2Y = height - (height - dividingLineH) / 2 + buffer;

      if (!restartTextsCreated) {
        restartTxtRect = new restartTextRect(txtStrokeC);
        restartTexts.push(
          new restartText(txt1, textX, text1Y, txtFillC, text1Size)
        );
        restartTexts.push(
          new restartText(txt2, textX, text2Y, txtFillC, text2Size)
        );
        restartTextsCreated = true;
      }
    }
  } else if (gamestate == "won" && targetType == dailytxt) {
    txt1 = "TODAY: " + score;
    txt2 = "AVERAGE: " + averageScore;
    txt3 = "STREAK: " + streak;

    txtStrokeC = pinkC;
    txtFillC = pinkC;

    text1Size = 64;
    textSize(text1Size);
    while (textWidth(txt1) > playAgButton.w * 0.8 && text1Size > 0) {
      text1Size -= 1;
      textSize(text1Size);
    }
    text2Size = 64;
    textSize(text2Size);
    while (textWidth(txt2) > playAgButton.w * 0.8 && text2Size > 0) {
      text2Size -= 1;
      textSize(text2Size);
    }
    text3Size = 64;
    textSize(text3Size);
    while (textWidth(txt3) > playAgButton.w * 0.8 && text3Size > 0) {
      text3Size -= 1;
      textSize(text3Size);
    }

    let textWinSize = min(text1Size, text2Size);
    textWinSize = min(text3Size, textWinSize);

    let textX = width / 4;
    let buffer = width / 30;
    let boxH = height * 0.2;

    let text1Y = height - (3 * (height - dividingLineH)) / 4 + buffer;
    let text2Y = height - (height - dividingLineH) / 2;
    let text3Y = height - (1 * (height - dividingLineH)) / 4 - buffer;

    if (!restartTextsCreated) {
      restartTxtRect = new restartTextRect(txtStrokeC);
      restartTexts.push(
        new restartText(txt1, textX, text1Y, txtFillC, textWinSize)
      );
      restartTexts.push(
        new restartText(txt2, textX, text2Y, txtFillC, textWinSize)
      );
      restartTexts.push(
        new restartText(txt3, textX, text3Y, txtFillC, textWinSize)
      );
      restartTextsCreated = true;
    }
  } else if (gamestate == "won" && targetType != dailytxt) {
    txt1 = "SCORE:";
    if (score > 1) {
      txt2 = score + " pts";
    } else if (score == 1) {
      txt2 = score + " pt";
    }
    txtStrokeC = pinkC;
    txtFillC = pinkC;

    text1Size = 64;
    textSize(text1Size);
    while (textWidth(txt1) > playAgButton.w / 3 && text1Size > 0) {
      text1Size -= 1;
      textSize(text1Size);
    }
    text2Size = 64;
    textSize(text2Size);
    while (textWidth(txt2) > playAgButton.w * 0.9 && text2Size > 0) {
      text2Size -= 1;
      textSize(text2Size);
    }

    let textX = width / 4;
    let buffer = width / 30;
    let text1Y = height - (3 * (height - dividingLineH)) / 4 + buffer;
    let text2Y = height - (height - dividingLineH) / 2 + buffer;

    if (!restartTextsCreated) {
      restartTxtRect = new restartTextRect(txtStrokeC);
      restartTexts.push(
        new restartText(txt1, textX, text1Y, txtFillC, text1Size)
      );
      restartTexts.push(
        new restartText(txt2, textX, text2Y, txtFillC, text2Size)
      );
      restartTextsCreated = true;
    }
  } else if (gamestate == "lost") {
    targettxt = target.join("");
    txt1 = "TARGET:";
    txt2 = targettxt;

    txtStrokeC = redC;
    txtFillC = redC;

    text1Size = 64;
    textSize(text1Size);
    while (textWidth(txt1) > playAgButton.w / 3 && text1Size > 0) {
      text1Size -= 1;
      textSize(text1Size);
    }
    text2Size = 64;
    textSize(text2Size);
    while (textWidth(txt2) > playAgButton.w * 0.9 && text2Size > 0) {
      text2Size -= 1;
      textSize(text2Size);
    }
    let textX = width / 4;
    let buffer = width / 30;
    let text1Y = height - (3 * (height - dividingLineH)) / 4 + buffer;
    let text2Y = height - (height - dividingLineH) / 2 + buffer;

    if (!restartTextsCreated) {
      restartTxtRect = new restartTextRect(txtStrokeC);
      restartTexts.push(
        new restartText(txt1, textX, text1Y, txtFillC, text1Size)
      );
      restartTexts.push(
        new restartText(txt2, textX, text2Y, txtFillC, text2Size)
      );
      restartTextsCreated = true;
    }
  }

  if (targetType == dailytxt) {
    sButton.show();
    sButton.update();
  } else if (targetType == infinitetxt) {
    playAgButton.show();
    playAgButton.update();
  }

  restartTxtRect.show();
  restartTxtRect.update();

  for (let t of restartTexts) {
    t.show();
    t.update();
  }
}

class restartText {
  constructor(txt, x, y, fc, txtsize) {
    this.x = x;
    this.targetY = y;
    this.w = width * 0.4;
    this.h = height * 0.2;
    this.y = height + this.h;
    this.acc = 0.2;
    this.speed = 8;
    this.txt = txt;
    this.fillCol = fc;
    this.txtsize = txtsize;
  }

  show() {
    noStroke();
    fill(this.fillCol);
    textAlign(CENTER, CENTER);
    textSize(this.txtsize);
    text(this.txt, this.x, this.y);
  }

  update() {
    if (this.y > this.targetY) {
      this.speed += this.acc;
      this.y -= this.speed;
    } else {
      this.y = this.targetY;
    }
  }
}

class restartTextRect {
  constructor(sc) {
    this.x = width / 4;
    this.targetY = height - (height - dividingLineH) / 2;
    this.w = width * 0.4;
    this.h = height * 0.2;
    this.y = height + this.h;
    this.acc = 0.2;
    this.speed = 8;
    this.strokeCol = sc;
  }

  show() {
    stroke(this.strokeCol);
    strokeWeight(4);
    noFill();
    rectMode(CENTER);
    rect(width / 4, this.y, width * 0.4, height * 0.2, 20);
  }

  update() {
    if (this.y > this.targetY) {
      this.speed += this.acc;
      this.y -= this.speed;
    } else {
      this.y = this.targetY;
    }
  }
}
