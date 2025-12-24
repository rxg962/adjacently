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
