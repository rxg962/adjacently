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


  for (let k of letterKeys) {
    k.state = "default";
  }
}

function restartMenu() {
  if (gamestate == "won") {
    txt1 = "SCORE:";
    if (score > 1) {
      txt2 = score + " pts";
    } else if (score == 1) {
      txt2 = score + " pt";
    }
  } else if (gamestate == "lost") {
    targettxt = target.join("");
    txt1 = "TARGET:";
    txt2 = targettxt;
  }

  if (gamestate == "won") {
    txtStrokeC = pinkC;
    txtFillC = pinkC;
  } else if (gamestate == "lost") {
    txtStrokeC = redC;
    txtFillC = redC;
  }

  let textHeight = textAscent() + textDescent();
  let textX = width / 4;
  let text1Y = height - (3 * (height - dividingLineH)) / 4 + textHeight / 2;
  let text2Y = height - (height - dividingLineH) / 2 + textHeight / 2;

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

  playAgButton.show();
  playAgButton.update();

  restartTxtRect.show();
  restartTxtRect.update();

  for (let t of restartTexts) {
    t.show();
    t.update();
  }
}

class playAgainButton {
  constructor() {
    this.x = (3 * width) / 4;
    this.targetY = height - (height - dividingLineH) / 2;
    this.w = width * 0.4;
    this.h = height * 0.2;
    this.y = height + this.h;
    this.txt = "Play\nAgain";
    this.colour = undefined;
    this.pressed = false;
    this.acc = 0.2;
    this.speed = 8;
    this.falling = true;
  }

  show() {
    if (gamestate == "won") {
      if (this.pressed) {
        navigator.vibrate(1);
        this.colour = color(229, 90, 162);
      } else {
        this.colour = pinkC;
      }
    }

    if (gamestate == "lost") {
      if (this.pressed) {
        navigator.vibrate(1);
        this.colour = color(238, 28, 0);
      } else {
        this.colour = redC;
      }
    }

    fill(this.colour);
    noStroke();
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h, 20);
    fill(255);
    textSize(width / 12);
    textAlign(CENTER, CENTER);
    let textX = this.x;
    let textY = this.y;
    text(this.txt, textX, textY);
  }

  update() {
    if (this.y > this.targetY) {
      this.speed += this.acc;
      this.y -= this.speed;
    } else {
      this.y = this.targetY;
      this.falling = false;
    }
  }

  keyPressed() {
    if (
      mouseX > this.x - this.w / 2 &&
      mouseX < this.x + this.w / 2 &&
      mouseY > this.y - this.h / 2 &&
      mouseY < this.y + this.h / 2 &&
      !this.falling
    ) {
      this.pressed = true;
      setTimeout(() => {
        restart();
        gamestate = "startmenu";
      }, 100);
    }

    setTimeout(() => {
      this.pressed = false;
    }, 100);
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
