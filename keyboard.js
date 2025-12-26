class letterKey {
  constructor(x, y, index) {
    this.x = x;
    this.y = y;
    this.w = keyW;
    this.h = keyH;
    this.index = index;
    let keyboardLetters = "QWERTYUIOPASDFGHJKLZXCVBNM";
    this.letter = keyboardLetters.charAt(this.index);
    this.colour = undefined;
    this.state = "default";
    this.pressed = false;
  }

  show() {
    if (gamestate == "playing") {
      if (!this.pressed && incorrectLetters.includes(this.letter)) {
        this.state = "incorrect";
        this.colour = greyC;
      } else if (!this.pressed && correctLetters.includes(this.letter)) {
        this.state = "correct";
        this.colour = pinkC;
      } else if (!this.pressed && correctLetters.includes(this.letter)) {
        this.state = "winning";
        this.colour = blueC;
      } else {
        this.colour = lightblueC;
      }

      if (this.pressed) {
        // navigator.vibrate(1);
        if (this.state == "default") {
          this.colour = color(131, 204, 230);
        } else if (this.state == "correct") {
          this.colour = color(229, 90, 162);
        } else if (this.state == "incorrect") {
          this.colour = color(55, 51, 54);
        }
      }

      fill(this.colour);
      noStroke();
      rectMode(CORNER);
      rect(this.x, this.y, this.w, this.h, 5);
      fill(0);
      textSize(16);
      textAlign(CENTER, CENTER);
      let textX = this.x + this.w / 2;
      let textY = this.y + this.h / 2;
      text(this.letter, textX, textY);
    }
  }

  keyPressed() {
    if (
      mouseX > this.x &&
      mouseX < this.x + this.w &&
      mouseY > this.y &&
      mouseY < this.y + this.h
    ) {
      if (inputArr.length < 5) {
        inputArr.push(this.letter);
      }

      this.pressed = true;
    }

    setTimeout(() => {
      this.pressed = false;
    }, 100);
  }
}

class functionKey {
  constructor(x, y, txt) {
    this.x = x;
    this.y = y;
    this.w = 1.5 * keyW;
    this.h = keyH;
    this.txt = txt;
    this.colour = lightblueC;
  }

  show() {
    if (this.pressed) {
      navigator.vibrate(1);
      this.colour = color(36, 142, 181);
    } else {
      this.colour = color(70, 179, 219);
    }

    fill(this.colour);
    noStroke();
    rectMode(CORNER);
    rect(this.x, this.y, this.w, this.h, 5);
    fill(0);
    textSize(16);
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
      if (this.txt == "Enter") {
        setTimeout(() => {
          newGuess();
          checkIfWon();
          checkIfLost();
        }, 100);
      } else if ((this.txt = "Del")) {
        inputArr.splice(inputArr.length - 1, 1);
      }

      this.pressed = true;
    }
    setTimeout(() => {
      this.pressed = false;
    }, 100);
  }
}

function makeKeyboard() {
  keyW = floor(width / 12);
  keyH = floor((5 * height) / 81);
  let keyboardGap = height / 12;
  keyboardTop = (2 * height) / 3 + (5 * height) / 81; // + 2*buttonH;

  //FUNCTION BUTTONS

  let enterX = width / 12 + width / 15 + (7.1 * (width - width / 75)) / 10;
  let enterY = keyboardTop + 2 * keyboardGap;
  functionKeys.push(new functionKey(enterX, enterY, "Enter"));
  let delX = keyW / 5;
  let delY = keyboardTop + 2 * keyboardGap;
  functionKeys.push(new functionKey(delX, delY, "Del"));

  let j = 0;
  let rowAmt = 10;
  for (i = 0; i < rowAmt; i++) {
    letterKeys.push(
      new letterKey(keyW / 5 + i * (keyW + keyW / 5), keyboardTop, i + 10 * j)
    );
  }
  j++;
  rowAmt = 9;
  for (i = 0; i < rowAmt; i++) {
    letterKeys.push(
      new letterKey(
        0.75 * keyW + keyW / 5 + i * (keyW + keyW / 5),
        keyboardTop + j * keyboardGap,
        i + (rowAmt + 1) * j
      )
    );
  }
  j++;
  rowAmt = 7;
  for (i = 0; i < rowAmt; i++) {
    letterKeys.push(
      new letterKey(
        1.7 * keyW + keyW / 5 + i * (keyW + keyW / 5),
        keyboardTop + j * keyboardGap,
        i + 1 + (rowAmt + 2) * j
      )
    );
  }
}


