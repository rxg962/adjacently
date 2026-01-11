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
    this.startY = height * 0.1;
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
  
    update(){ 
    let offset = map(sin(this.random), -1, 1, -3, 3);
    this.y = this.startY + offset;
    this.random += random(0.03,0.07);
  }
}

class FallingBlock {
  constructor() {
    let cols = 10;
    this.w = floor(width / cols);
    let colNo = floor(random(cols));
    this.x = floor(colNo * this.w);
    this.y = floor(-h - this.w);
    this.h = this.w;
    this.letter = alphabet.charAt(floor(random(alphabet.length)));
    this.falling = true;
    this.acc = 0.05;
    this.speed = 1;
    this.rand = random(1);
  }

  show() {
    noStroke();

    let colour;

    if (this.falling) {
      colour = color(255);
    } else {
      if (!this.falling) {
        if (this.rand < 0.15) {
          colour = pinkC;
        } else if (this.rand < 0.4) {
          colour = greyC;
        } else {
          colour = color(255);
        }
      }
    }

    fill(colour);
    rectMode(CORNER);
    rect(this.x, this.y, this.w, this.h, 5);
    noStroke();
    fill(0, 200);
    textSize(16);
    textAlign(CENTER, CENTER);
    text(this.letter, this.x + this.w / 2, this.y + this.h / 2);
  }

  update() {
    if (!this.touchingFloor() && !this.touchingBlock()) {
      if (this.falling) {
        this.speed += this.acc;
        this.y += this.speed;
      }
    }
  }

  touchingFloor() {
    if (this.y + this.h >= height) {
      this.y = height - this.h;
      this.falling = false;
      this.speed = 0;
      return true;
    }
    return false;
  }

  touchingBlock() {
    if (fallingBlocks.length > 1) {
      for (let o of fallingBlocks) {
        if (this != o && o.falling == false && o.col == this.col) {
          let verD = abs(this.y - o.y);
          let horD = abs(this.x - o.x);

          if (horD < this.w && verD < this.h) {
            this.y = o.y - this.h;
            this.falling = false;
            this.speed = 0;
            return true;
          }
        }
      }
    }
    return false;
  }
}