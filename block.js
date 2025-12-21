class Block {
  constructor(x, y, index, letter) {
    this.x = x;
    this.y = -h - random(15, 50);
    this.w = w;
    this.h = h;
    this.finishY = y;
    this.LMatch = -1;
    this.UMatch = -1;
    this.RMatch = -1;
    this.DMatch = -1;
    this.letter = letter;
    this.colour = color(255);
    this.index = index;
    this.matched = false;
    this.incorrectLetter = false;
    this.exploded = false;

    // let colRange = floor(255/4);
    // this.impactCol = color(random(floor(colRange/2), colRange));
    // this.impact1Col = color(random(colRange, colRange*2));
    // this.impact3Col = color(random(colRange*2, floor(colRange*2.5)));
    // this.impact2Col = color(random(floor(colRange*2.5), colRange*3));

    this.impactCol = color(113, 10, 12);
    this.impact1Col = color(170, 14, 16);
    this.impact3Col = color(208, 17, 20);
    this.impact2Col = color(225, 20, 23);
    this.impact5Col = color(243, 104, 106);
    this.impact4Col = color(245, 163, 168);

    this.angleUD = random(-PI / 10, PI / 10);
    this.angleR = random(PI/50, PI / 8);
    this.angleL = random(-PI / 50, -PI/8);
  }

  show() {
    let lastRowStart = blocks.length - 5;

    if (gamestate == "won" && this.index >= lastRowStart) {
      fill(pinkC);
    } else if (
      this.isNotAllowed() &&
      !this.matched &&
      !correctLetters.includes(this.letter)
    ) {
      fill(greyC);
    } else {
      fill(255);
    }

    if (gamestate == "lost") {
      fill(this.impact4Col);
    }

    if (this.exploded) {
      fill(this.impactCol);
    }

    let explosionC = this.explosionColours();
    if (explosionC) {
      fill(explosionC);
    }

    noStroke();
    rectMode(CORNER);
    let d = 3;

    rect(this.x + d, this.y + d, this.w - 2 * d, this.h - 2 * d, 15);

    this.showMatch();

    //TEXTCOLOUR
    textSize(min(w, h) / 2);
    if (gamestate == "won" && this.index >= lastRowStart) {
      fill(255);
    } else if (
      target.includes(this.letter) &&
      (this.LMatch > -1 ||
        this.UMatch > -1 ||
        this.RMatch > -1 ||
        this.DMatch > -1)
    ) {
      fill(pinkC);
    } else {
      fill(0);
    }

    if (gamestate == "lost"){
      fill(0);
    }
    
     noStroke();
      textAlign(CENTER, CENTER);
    
    if(bombExploded == true) {
      push();
      translate(this.x + w / 2, this.y + h / 2);
      rotate(this.explosionAngle());
      text(this.letter, 0, 0);
      pop();
    } else {
      noStroke();
      textAlign(CENTER, CENTER);
      text(this.letter, this.x + w / 2, this.y + h / 2);
    }
  }

  update() {
    let speed = 10;
    if (this.y < this.finishY - speed) {
      this.y += speed;
    } else {
      this.y = this.finishY;
    }
  }

  showMatch() {
    if (gamestate == "playing") {
      if (this.LMatch > -1) this.showMatchL();
      if (this.DMatch > -1) this.showMatchD();
    }
  }

  showMatchL() {
    let c1 = color(255);
    let c2;

    for (let j = 0; j < 6; j++) {
      for (let i = 0; i < 5; i++) {
        if (this.LMatch == 0) {
          c2 = yellowC;
        } else if (this.LMatch == 1) {
          c2 = greenC;
        }
      }
    }

    if (this.y == this.finishY && gamestate == "playing") {
      noStroke();
      let d = this.w / 7;
      for (let i = 0; i < d; i++) {
        let index = map(i, 0, d, 0, 1);
        let c = lerpColor(c1, c2, index);
        fill(c);
        rect(this.x - d + i, this.y + (h / 2 - d / 2), 1, d);
      }

      for (let i = 0; i < d; i++) {
        let index = map(i, 0, d, 0, 1);
        let c = lerpColor(c2, c1, index);
        fill(c);
        rect(this.x + i, this.y + (h / 2 - d / 2), 1, d);
      }
    }
  }

  showMatchD() {
    let c1 = color(255);
    let c2;

    for (let j = 0; j < 6; j++) {
      for (let i = 0; i < 5; i++) {
        if (this.DMatch == 0) {
          c2 = yellowC;
        } else if (this.DMatch == 1) {
          c2 = greenC;
        }
      }
    }

    if (this.y == this.finishY && gamestate == "playing") {
      noStroke();
      let d = this.w / 7;
      for (let i = 0; i < d; i++) {
        let index = map(i, 0, d, 0, 1);
        let c = lerpColor(c1, c2, index);
        fill(c);
        rect(this.x + (w / 2 - d / 2), this.y + h - d + i, d, 1);
      }

      for (let i = 0; i < d; i++) {
        let index = map(i, 0, d, 0, 1);
        let c = lerpColor(c2, c1, index);
        fill(c);
        rect(this.x + (w / 2 - d / 2), this.y + h + i, d, 1);
      }
    }
  }

  checkNeighbours() {
    let letterToFind = this.letter;
    let letterToFindIndex = target.indexOf(letterToFind);
    let targetCopy = target.slice();
    if (letterToFindIndex > -1) {
      targetCopy.splice(letterToFindIndex, 1);
    }

    let index = this.index;

    if (
      target.includes(letters[index]) &&
      targetCopy.includes(letters[index + 1]) &&
      letters[index + 1] &&
      index % 5 != 4
    ) {
      this.matched = true;
      if (this.isOneAway(letters[index + 1])) {
        this.RMatch = 1;
      } else {
        this.RMatch = 0;
      }
    }

    if (
      target.includes(letters[index]) &&
      targetCopy.includes(letters[index - 1]) &&
      letters[index - 1] &&
      index % 5 != 0
    ) {
      this.matched = true;
      if (this.isOneAway(letters[index - 1])) {
        this.LMatch = 1;
      } else {
        this.LMatch = 0;
      }
    }

    if (
      target.includes(letters[index]) &&
      targetCopy.includes(letters[index + 5]) &&
      letters[index + 5]
    ) {
      this.matched = true;
      if (this.isOneAway(letters[index + 5])) {
        this.UMatch = 1;
      } else {
        this.UMatch = 0;
      }
    }

    if (
      target.includes(letters[index]) &&
      targetCopy.includes(letters[index - 5]) &&
      letters[index - 5]
    ) {
      this.matched = true;
      if (this.isOneAway(letters[index - 5])) {
        this.DMatch = 1;
      } else {
        this.DMatch = 0;
      }
    }
  }

  isOneAway(other) {
    let indicesThis = [];
    target.forEach((l, i) => {
      if (l == this.letter) indicesThis.push(i);
    });

    let indicesOther = [];
    target.forEach((l, i) => {
      if (l == other) indicesOther.push(i);
    });

    for (let i of indicesThis) {
      for (let j of indicesOther) {
        if (abs(i - j) == 1) {
          return true;
        }
      }
    }
    return false;
  }

  isNotAllowed(other) {
    let index = this.index;

    if (blocks[index + 1]) {
      if (
        blocks[index].matched == false &&
        blocks[index + 1].matched == true &&
        index % 5 != 4
      ) {
        this.incorrectLetter = true;
      }
    }
    if (blocks[index - 1]) {
      if (
        blocks[index].matched == false &&
        blocks[index - 1].matched == true &&
        index % 5 != 0
      ) {
        this.incorrectLetter = true;
      }
    }
    if (blocks[index + 5]) {
      if (blocks[index].matched == false && blocks[index + 5].matched == true) {
        this.incorrectLetter = true;
      }
    }
    if (blocks[index - 5]) {
      if (blocks[index].matched == false && blocks[index - 5].matched == true) {
        this.incorrectLetter = true;
      }
    }

    return this.incorrectLetter;
  }

  explosionColours() {
    let i = this.index;

    //HORIZONTAL

    if (blocks[i - 1] && blocks[i].y == blocks[i - 1].y) {
      if (blocks[i - 1].exploded) {
        return this.impact1Col;
      }
    }

    if (blocks[i + 1] && blocks[i].y == blocks[i + 1].y) {
      if (blocks[i + 1].exploded) {
        return this.impact1Col;
      }
    }
    if (blocks[i - 2] && blocks[i].y == blocks[i - 2].y) {
      if (blocks[i - 2].exploded) {
        return this.impact2Col;
      }
    }
    if (blocks[i + 2] && blocks[i].y == blocks[i + 2].y) {
      if (blocks[i + 2].exploded) {
        return this.impact2Col;
      }
    }

    //VERTICAL

    if (blocks[i - 5] && blocks[i].x == blocks[i - 5].x) {
      if (blocks[i - 5].exploded) {
        return this.impact1Col;
      }
    }

    if (blocks[i + 5] && blocks[i].x == blocks[i + 5].x) {
      if (blocks[i + 5].exploded) {
        return this.impact1Col;
      }
    }
    if (blocks[i - 10] && blocks[i].x == blocks[i - 10].x) {
      if (blocks[i - 10].exploded) {
        return this.impact2Col;
      }
    }
    if (blocks[i + 10] && blocks[i].x == blocks[i + 10].x) {
      if (blocks[i + 10].exploded) {
        return this.impact2Col;
      }
    }

    //DIAGONAL

    if (blocks[i + 6]) {
      if (blocks[i + 6].exploded && abs(blocks[i].y - blocks[i + 6].y) == h) {
        return this.impact3Col;
      }
    }

    if (blocks[i - 6]) {
      if (blocks[i - 6].exploded && abs(blocks[i].y - blocks[i - 6].y) == h) {
        return this.impact3Col;
      }
    }
    if (blocks[i + 4]) {
      if (blocks[i + 4].exploded && abs(blocks[i].y - blocks[i + 4].y) == h) {
        return this.impact3Col;
      }
    }
    if (blocks[i - 4] && abs(blocks[i].y - blocks[i - 4].y) == h) {
      if (blocks[i - 4].exploded) {
        return this.impact3Col;
      }
    }
    
    //OUTERRING

    if (blocks[i + 11]) {
      if (blocks[i + 11].exploded && abs(blocks[i].y - blocks[i + 11].y) == h*2) {
        return this.impact5Col;
      }
    }

    if (blocks[i - 11]) {
      if (blocks[i - 11].exploded && abs(blocks[i].y - blocks[i - 11].y) == h*2) {
        return this.impact5Col;
      }
    }
    
    if (blocks[i + 9]) {
      if (blocks[i + 9].exploded && abs(blocks[i].y - blocks[i + 9].y) == h*2) {
        return this.impact5Col;
      }
    }

    if (blocks[i - 9]) {
      if (blocks[i - 9].exploded && abs(blocks[i].y - blocks[i - 9].y) == h*2) {
        return this.impact5Col;
      }
    }
    
    if (blocks[i + 7]) {
      if (blocks[i + 7].exploded && abs(blocks[i].y - blocks[i + 7].y) == h) {
        return this.impact5Col;
      }
    }
    if (blocks[i - 7] && abs(blocks[i].y - blocks[i - 7].y) == h) {
      if (blocks[i - 7].exploded) {
        return this.impact5Col;
      }
    }
    
    if (blocks[i + 3]) {
      if (blocks[i + 3].exploded && abs(blocks[i].y - blocks[i + 3].y) == h) {
        return this.impact5Col;
      }
    }
    if (blocks[i - 3] && abs(blocks[i].y - blocks[i - 3].y) == h) {
      if (blocks[i - 3].exploded) {
        return this.impact5Col;
      }
    }
    
  }
  
  explosionAngle() {
    let i = this.index;

    //HORIZONTAL

    if (blocks[i - 1] && blocks[i].y == blocks[i - 1].y) {
      if (blocks[i - 1].exploded) {
        return this.angleR;
      }
    }

    if (blocks[i + 1] && blocks[i].y == blocks[i + 1].y) {
      if (blocks[i + 1].exploded) {
        return this.angleL;
      }
    }
    if (blocks[i - 2] && blocks[i].y == blocks[i - 2].y) {
      if (blocks[i - 2].exploded) {
        return this.angleR;
      }
    }
    if (blocks[i + 2] && blocks[i].y == blocks[i + 2].y) {
      if (blocks[i + 2].exploded) {
        return this.angleL;
      }
    }

    //VERTICAL

    if (blocks[i - 5] && blocks[i].x == blocks[i - 5].x) {
      if (blocks[i - 5].exploded) {
        return this.angleUD;
      }
    }

    if (blocks[i + 5] && blocks[i].x == blocks[i + 5].x) {
      if (blocks[i + 5].exploded) {
        return this.angleUD;
      }
    }
    if (blocks[i - 10] && blocks[i].x == blocks[i - 10].x) {
      if (blocks[i - 10].exploded) {
        return this.angleUD;
      }
    }
    if (blocks[i + 10] && blocks[i].x == blocks[i + 10].x) {
      if (blocks[i + 10].exploded) {
        return this.angleUD;
      }
    }

    //DIAGONAL

    if (blocks[i + 6]) {
      if (blocks[i + 6].exploded && abs(blocks[i].y - blocks[i + 6].y) == h) {
        return this.angleL;
      }
    }

    if (blocks[i - 6]) {
      if (blocks[i - 6].exploded && abs(blocks[i].y - blocks[i - 6].y) == h) {
        return this.angleR;
      }
    }
    if (blocks[i + 4]) {
      if (blocks[i + 4].exploded && abs(blocks[i].y - blocks[i + 4].y) == h) {
        return this.angleR;
      }
    }
    if (blocks[i - 4] && abs(blocks[i].y - blocks[i - 4].y) == h) {
      if (blocks[i - 4].exploded) {
        return this.angleL;
      }
    }
  }
  
}

function explodeBlocks() {
  let bomb = bombs[0];
  let bombX = bomb.pos.x;
  let bombY = bomb.pos.y;

  for (let b of blocks) {
    if (bombX > b.x && bombX < b.x + b.w && bombY > b.y && bombY < b.y + b.h) {
      b.exploded = true;
    }
  }
}
