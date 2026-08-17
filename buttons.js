// class dataButton {
//   constructor(x, y, r) {
//     this.x = x;
//     this.y = y;
//     this.r = r;
//     this.txt = "!";
//     this.colour = undefined;
//     this.pressed = false;
//   }

//   show() {
//     if (this.pressed) {
//       navigator.vibrate(1);
//       this.colour = darkblueC;
//     } else {
//       this.colour = blueC;
//     }

//     if (this.r > width / 20) {
//       noStroke();
//       fill(darkblueC);
//       circle(this.x + shadowSize / 2, this.y + shadowSize / 2, this.r * 2);
//     }

//     fill(this.colour);
//     circle(this.x, this.y, this.r * 2);
//     fill(255);
//     textSize(this.r);
//     textAlign(CENTER, CENTER);
//     text(this.txt, this.x, this.y);
//   }

//   keyPressed() {
//     if (
//       mouseX > this.x - this.r &&
//       mouseX < this.x + this.r &&
//       mouseY > this.y - this.r &&
//       mouseY < this.y + this.r
//     ) {
//       this.pressed = true;

//       setTimeout(async () => {
//         await getData();
//         dataScreenShowing = true;
//       }, 100);
//     }

//     setTimeout(() => {
//       this.pressed = false;
//     }, 100);
//   }
// }

// class helpButton {
//   constructor(x, y, r) {
//     this.x = x;
//     this.y = y;
//     this.r = r;
//     this.txt = "?";
//     this.colour = undefined;
//     this.pressed = false;
//   }

//   show() {
//     if (this.pressed) {
//       navigator.vibrate(1);
//       this.colour = darkblueC;
//     } else {
//       this.colour = blueC;
//     }

//     if (this.r > width / 20) {
//       noStroke();
//       fill(darkblueC);
//       circle(this.x + shadowSize / 2, this.y + shadowSize / 2, this.r * 2);
//     }

//     fill(this.colour);
//     circle(this.x, this.y, this.r * 2);
//     fill(255);
//     textSize(this.r);
//     textAlign(CENTER, CENTER);
//     text(this.txt, this.x, this.y);
//   }

//   keyPressed() {
//     if (
//       mouseX > this.x - this.r &&
//       mouseX < this.x + this.r &&
//       mouseY > this.y - this.r &&
//       mouseY < this.y + this.r
//     ) {
//       this.pressed = true;

//       setTimeout(() => {
//         helpScreenShowing = true;
//       }, 100);
//     }

//     setTimeout(() => {
//       this.pressed = false;
//     }, 100);
//   }
// }

// class exitButton {
//   constructor(x, y) {
//     this.x = x;
//     this.y = y;
//     this.r = buttonW / 15;
//     this.txt = "X";
//     this.colour = greyC;
//     this.pressed = false;
//   }

//   show() {
//     fill(this.colour);
//     noStroke();
//     circle(this.x, this.y, this.r * 2);
//     fill(255);
//     textSize(this.r);
//     textAlign(CENTER, CENTER);
//     text(this.txt, this.x, this.y);
//   }

//   keyPressed() {
//     if (
//       mouseX > this.x - this.r &&
//       mouseX < this.x + this.r &&
//       mouseY > this.y - this.r &&
//       mouseY < this.y + this.r
//     ) {
//       this.pressed = true;
//       setTimeout(() => {
//         helpScreenShowing = false;
//         hintScreenShowing = false;
//         hintScreenShown = true;
//         dataScreenShowing = false;
//         shareScreenShowing = false;
//         if (shareTxtDiv) {
//           shareTxtDiv.remove();
//         }
//         shareTxtDiv = null;
//       }, 100);
//     }

//     setTimeout(() => {
//       this.pressed = false;
//     }, 100);
//   }
// }

// class getHintButton {
//   constructor() {
//     this.x = hintScreenX;
//     this.w = width * 0.4;
//     this.h = height * 0.1;
//     this.y = hintScreenY + hintScreenH * 0.1;
//     this.txt = "Get Hint";
//     this.colour = blueC;
//     this.pressed = false;
//   }

//   show() {
//     if (this.pressed) {
//       navigator.vibrate(1);
//       this.colour = darkblueC;
//     } else {
//       this.colour = blueC;
//     }

//     if (!hintRevealed) {
//       noStroke();
//       rectMode(CENTER);
//       fill(darkblueC);
//       rect(this.x + shadowSize, this.y + shadowSize, this.w, this.h, 20);
//       fill(this.colour);
//       rect(this.x, this.y, this.w, this.h, 20);
//       fill(255);
//       textSize(width / 12);
//       textAlign(CENTER, CENTER);
//       let textX = this.x;
//       let textY = this.y;
//       text(this.txt, textX, textY);
//     }
//   }

//   keyPressed() {
//     if (
//       mouseX > this.x - this.w / 2 &&
//       mouseX < this.x + this.w / 2 &&
//       mouseY > this.y - this.h / 2 &&
//       mouseY < this.y + this.h / 2 &&
//       !this.falling
//     ) {
//       this.pressed = true;
//       setTimeout(() => {
//         hintRevealed = true;
//       }, 100);
//     }

//     setTimeout(() => {
//       this.pressed = false;
//     }, 100);
//   }
// }

// class playAgainButton {
//   constructor() {
//     this.x = (3 * width) / 4;
//     this.targetY = height - (height - dividingLineH) / 2;
//     this.w = width * 0.4;
//     this.h = height * 0.2;
//     this.y = height + this.h;
//     this.txt = "Play\nAgain";
//     this.colour = undefined;
//     this.pressed = false;
//     this.acc = 0.2;
//     this.speed = 8;
//     this.falling = true;
//   }

//   show() {
//     if (gamestate == "won" || (gamestate == "played" && data.wl == "won")) {
//       if (this.pressed) {
//         navigator.vibrate(1);
//         this.colour = darkpinkC;
//       } else {
//         this.colour = pinkC;
//       }
//     }

//     if (gamestate == "lost" || (gamestate == "played" && data.wl == "lost")) {
//       if (this.pressed) {
//         navigator.vibrate(1);
//         this.colour = darkredC;
//       } else {
//         this.colour = redC;
//       }
//     }

//     noStroke();
//     rectMode(CENTER);

//     if (gamestate == "won") {
//       fill(darkpinkC);
//     } else if (gamestate == "lost") {
//       fill(darkredC);
//     }

//     rect(this.x + shadowSize, this.y + shadowSize, this.w, this.h, 20);
//     fill(this.colour);
//     rect(this.x, this.y, this.w, this.h, 20);
//     fill(255);
//     textSize(width / 12);
//     textAlign(CENTER, CENTER);
//     let textX = this.x;
//     let textY = this.y;
//     text(this.txt, textX, textY);
//   }

//   update() {
//     if (this.y > this.targetY) {
//       this.speed += this.acc;
//       this.y -= this.speed;
//     } else {
//       this.y = this.targetY;
//       this.falling = false;
//     }
//   }

//   keyPressed() {
//     if (
//       mouseX > this.x - this.w / 2 &&
//       mouseX < this.x + this.w / 2 &&
//       mouseY > this.y - this.h / 2 &&
//       mouseY < this.y + this.h / 2 &&
//       !this.falling
//     ) {
//       this.pressed = true;
//       setTimeout(() => {
//         restart();
//         gamestate = "startmenu";
//       }, 100);
//     }

//     setTimeout(() => {
//       this.pressed = false;
//     }, 100);
//   }
// }

// class resetDataButton {
//   constructor() {
//     this.x = helpScreenX;
//     this.w = width * 0.2;
//     this.h = height * 0.1;
//     let bottom = helpScreenY + helpScreenH / 2;
//     this.y = bottom - this.h;
//     this.txt = "Reset";
//     this.colour = blueC;
//     this.pressed = false;
//   }

//   show() {
//     if (this.pressed) {
//       navigator.vibrate(1);
//       this.colour = darkblueC;
//     } else {
//       this.colour = blueC;
//     }

//     noStroke();
//     rectMode(CENTER);
//     fill(darkblueC);
//     rect(this.x + shadowSize, this.y + shadowSize, this.w, this.h, 20);
//     fill(this.colour);
//     rect(this.x, this.y, this.w, this.h, 20);
//     fill(255);
//     textSize(width / 15);
//     textAlign(CENTER, CENTER);
//     let textX = this.x;
//     let textY = this.y;
//     text(this.txt, textX, textY);
//   }

//   keyPressed() {
//     if (
//       mouseX > this.x - this.w / 2 &&
//       mouseX < this.x + this.w / 2 &&
//       mouseY > this.y - this.h / 2 &&
//       mouseY < this.y + this.h / 2
//     ) {
//       this.pressed = true;
//       setTimeout(async () => {
//         await removeItem("data");
//         await getData();
//       }, 100);
//     }

//     setTimeout(() => {
//       this.pressed = false;
//     }, 100);
//   }
// }

// class startMenuButton {
//   constructor(txt, x, y, w, h) {
//     this.x = x;
//     this.y = y;
//     this.w = buttonW;
//     this.h = buttonH;
//     this.txt = txt;
//     this.colour = undefined;
//     this.pressed = false;
//   }

//   show() {
//     if (this.pressed) {
//       navigator.vibrate(1);
//       this.colour = darkblueC;
//     } else {
//       this.colour = blueC;
//     }

//     noStroke();
//     rectMode(CORNER);
//     fill(darkblueC);
//     rect(this.x + shadowSize, this.y + shadowSize, this.w, this.h, 20);
//     fill(this.colour);
//     rect(this.x, this.y, this.w, this.h, 20);
//     fill(255);
//     textSize(width / 8);
//     textAlign(CENTER, CENTER);
//     let textX = this.x + this.w / 2;
//     let textY = this.y + this.h / 2;
//     text(this.txt, textX, textY);
//   }

//   keyPressed() {
//     if (
//       mouseX > this.x &&
//       mouseX < this.x + this.w &&
//       mouseY > this.y &&
//       mouseY < this.y + this.h
//     ) {
//       if (this.txt == "Daily") {
//         this.pressed = true;

//         setTimeout(async () => {
//           targetType = dailytxt;
//           gamestate = "playing";
//           await getTarget();
//           await getTodaysBoard();
//         }, 100);
//       }

//       if (this.txt == "Infinite") {
//         this.pressed = true;
//         setTimeout(async () => {
//           targetType = infinitetxt;
//           gamestate = "playing";
//           await getTarget();
//         }, 100);
//       }
//     }

//     setTimeout(() => {
//       this.pressed = false;
//     }, 100);
//   }
// }

// class shareButton {
//   constructor() {
//     this.x = (3 * width) / 4;
//     this.targetY = height - (height - dividingLineH) / 2;
//     this.w = width * 0.4;
//     this.h = height * 0.2;
//     this.y = height + this.h;
//     this.txt = "Share";
//     this.colour = undefined;
//     this.pressed = false;
//     this.acc = 0.2;
//     this.speed = 8;
//     this.falling = true;
//   }

//   show() {
//     if (gamestate == "won" || (gamestate == "played" && data.wl == "won")) {
//       if (this.pressed) {
//         navigator.vibrate(1);
//         this.colour = darkpinkC;
//       } else {
//         this.colour = pinkC;
//       }
//     }

//     if (gamestate == "lost" || (gamestate == "played" && data.wl == "lost")) {
//       if (this.pressed) {
//         navigator.vibrate(1);
//         this.colour = darkredC;
//       } else {
//         this.colour = redC;
//       }
//     }

//     noStroke();
//     rectMode(CENTER);

//     if (gamestate == "won") {
//       fill(darkpinkC);
//     } else if (gamestate == "lost") {
//       fill(darkredC);
//     }

//     rect(this.x + shadowSize, this.y + shadowSize, this.w, this.h, 20);
//     fill(this.colour);
//     rect(this.x, this.y, this.w, this.h, 20);
//     fill(255);
//     textSize(width / 12);
//     textAlign(CENTER, CENTER);
//     let textX = this.x;
//     let textY = this.y;
//     text(this.txt, textX, textY);
//   }

//   update() {
//     if (this.y > this.targetY) {
//       this.speed += this.acc;
//       this.y -= this.speed;
//     } else {
//       this.y = this.targetY;
//       this.falling = false;
//     }
//   }

//   keyPressed() {
//     if (
//       mouseX > this.x - this.w / 2 &&
//       mouseX < this.x + this.w / 2 &&
//       mouseY > this.y - this.h / 2 &&
//       mouseY < this.y + this.h / 2 &&
//       !this.falling
//     ) {
//       this.pressed = true;
//       setTimeout(() => {
//         shareScreenShowing = true;
//         shareText();
//       }, 100);
//     }

//     setTimeout(() => {
//       this.pressed = false;
//     }, 100);
//   }
// }

// class copyButton {
//   constructor() {
//     this.x = hintScreenX;
//     this.w = width * 0.2;
//     this.h = height * 0.08;
//     this.y = shareTop + shareScreenH - this.h * 1.4;
//     this.txt = "Copy";
//     this.colour = blueC;
//     this.pressed = false;
//   }

//   show() {
//     if (this.pressed) {
//       navigator.vibrate(1);
//       this.colour = darkblueC;
//     } else {
//       this.colour = blueC;
//     }

//     if (!hintRevealed) {
//       noStroke();
//       rectMode(CENTER);
//       fill(darkblueC);
//       rect(this.x + shadowSize, this.y + shadowSize, this.w, this.h, 20);
//       fill(this.colour);
//       rect(this.x, this.y, this.w, this.h, 20);
//       fill(255);
//       textSize(width / 15);
//       textAlign(CENTER, CENTER);
//       let textX = this.x;
//       let textY = this.y;
//       text(this.txt, textX, textY);
//     }
//   }

//   keyPressed() {
//     if (
//       mouseX > this.x - this.w / 2 &&
//       mouseX < this.x + this.w / 2 &&
//       mouseY > this.y - this.h / 2 &&
//       mouseY < this.y + this.h / 2 &&
//       !this.falling
//     ) {
//       this.pressed = true;
//       setTimeout(() => {
//         copyShareText();
//       }, 100);
//     }

//     setTimeout(() => {
//       this.pressed = false;
//     }, 100);
//   }
// }

// class homeButton {
//   constructor() {
//     let cols = 15;
//     this.w = floor(width / cols) * 11;
//     this.x = this.w / 2;
//     this.h = topBarH;
//     this.y = topBarH / 2;
//     this.txt = "Reset";
//     this.colour = blueC;
//     this.pressed = false;
//   }

//   update() {
//     if (this.pressed) {
//       navigator.vibrate(1);
//       this.colour = darkblueC;
//     } else {
//       this.colour = blueC;
//     }

//     //     noStroke();
//     //     rectMode(CENTER);
//     //     fill(this.colour);
//     //     rect(this.x, this.y, this.w, this.h, 20);
//   }

//   keyPressed() {
//     if (
//       mouseX > this.x - this.w / 2 &&
//       mouseX < this.x + this.w / 2 &&
//       mouseY > this.y - this.h / 2 &&
//       mouseY < this.y + this.h / 2
//     ) {
//       this.pressed = true;
//       setTimeout(async () => {
//         restart();
//         gamestate = "startmenu";
//       }, 100);
//     }

//     setTimeout(() => {
//       this.pressed = false;
//     }, 100);
//   }
// }



/// UP IS GOOD, DOWN IS TEST

// ==========================================
// CENTRAL TOUCH & MOUSE HANDLERS
// ==========================================

function touchStarted() {
  let tx = (typeof touches !== 'undefined' && touches.length > 0) ? touches[0].x : mouseX;
  let ty = (typeof touches !== 'undefined' && touches.length > 0) ? touches[0].y : mouseY;

  try {
    screenInteract(tx, ty);
  } catch (err) {
    console.error("Safely caught touch error:", err);
  }
}

function mousePressed() {
  // Prevent double-triggering on devices firing touchStarted first
  if (typeof touches !== 'undefined' && touches.length > 0) {
    return;
  }

  try {
    screenInteract(mouseX, mouseY);
  } catch (err) {
    console.error("Safely caught mouse error:", err);
  }
}

// ==========================================
// CRASH-PROOF SCREEN INTERACTION ROUTER
// ==========================================

function screenInteract(px, py) {
  let x = (px !== undefined) ? px : mouseX;
  let y = (py !== undefined) ? py : mouseY;

  // 1. START MENU
  if (gamestate === "startmenu" && !helpScreenShowing && !dataScreenShowing) {
    if (Array.isArray(startmenuButtons)) {
      for (let b of startmenuButtons) {
        b?.keyPressed?.(x, y);
      }
    }
    hButton?.keyPressed?.(x, y);
    dButton?.keyPressed?.(x, y);
  }

  // 2. OVERLAY SCREENS
  if (helpScreenShowing || hintScreenShowing || dataScreenShowing || shareScreenShowing) {
    exButton?.keyPressed?.(x, y);
  }

  if (shareScreenShowing) {
    cButton?.keyPressed?.(x, y);
  }

  if (hintScreenShowing) {
    hintButton?.keyPressed?.(x, y);
  }

  // 3. PLAYING STATE
  if (gamestate === "playing" && !helpScreenShowing && !dataScreenShowing) {
    if (Array.isArray(letterKeys)) {
      for (let k of letterKeys) {
        k?.keyPressed?.(x, y);
      }
    }
    if (Array.isArray(functionKeys)) {
      for (let k of functionKeys) {
        k?.keyPressed?.(x, y);
      }
    }
  }

  // 4. REPLAY / PLAY AGAIN (INFINITE MODE)
  if (
    (typeof infinitetxt !== 'undefined' && targetType === infinitetxt && gamestate === "won") ||
    gamestate === "lost" ||
    (gamestate === "played" && playAgButton && !playAgButton.falling)
  ) {
    if (!shareScreenShowing && !dataScreenShowing && !helpScreenShowing) {
      playAgButton?.keyPressed?.(x, y);
    }
  }

  // 5. SUBMIT / SHARE (DAILY MODE)
  if (
    (typeof dailytxt !== 'undefined' && targetType === dailytxt && gamestate === "won") ||
    gamestate === "lost" ||
    (gamestate === "played" && sButton && !sButton.falling)
  ) {
    if (!shareScreenShowing && !dataScreenShowing && !helpScreenShowing) {
      sButton?.keyPressed?.(x, y);
    }
  }

  // 6. TOP BAR BUTTONS
  if (
    gamestate !== "startmenu" &&
    !helpScreenShowing &&
    !dataScreenShowing &&
    !shareScreenShowing
  ) {
    hButtonTopBar?.keyPressed?.(x, y);
    dButtonTopBar?.keyPressed?.(x, y);
    hoButton?.keyPressed?.(x, y);
  }
}

// Helper function to safely trigger vibration on supported browsers
function triggerVibrate(ms = 1) {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    try {
      navigator.vibrate(ms);
    } catch (e) {
      // Ignore vibration failures silently
    }
  }
}

// ==========================================
// BUTTON CLASSES
// ==========================================

class dataButton {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.txt = "!";
    this.colour = undefined;
    this.pressed = false;
  }

  show() {
    if (this.pressed) {
      triggerVibrate(1);
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

  keyPressed(px, py) {
    let mx = (px !== undefined) ? px : mouseX;
    let my = (py !== undefined) ? py : mouseY;

    if (dist(mx, my, this.x, this.y) < this.r) {
      this.pressed = true;

      setTimeout(async () => {
        try {
          await getData();
          dataScreenShowing = true;
        } catch (e) {
          console.error("Error in dataButton action:", e);
        }
      }, 100);
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
      triggerVibrate(1);
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

  keyPressed(px, py) {
    let mx = (px !== undefined) ? px : mouseX;
    let my = (py !== undefined) ? py : mouseY;

    if (dist(mx, my, this.x, this.y) < this.r) {
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

  keyPressed(px, py) {
    let mx = (px !== undefined) ? px : mouseX;
    let my = (py !== undefined) ? py : mouseY;

    if (dist(mx, my, this.x, this.y) < this.r) {
      this.pressed = true;
      setTimeout(() => {
        helpScreenShowing = false;
        hintScreenShowing = false;
        hintScreenShown = true;
        dataScreenShowing = false;
        shareScreenShowing = false;
        if (typeof shareTxtDiv !== 'undefined' && shareTxtDiv) {
          shareTxtDiv.remove();
        }
        shareTxtDiv = null;
      }, 100);
    }

    setTimeout(() => {
      this.pressed = false;
    }, 100);
  }
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
      triggerVibrate(1);
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

  keyPressed(px, py) {
    let mx = (px !== undefined) ? px : mouseX;
    let my = (py !== undefined) ? py : mouseY;

    if (
      mx > this.x - this.w / 2 &&
      mx < this.x + this.w / 2 &&
      my > this.y - this.h / 2 &&
      my < this.y + this.h / 2 &&
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
    if (gamestate == "won" || (gamestate == "played" && data?.wl == "won")) {
      if (this.pressed) {
        triggerVibrate(1);
        this.colour = darkpinkC;
      } else {
        this.colour = pinkC;
      }
    }

    if (gamestate == "lost" || (gamestate == "played" && data?.wl == "lost")) {
      if (this.pressed) {
        triggerVibrate(1);
        this.colour = darkredC;
      } else {
        this.colour = redC;
      }
    }

    noStroke();
    rectMode(CENTER);

    if (gamestate == "won") {
      fill(darkpinkC);
    } else if (gamestate == "lost") {
      fill(darkredC);
    }

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

  update() {
    if (this.y > this.targetY) {
      this.speed += this.acc;
      this.y -= this.speed;
    } else {
      this.y = this.targetY;
      this.falling = false;
    }
  }

  keyPressed(px, py) {
    let mx = (px !== undefined) ? px : mouseX;
    let my = (py !== undefined) ? py : mouseY;

    if (
      mx > this.x - this.w / 2 &&
      mx < this.x + this.w / 2 &&
      my > this.y - this.h / 2 &&
      my < this.y + this.h / 2 &&
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

class resetDataButton {
  constructor() {
    this.x = helpScreenX;
    this.w = width * 0.2;
    this.h = height * 0.1;
    let bottom = helpScreenY + helpScreenH / 2;
    this.y = bottom - this.h;
    this.txt = "Reset";
    this.colour = blueC;
    this.pressed = false;
  }

  show() {
    if (this.pressed) {
      triggerVibrate(1);
      this.colour = darkblueC;
    } else {
      this.colour = blueC;
    }

    noStroke();
    rectMode(CENTER);
    fill(darkblueC);
    rect(this.x + shadowSize, this.y + shadowSize, this.w, this.h, 20);
    fill(this.colour);
    rect(this.x, this.y, this.w, this.h, 20);
    fill(255);
    textSize(width / 15);
    textAlign(CENTER, CENTER);
    let textX = this.x;
    let textY = this.y;
    text(this.txt, textX, textY);
  }

  keyPressed(px, py) {
    let mx = (px !== undefined) ? px : mouseX;
    let my = (py !== undefined) ? py : mouseY;

    if (
      mx > this.x - this.w / 2 &&
      mx < this.x + this.w / 2 &&
      my > this.y - this.h / 2 &&
      my < this.y + this.h / 2
    ) {
      this.pressed = true;
      setTimeout(async () => {
        try {
          await removeItem("data");
          await getData();
        } catch (e) {
          console.error("Error in resetDataButton action:", e);
        }
      }, 100);
    }

    setTimeout(() => {
      this.pressed = false;
    }, 100);
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
      triggerVibrate(1);
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

  keyPressed(px, py) {
    let mx = (px !== undefined) ? px : mouseX;
    let my = (py !== undefined) ? py : mouseY;

    if (
      mx > this.x &&
      mx < this.x + this.w &&
      my > this.y &&
      my < this.y + this.h
    ) {
      if (this.txt === "Daily") {
        this.pressed = true;
        setTimeout(async () => {
          try {
            targetType = dailytxt;
            gamestate = "playing";
            await getTarget();
            await getTodaysBoard();
          } catch (e) {
            console.error("Error starting Daily mode:", e);
          }
        }, 100);
      }

      if (this.txt === "Infinite") {
        this.pressed = true;
        setTimeout(async () => {
          try {
            targetType = infinitetxt;
            gamestate = "playing";
            await getTarget();
          } catch (e) {
            console.error("Error starting Infinite mode:", e);
          }
        }, 100);
      }
    }

    setTimeout(() => {
      this.pressed = false;
    }, 100);
  }
}

class shareButton {
  constructor() {
    this.x = (3 * width) / 4;
    this.targetY = height - (height - dividingLineH) / 2;
    this.w = width * 0.4;
    this.h = height * 0.2;
    this.y = height + this.h;
    this.txt = "Share";
    this.colour = undefined;
    this.pressed = false;
    this.acc = 0.2;
    this.speed = 8;
    this.falling = true;
  }

  show() {
    if (gamestate == "won" || (gamestate == "played" && data?.wl == "won")) {
      if (this.pressed) {
        triggerVibrate(1);
        this.colour = darkpinkC;
      } else {
        this.colour = pinkC;
      }
    }

    if (gamestate == "lost" || (gamestate == "played" && data?.wl == "lost")) {
      if (this.pressed) {
        triggerVibrate(1);
        this.colour = darkredC;
      } else {
        this.colour = redC;
      }
    }

    noStroke();
    rectMode(CENTER);

    if (gamestate == "won") {
      fill(darkpinkC);
    } else if (gamestate == "lost") {
      fill(darkredC);
    }

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

  update() {
    if (this.y > this.targetY) {
      this.speed += this.acc;
      this.y -= this.speed;
    } else {
      this.y = this.targetY;
      this.falling = false;
    }
  }

  keyPressed(px, py) {
    let mx = (px !== undefined) ? px : mouseX;
    let my = (py !== undefined) ? py : mouseY;

    if (
      mx > this.x - this.w / 2 &&
      mx < this.x + this.w / 2 &&
      my > this.y - this.h / 2 &&
      my < this.y + this.h / 2 &&
      !this.falling
    ) {
      this.pressed = true;
      setTimeout(() => {
        shareScreenShowing = true;
        if (typeof shareText === 'function') shareText();
      }, 100);
    }

    setTimeout(() => {
      this.pressed = false;
    }, 100);
  }
}

class copyButton {
  constructor() {
    this.x = hintScreenX;
    this.w = width * 0.2;
    this.h = height * 0.08;
    this.y = shareTop + shareScreenH - this.h * 1.4;
    this.txt = "Copy";
    this.colour = blueC;
    this.pressed = false;
  }

  show() {
    if (this.pressed) {
      triggerVibrate(1);
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
      textSize(width / 15);
      textAlign(CENTER, CENTER);
      let textX = this.x;
      let textY = this.y;
      text(this.txt, textX, textY);
    }
  }

  keyPressed(px, py) {
    let mx = (px !== undefined) ? px : mouseX;
    let my = (py !== undefined) ? py : mouseY;

    if (
      mx > this.x - this.w / 2 &&
      mx < this.x + this.w / 2 &&
      my > this.y - this.h / 2 &&
      my < this.y + this.h / 2 &&
      !this.falling
    ) {
      this.pressed = true;
      setTimeout(() => {
        if (typeof copyShareText === 'function') copyShareText();
      }, 100);
    }

    setTimeout(() => {
      this.pressed = false;
    }, 100);
  }
}

class homeButton {
  constructor() {
    let cols = 15;
    this.w = floor(width / cols) * 11;
    this.x = this.w / 2;
    this.h = topBarH;
    this.y = topBarH / 2;
    this.txt = "Reset";
    this.colour = blueC;
    this.pressed = false;
  }

  update() {
    if (this.pressed) {
      triggerVibrate(1);
      this.colour = darkblueC;
    } else {
      this.colour = blueC;
    }
  }

  keyPressed(px, py) {
    let mx = (px !== undefined) ? px : mouseX;
    let my = (py !== undefined) ? py : mouseY;

    if (
      mx > this.x - this.w / 2 &&
      mx < this.x + this.w / 2 &&
      my > this.y - this.h / 2 &&
      my < this.y + this.h / 2
    ) {
      this.pressed = true;
      setTimeout(async () => {
        try {
          restart();
          gamestate = "startmenu";
        } catch (e) {
          console.error("Error in homeButton action:", e);
        }
      }, 100);
    }

    setTimeout(() => {
      this.pressed = false;
    }, 100);
  }
}

