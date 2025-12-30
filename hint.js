let hintScreenX, hintScreenY, hintScreenW, hintScreenH;
let hintBlocks = [];
let hintLeft, hintTop;
let hintButton;
let hintRevealed = false;
let hint;
let hintChosen = false;
let hintTime;
let showKeyboardHint = false;
let hintScreenShown = false;

function setupHintscreen() {
  createHintScreenBoundaries();
  hintButton = new getHintButton();
}

function hintScreen() {
  rectMode(CENTER);
  fill(255);
  rect(hintScreenX, hintScreenY, hintScreenW, hintScreenH, 20);

  hintText();

  if (!hintRevealed) {
    hintButton.show();
  }

  if (hintRevealed) {
    getHintLetter();

    if (millis() - hintTime < 1000) {
      let letter = alphabet.charAt(floor(random(alphabet.length)));
      hintBlocks.push(
        new HintBlock(
          hintScreenX,
          hintScreenY + hintScreenH * 0.1,
          letter,
          blueC
        )
      );
      for (let h of hintBlocks) {
        h.show();
        navigator.vibrate(1);
      }
    } else {
      hintLetterBlock = new HintBlock(
        hintScreenX,
        hintScreenY + hintScreenH * 0.1,
        hint,
        pinkC
      );
      hintLetterBlock.show();
      showKeyboardHint = true;

      setTimeout(() => {
        hintScreenShowing = false;
      }, 1000);
    }
  }

  let buffer = width / 20;
  let exButtonX = hintScreenX + hintScreenW / 2 - buffer;
  let exButtonY = hintScreenY - hintScreenH / 2 + buffer;
  exButton = new exitButton(exButtonX, exButtonY);
  exButton.show();
}

class HintBlock {
  constructor(x, y, letter, c) {
    this.w = width / 5;
    this.x = x;
    this.y = y;
    this.h = this.w;
    this.letter = letter;
    this.col = c;
  }

  show() {
    noStroke();
    fill(this.col);
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h, 5);
    noStroke();
    textSize(width / 8);
    textAlign(CENTER, CENTER);
    fill(0);
    text(this.letter, this.x, this.y);
  }
}

function createHintScreenBoundaries() {
  let buffer = width / 15;

  hintScreenX = width / 2;
  hintScreenY = height * 0.3;
  hintScreenW = width - width / 5;
  hintScreenH = height - (3 * height) / 4;

  hintLeft = hintScreenX - hintScreenW / 2 + buffer;
  hintTop = hintScreenY - hintScreenH / 2 + buffer;
}

function hintText() {
  fill(0);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(width / 15);
  textH = textAscent() + textDescent();
  let txtTopBuffer = 0.75;
  text("Need some help?", hintScreenX, hintTop);
}

class getHintButton {
  constructor() {
    this.x = hintScreenX;
    this.w = width * 0.4;
    this.h = height * 0.1;
    this.y = hintScreenY + hintScreenH * 0.1;
    this.txt = "Get Hint";
    this.colour = blueC;
    this.pressed = false;
  }

  show() {
    if (this.pressed) {
      navigator.vibrate(1);
      this.colour = darkblueC;
    } else {
      this.colour = blueC;
    }

    if (!hintRevealed) {
      noStroke();
      rectMode(CENTER);
      fill(darkblueC);
      rect(this.x + shadowSize, this.y + shadowSize, this.w, this.h, 20);
      fill(this.colour);
      rect(this.x, this.y, this.w, this.h, 20);
      fill(255);
      textSize(width / 12);
      textAlign(CENTER, CENTER);
      let textX = this.x;
      let textY = this.y;
      text(this.txt, textX, textY);
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
        hintRevealed = true;
      }, 100);
    }

    setTimeout(() => {
      this.pressed = false;
    }, 100);
  }
}

function checkHint() {
  if (blocks.length > 0) {
    hintScreenShowing = true;
  }

  for (let b of blocks) {
    if (b.LMatch > -1 || b.DMatch > -1) {
      hintScreenShowing = false;
    }
  }
}

function getHintLetter() {
  if (!hintChosen) {
    let hintIndex = floor(random(target.length));
    hint = target[hintIndex];
    hintChosen = true;
    hintTime = millis();
  }
}
