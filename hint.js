let hintScreenX, hintScreenY, hintScreenW, hintScreenH;
let hintBlocks = [];
let hintLeft, hintTop;
let hintButton;
let hintRevealed = false;
let hint1;
let hintChosen = false;
let hintTime = 0, hint2Time = 0;
let showKeyboardHint = false, showKeyboard2Hint = false;
let hintScreenShown = false;
let hint1Index;
let hint2Revealed = false,hint2, hint2Chosen = false, hint2Index, hint2ScreenShown = false, hint2Button;


function setupHintScreen() {
  createHintScreenBoundaries();
  hintButton = new getHintButton();
  hint2Button = new getHint2Button();
  
  // Assign to existing global exButton (no 'let' keyword)
  let buffer = width / 20;
  let exButtonX = hintScreenX + hintScreenW / 2 - buffer;
  let exButtonY = hintScreenY - hintScreenH / 2 + buffer;
  
  if (typeof exitButton === 'function') {
    exButton = new exitButton(exButtonX, exButtonY);
  }
}

function hintScreen() {
  rectMode(CENTER);
  fill(255);
  rect(hintScreenX, hintScreenY, hintScreenW, hintScreenH, 20);

  hintText();

  if (!hintRevealed) {
    if (hintButton) hintButton.show();
  }

  if (hintRevealed) {
    getHintLetter();

    // 1-second slot machine reveal animation
    if (millis() - hintTime < 1000) {
      let randomLetter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(floor(random(26)));
      if (typeof alphabet !== 'undefined' && alphabet.length > 0) {
        randomLetter = alphabet.charAt(floor(random(alphabet.length)));
      }

      let animBlock = new HintBlock(
        hintScreenX,
        hintScreenY + hintScreenH * 0.1,
        randomLetter,
        typeof blueC !== 'undefined' ? blueC : color(70, 179, 219)
      );
      animBlock.show();

    } else {
      let hintLetterBlock = new HintBlock(
        hintScreenX,
        hintScreenY + hintScreenH * 0.1,
        hint1 ? hint1 : "?",
        typeof pinkC !== 'undefined' ? pinkC : color(229, 90, 162)
      );
      hintLetterBlock.show();
      showKeyboardHint = true;

      setTimeout(() => {
        if (typeof hintScreenShowing !== 'undefined') {
          hintScreenShowing = false;
        }
      }, 1000);
    }
  }

  // Draw exit button if initialized
  if (typeof exButton !== 'undefined' && exButton) {
    exButton.show();
  }
}

function hint2Screen() {
  rectMode(CENTER);
  fill(255);
  rect(hintScreenX, hintScreenY, hintScreenW, hintScreenH, 20);

  hintText();

  if (!hint2Revealed) {
    if (hint2Button) hint2Button.show();
  }

  if (hint2Revealed) {
    getHint2Letter();

    // 1-second slot machine reveal animation
    if (millis() - hint2Time < 1000) {
      let randomLetter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(floor(random(26)));
      if (typeof alphabet !== 'undefined' && alphabet.length > 0) {
        randomLetter = alphabet.charAt(floor(random(alphabet.length)));
      }

      let animBlock = new HintBlock(
        hintScreenX,
        hintScreenY + hintScreenH * 0.1,
        randomLetter,
        typeof blueC !== 'undefined' ? blueC : color(70, 179, 219)
      );
      animBlock.show();

    } else {
      let hintLetterBlock = new HintBlock(
        hintScreenX,
        hintScreenY + hintScreenH * 0.1,
        hint2 ? hint2 : "?",
        typeof pinkC !== 'undefined' ? pinkC : color(229, 90, 162)
      );
      hintLetterBlock.show();
      showKeyboardHint = true;

      setTimeout(() => {
        if (typeof hint2ScreenShowing !== 'undefined') {
          hint2ScreenShowing = false;
        }
      }, 1000);
    }
  }

  // Draw exit button if initialized
  if (typeof exButton !== 'undefined' && exButton) {
    exButton.show();
  }
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
  text("Need some help?", hintScreenX, hintTop);
}

function checkHint() {
  if (typeof blocks !== 'undefined' && blocks.length > 0) {
    hintScreenShowing = true;
    for (let b of blocks) {
      if (b.LMatch > -1 || b.DMatch > -1) {
        hintScreenShowing = false;
      }
    }
  }
}

function checkHint2() {
  if (typeof blocks !== 'undefined' && blocks.length > 0) {
    hint2ScreenShowing = true;
    for (let b of blocks) {
      if (b.LMatch > -1 || b.DMatch > -1) {
        hint2ScreenShowing = false;
      }
    }
  }
}

function getHintLetter() {
 if (!hintChosen) {
    let targetArray;

    if (typeof target !== 'undefined') {
      targetArray = target;
    } else if (typeof targetWord !== 'undefined') {
      targetArray = targetWord;
    } else {
      targetArray = "";
    }
    
    if (targetArray.length > 0) {
      let hintIndex = floor(random(targetArray.length));
      hint1Index = hintIndex;
      hint1 = targetArray[hintIndex];
    } else {
      hint1 = "A";
    }
    
    hintChosen = true;
    hintTime = millis();
  }
}

function getHint2Letter() {
 if (!hint2Chosen) {
    let targetArray;

    if (typeof target !== 'undefined') {
      targetArray = target;
    } else if (typeof targetWord !== 'undefined') {
      targetArray = targetWord;
    } else {
      targetArray = "";
    }
    
    if (targetArray.length > 0) {
      let hintIndex = floor(random(targetArray.length));
      if(hintRevealed){
        while(hintIndex == hint1Index){
        hintIndex = floor(random(targetArray.length));
        }
      } else{
      hint2Index = hintIndex;
      hint2 = targetArray[hintIndex];
      }
      
      hint2Index = hintIndex;
      hint2 = targetArray[hintIndex];
    } else {
      hint2 = "A";
    }
    
    hint2Chosen = true;
    hint2Time = millis();
  }
}

