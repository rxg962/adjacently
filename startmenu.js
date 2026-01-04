let titleImg;
let shadowSize;

function gameStartMenu() {
  startmenuButtons.push(
    new startMenuButton(
      dailytxt,
      width / 2 - buttonW / 2,
      height * 0.3,
      // floor(((2 * height) / 3) * (2 / 7)),
      buttonW,
      buttonH
    )
  );

  startmenuButtons.push(
    new startMenuButton(
      infinitetxt,
      width / 2 - buttonW / 2,
      height * 0.5,
      // floor(((2 * height) / 3) * (6 / 7)),
      buttonW,
      buttonH
    )
  );

  let rectThickness = buttonH / 6;
  let rectTRStart = width / 2 + width / 4;
  let rectBLEnd = width / 2 - width / 4;
  let rectSideLength = (width - buttonW) / 2;
  let rectUMStart = height / 3 + buttonH / 2;
  let rectLMStart = (2 * height) / 3 - buttonH / 2;
  let rectMidLength = height / 2 - (height / 3 + buttonH / 2);
  let c1 = color(255);
  let c2 = blueC;

  //TOP HALF RECTANGLE JOINING BUTTONS
  for (let i = 0; i < rectMidLength; i++) {
    let index = map(i, 0, rectMidLength, 0, 0.4);
    let c = lerpColor(c1, c2, index);
    fill(c);
    rectMode(CORNER);
    rect(width / 2 - rectThickness, rectUMStart + i, rectThickness * 2, 1);
  }

  //BOTTOM HALF RECTANGLE JOINING BUTTONS
  for (let i = 0; i < rectMidLength; i++) {
    let index = map(i, 0, rectMidLength, 0.6, 1);
    let c = lerpColor(c2, c1, index);
    fill(c);
    rectMode(CORNER);
    rect(width / 2 - rectThickness, height / 2 + i, rectThickness * 2, 1);
  }

  //RIGHT TOP RIGHT RECTANGLE
  for (let i = 0; i < rectSideLength; i++) {
    let index = map(i, 0, rectSideLength, 0, 0.4);
    let c = lerpColor(c1, c2, index);
    fill(c);
    rectMode(CORNER);
    rect(rectTRStart + i, height / 3 - rectThickness, 1, rectThickness * 2);
  }

  //BOTTOM LEFT RIGHT RECTANGLE
  for (let i = 0; i < rectSideLength; i++) {
    let index = map(i, 0, rectSideLength, 0.6, 1);
    let c = lerpColor(c2, c1, index);
    fill(c);
    rectMode(CORNER);
    rect(i, (2 * height) / 3 - rectThickness, 1, rectThickness * 2);
  }

  hButton = new helpButton(width / 3, height * 0.8 + buttonW / 8, buttonW / 8);
  dButton = new dataButton(
    (2 * width) / 3,
    height * 0.8 + buttonW / 8,
    buttonW / 8
  );
}

function fallingBlock() {
  if (frameCount % 60 === 0 && fallingBlocks.length < 200) {
    fallingBlocks.push(new FallingBlock());
  }

  for (b of fallingBlocks) {
    b.show();
    b.update();
  }
}

class startMenuButton {
  constructor(txt, x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = buttonW;
    this.h = buttonH;
    this.txt = txt;
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

    noStroke();
    rectMode(CORNER);
    fill(darkblueC);
    rect(this.x + shadowSize, this.y + shadowSize, this.w, this.h, 20);
    fill(this.colour);
    rect(this.x, this.y, this.w, this.h, 20);
    fill(255);
    textSize(width / 8);
    textAlign(CENTER, CENTER);
    let textX = this.x + this.w / 2;
    let textY = this.y + this.h / 2;
    text(this.txt, textX, textY);
  }

  keyPressed() {
    if (
      mouseX > this.x &&
      mouseX < this.x + this.w &&
      mouseY > this.y &&
      mouseY < this.y + this.h
    ) {
      if (this.txt == "Daily") {
        this.pressed = true;

        setTimeout(async () => {
          targetType = dailytxt;

          await getTarget();
          gamestate = "playing";
          await getTodaysBoard();
        }, 100);
      }

      if (this.txt == "Infinite") {
        this.pressed = true;
        setTimeout(() => {
          targetType = infinitetxt;
          getTarget();
          gamestate = "playing";
        }, 100);
      }
    }

    setTimeout(() => {
      this.pressed = false;
    }, 100);
  }
}

class helpButton {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.txt = "?";
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
          helpScreenShowing = true;
        }, 100);
      }

      setTimeout(() => {
        this.pressed = false;
      }, 100);
    }
}

function titleTextStartMenu() {
  for (let i = 0; i < title.length; i++) {
    titleTextBlocksStartMenu.push(new TitleBlockStartMenu(i, title[i]));
  }
}

class TitleBlockStartMenu {
  constructor(colNo, letter) {
    let cols = 12;
    this.w = floor(width / cols);
    this.x = this.w + floor(colNo * this.w);
    this.random = random(-10, 10);
    this.y = height * 0.1 + this.random;
    this.h = this.w;
    this.letter = letter;
  }

  show() {
    noStroke();
    fill(blueC);
    rectMode(CORNER);
    rect(this.x, this.y, this.w, this.h, 5);
    noStroke();
    fill(255);
    textSize(16);
    textAlign(CENTER, CENTER);
    text(this.letter, this.x + this.w / 2, this.y + this.h / 2);
  }
}
