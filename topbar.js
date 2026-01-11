let topBarH;
let hButtonTopBar;
let dButtonTopBar;
let hoButton;

function drawTopBar() {
  rectMode(CORNER);
  noStroke();
  fill(255);
  rect(0, 0, width, topBarH);

  hButtonTopBar.show();
  dButtonTopBar.show();
  hoButton.update();
}

function setUpTopBar() {
  titleTextTopBar();

  let r = buttonW / 16;
  hButtonTopBar = new helpButton(width * 0.85, topBarH - r * 2, r);
  dButtonTopBar = new dataButton(width * 0.95, topBarH - r * 2, r);
}

function titleTextTopBar() {
  for (let i = 0; i < title.length; i++) {
    titleTextBlocksTopBar.push(new TitleBlockTopBar(i, title[i]));
  }
}

class TitleBlockTopBar {
  constructor(colNo, letter) {
    let cols = 15;
    this.w = floor(width / cols);
    this.x = this.w / 2 + floor(colNo * this.w);
    this.h = this.w;
    this.random = random(-3, 3);
    this.y = (topBarH - this.h) / 2 + this.random;
    this.startY = (topBarH - this.h) / 2;
    this.letter = letter;
    this.rand = random(1);
  }

  show() {
    noStroke();
    let colour;
    if (this.rand < 0.15) {
      colour = pinkC;
    } else if (this.rand < 0.25) {
      colour = greyC;
    } else {
      colour = blueC;
    }

    fill(colour);
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
