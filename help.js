let helpScreenX, helpScreenY, helpScreenW, helpScreenH;
let helpBlocks = [];
let helpLeft, helpTop;
let heightDivider = 25;
let toptxtY = 2;
let exampletxtY = 5.5;
let exampleblockY = 7;
let adjacenttxtY = 11.5;
let adjacentblockY = 13;
let notadjacenttxtY = 15.5;
let notadjacentblockY = 17;
let notintargettxtY = 19.5;
let notintargetblockY = 21;
let longtextsize;


function setupHelpscreen() {
  createHelpScreenBoundaries();
  makeHelpTargetBlocks();
  makeHelpAdjacentBlocks();
  makeHelpNotAdjacentBlocks();
  makeHelpNotTargetBlocks();
}



class exitButton {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = buttonW / 15;
    this.txt = "X";
    this.colour = greyC;
    this.pressed = false;
  }

  show() {
    fill(this.colour);
    noStroke();
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
        helpScreenShowing = false;
      }, 100);
    }

    setTimeout(() => {
      this.pressed = false;
    }, 100);
  }
}

function helpScreen() {
  fill(255);
  rectMode(CENTER);
  stroke(greyC);
  strokeWeight(4);
  rect(helpScreenX, helpScreenY, helpScreenW, helpScreenH);
  backgroundRectangles();

  helpTopText();
  helpExampleTarget();
  helpAdjacentText();
  helpNotAdjacentText();
  helpNotTargetText();

  for (let b of helpBlocks) {
    b.show();
  }

  drawMatch1();
  drawMatch2();
  drawMatch3();

  let buffer = width / 20;
  let exButtonX = helpScreenX + helpScreenW / 2 - buffer;
  let exButtonY = helpScreenY - helpScreenH / 2 + buffer;
  exButton = new exitButton(exButtonX, exButtonY);
  exButton.show();
}

class HelpBlock {
  constructor(x, y, letter, bc, tc) {
    let cols = 10;
    this.w = floor(width / cols);
    let colNo = floor(random(cols));
    this.x = x;
    this.y = y;
    this.h = this.w;
    this.letter = letter;
    this.blockCol = bc;
    this.textCol = tc;
  }

  show() {
    noStroke();
    fill(this.blockCol);
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h, 5);
    noStroke();
    fill(0);
    textSize(16);
    textAlign(CENTER, CENTER);
    fill(this.textCol);
    text(this.letter, this.x, this.y);
  }
}

function createHelpScreenBoundaries() {
  let buffer = width / 15;
  

  helpScreenX = width / 2;
  helpScreenY = height / 2;
  helpScreenW = width - width / 5;
  helpScreenH = height - height / 3;
  
  helpLeft = width / 2 - (helpScreenW) / 2 + buffer;
  helpTop = height / 2 - (helpScreenH) / 2 + buffer;
  
  longtxtsize = width/35;
}

function helpTopText() {
  fill(0);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(width / 15);
  textH = textAscent() + textDescent();
  let txtTopBuffer = 0.75;
  text(
    "Guess the 5 letter target!",
    helpScreenX,
    helpTop + (toptxtY / heightDivider) * helpScreenH
  );
  // text("in 10 attempts", helpScreenX, helpTop + (2 / heightDivider) * helpScreenH);
}

function helpExampleTarget() {
  fill(blueC);
  textAlign(LEFT, CENTER);
  textSize(width / 22);
  let txtTopBuffer = 0.75;
  textH = textAscent() + textDescent();
  text(
    "Example Target:",
    helpScreenX - helpScreenW / 2 + width / 20,
    helpTop + (exampletxtY / heightDivider) * helpScreenH
  );
}

function makeHelpTargetBlocks() {
  let word = ["H", "E", "A", "R", "T"];
  let blockCol = blueC;
  let textCol = color(255);
  let y = helpTop + (exampleblockY / heightDivider) * helpScreenH;

  for (let i = 0; i < 5; i++) {
    helpBlocks[i] = new HelpBlock(
      ((i + 2) * width) / 8,
      y,
      word[i],
      blockCol,
      textCol
    );
  }
}

function helpAdjacentText() {
  fill(greenC);
  textAlign(CENTER, CENTER);
  textSize(longtxtsize);
  let txtTopBuffer = 0.75;
  textH = textAscent() + textDescent();
  text(
    "Adjacent letters in guess ARE ADJACENT in target",
    width / 2,
    helpTop + (adjacenttxtY / heightDivider) * helpScreenH
  );
}

function makeHelpAdjacentBlocks() {
  let y = helpTop + (adjacentblockY / heightDivider) * helpScreenH;

  let word = ["G", "R", "A", "P", "E"];
  let blockCol = color(255);

  helpBlocks.push(
    new HelpBlock(((0 + 2) * width) / 8, y, word[0], color(greyC), color(0))
  );

  helpBlocks.push(
    new HelpBlock(((1 + 2) * width) / 8, y, word[1], blockCol, color(pinkC))
  );

  helpBlocks.push(
    new HelpBlock(((2 + 2) * width) / 8, y, word[2], blockCol, color(pinkC))
  );

  helpBlocks.push(
    new HelpBlock(((3 + 2) * width) / 8, y, word[3], color(greyC), color(0))
  );

  helpBlocks.push(
    new HelpBlock(((4 + 2) * width) / 8, y, word[4], blockCol, color(0))
  );
}

function helpNotAdjacentText() {
  fill(yellowC);
  textAlign(CENTER, CENTER);
  textSize(longtxtsize);
  let txtTopBuffer = 0.75;
  textH = textAscent() + textDescent();
  text(
    "Adjacent letters in guess are NOT ADJACENT in target",
    width / 2,
    helpTop + (notadjacenttxtY / heightDivider) * helpScreenH
  );
}

function makeHelpNotAdjacentBlocks() {
  let y = helpTop + (notadjacentblockY / heightDivider) * helpScreenH;

  let word = ["B", "E", "R", "R", "Y"];
  let blockCol = color(255);

  helpBlocks.push(
    new HelpBlock(((0 + 2) * width) / 8, y, word[0], greyC, color(0))
  );

  helpBlocks.push(
    new HelpBlock(((1 + 2) * width) / 8, y, word[1], blockCol, color(pinkC))
  );

  helpBlocks.push(
    new HelpBlock(((2 + 2) * width) / 8, y, word[2], blockCol, color(pinkC))
  );

  helpBlocks.push(
    new HelpBlock(((3 + 2) * width) / 8, y, word[3], blockCol, color(0))
  );

  helpBlocks.push(
    new HelpBlock(((4 + 2) * width) / 8, y, word[4], blockCol, color(0))
  );
}

function helpNotTargetText() {
  fill(greyC);
  textAlign(CENTER, CENTER);
  textSize(longtxtsize);
  let txtTopBuffer = 0.75;
  textH = textAscent() + textDescent();
  text(
    "NOT in target",
    width / 2,
    helpTop + (notintargettxtY / heightDivider) * helpScreenH
  );
}

function makeHelpNotTargetBlocks() {
  let y = helpTop + (notintargetblockY / heightDivider) * helpScreenH;

  let word = ["P", "E", "A", "C", "H"];
  let blockCol = color(255);

  helpBlocks.push(
    new HelpBlock(((0 + 2) * width) / 8, y, word[0], greyC, color(0))
  );

  helpBlocks.push(
    new HelpBlock(((1 + 2) * width) / 8, y, word[1], blockCol, color(pinkC))
  );

  helpBlocks.push(
    new HelpBlock(((2 + 2) * width) / 8, y, word[2], blockCol, color(pinkC))
  );

  helpBlocks.push(
    new HelpBlock(((3 + 2) * width) / 8, y, word[3], greyC, color(0))
  );

  helpBlocks.push(
    new HelpBlock(((4 + 2) * width) / 8, y, word[4], blockCol, color(0))
  );
}

function drawMatch1() {
  //GRAPE: R <-> A
  let c1 = color(255);
  let c2 = greenC;
  let cols = 10;
  let w = floor(width / cols);
  let d = w / 3;
  let x = width / 2 - w / 2 - w / 8;
  let y = helpTop + (adjacentblockY / heightDivider) * helpScreenH;
  noStroke();
  for (let i = 0; i < d; i++) {
    let index = map(i, 0, d, 0, 1);
    let c = lerpColor(c1, c2, index);
    fill(c);
    rect(x - d + i, y, 1, d);
  }

  for (let i = 0; i < d; i++) {
    let index = map(i, 0, d, 0, 1);
    let c = lerpColor(c2, c1, index);
    fill(c);
    rect(x + i, y, 1, d);
  }
}

function drawMatch2() {
  //BERRY: E <-> R
  let c1 = color(255);
  let c2 = yellowC;
  let cols = 10;
  let w = floor(width / cols);
  let d = w / 3;
  let x = width / 2 - w / 2 - w / 8;
  let y = helpTop + (notadjacentblockY / heightDivider) * helpScreenH;
  noStroke();
  for (let i = 0; i < d; i++) {
    let index = map(i, 0, d, 0, 1);
    let c = lerpColor(c1, c2, index);
    fill(c);
    rect(x - d + i, y, 1, d);
  }

  for (let i = 0; i < d; i++) {
    let index = map(i, 0, d, 0, 1);
    let c = lerpColor(c2, c1, index);
    fill(c);
    rect(x + i, y, 1, d);
  }
}

function drawMatch3() {
  //PEACH: E <-> A
  let c1 = color(255);
  let c2 = greenC;
  let cols = 10;
  let w = floor(width / cols);
  let d = w / 3;
  let x = width / 2 - w / 2 - w / 8;
  let y = helpTop + (notintargetblockY / heightDivider) * helpScreenH;
  noStroke();
  for (let i = 0; i < d; i++) {
    let index = map(i, 0, d, 0, 1);
    let c = lerpColor(c1, c2, index);
    fill(c);
    rect(x - d + i, y, 1, d);
  }

  for (let i = 0; i < d; i++) {
    let index = map(i, 0, d, 0, 1);
    let c = lerpColor(c2, c1, index);
    fill(c);
    rect(x + i, y, 1, d);
  }
}

function backgroundRectangles() {
  rectMode(CENTER);
  noStroke();
  fill(lightblueC);
  let cols = 10;
  let h = floor(width / cols);
  h += h/5;
  //BLOCKS1
  rect(
    width / 2,
    helpTop + (adjacentblockY / heightDivider) * helpScreenH,
    helpScreenW - 4,
    h
  );
  //BLOCKS2
  rect(
    width / 2,
    helpTop + (notadjacentblockY / heightDivider) * helpScreenH,
    helpScreenW - 4,
    h
  );
  //BLOCKS3
  rect(
    width / 2,
    helpTop + (notintargetblockY / heightDivider) * helpScreenH,
    helpScreenW - 4,
    h
  );
}
