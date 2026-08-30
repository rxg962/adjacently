// let sButton;
// let shareScreenX, shareScreenY, shareScreenW, shareScreenH, shareLeft, shareTop;
// let shareScreenShowing = false;
// let shareTxtDiv;
// let cButton;
// let shareURL = "https://adjacently.xyz";
// let fireworkEmojis = [
//   "🎆",
//   "🎆",
//   "🎆",
//   "🎆",
//   "🎆",
//   "🎆",
//   "🎆",
//   "🎆",
//   "🎆",
//   "🎆",
// ];
// let sharetitletxt = ["S", "H", "A", "R", "E"];
// let shareTextBlocks = [];

// function setupShareScreen() {
//   createShareScreenBoundaries();
// }

// function createShareScreenBoundaries() {
//   let buffer = width / 15;

//   shareScreenX = width / 2;
//   shareScreenY = height / 2;
//   shareScreenW = width - width / 5;
//   shareScreenH = height * 0.4;

//   shareLeft = shareScreenX - shareScreenW / 2 + buffer;
//   shareTop = shareScreenY - shareScreenH / 2 + buffer;
// }

// async function shareText() {
//   await getData();

//   // First line still drawn on canvas

//   let sharetxtTop = shareTop + shareScreenH * 0.25;

//   let line1;
//   if (todaysScore == 1) {
//     line1 = "I just scored " + todaysScore + " point playing ADJACENTLY!";
//   } else if (todaysScore != 1) {
//     line1 = "I just scored " + todaysScore + " points playing ADJACENTLY!";
//   }
//   // let line1 = "I just played ADJACENTLY and scored " + todaysScore + "!";

//   let fireworkEmojistoShow = [];
//   for (i = 0; i < todaysScore; i++) {
//     fireworkEmojistoShow.push(fireworkEmojis[i]);
//   }

//   let fireworkString = fireworkEmojistoShow.join("");

//   let line2;
//   if (todaysScore == 0) {
//     line2 = "😭 💣 😭";
//   } else {
//     line2 = fireworkString;
//   }

//   let line3 = "Try to beat me: " + shareURL;

//   shareTxtDiv = createDiv(line1 + "<br>" + line2 + "<br><br>" + line3);

//   // Create new div
//   // shareTxtDiv = createDiv(shareTxt);
//   shareTxtDiv.position(shareScreenX - width * 0.4, sharetxtTop); // adjust for alignment
//   shareTxtDiv.style("width", width * 0.8 + "px"); // wrap nicely
//   shareTxtDiv.style("color", "#000");
//   shareTxtDiv.style("font-size", width / 28 + "px");
//   shareTxtDiv.style("text-align", "center");
//   shareTxtDiv.style("user-select", "text"); // make it selectable
//   shareTxtDiv.style("background", "none"); // remove background
//   shareTxtDiv.style("border", "none"); // remove any border
//   shareTxtDiv.style("text-shadow", "none"); // remove shadows
//   shareTxtDiv.style("font-weight", "normal"); // normal weight
//   shareTxtDiv.style("padding", "0"); // remove extra padding
//   shareTxtDiv.style("margin", "0"); // remove extra margin
// }

// function shareScreen() {
//   rectMode(CORNER);
//   fill(backgroundC);
//   rect(0, 0, width, height);

//   rectMode(CENTER);
//   fill(255);
//   rect(shareScreenX, shareScreenY, shareScreenW, shareScreenH, 20);

//   textAlign(CENTER, CENTER);
//   textSize(width / 8);
//   let cornerbuffer = width / 10;
//   let left = shareScreenX - shareScreenW / 2;
//   let top = shareScreenY - shareScreenH / 2;
//   fill(blueC);
//   // text("SHARE", shareScreenX, top + cornerbuffer);

//   for (let b of shareTextBlocks) {
//     b.show();
//     b.update();
//   }

//   cButton.show();

//   let buffer = width / 20;
//   let exButtonX = shareScreenX + shareScreenW / 2 - buffer;
//   let exButtonY = shareScreenY - shareScreenH / 2 + buffer;
//   exButton = new exitButton(exButtonX, exButtonY);
//   exButton.show();
// }

// function copyShareText() {
//   let temp = createElement(
//     "textarea",
//     shareTxtDiv.html().replace(/<br>/g, "\n")
//   );
//   temp.position(-9999, -9999); // hide off-screen
//   temp.elt.select(); // select the text
//   document.execCommand("copy"); // copy to clipboard
//   temp.remove(); // remove temporary textarea
// }

// class shareBlock {
//   constructor(colNo, letter) {
//     let cols = 12;
//     this.w = floor(width / cols);

//     let cornerbuffer = width / 14;
//     let left = shareScreenX - shareScreenW / 2;
//     let top = shareScreenY - shareScreenH / 2;
    
//     let totalW = this.w * sharetitletxt.length;

//     this.x = width/2 - totalW/2 + floor(colNo * this.w);
//     this.h = this.w;
//     this.random = random(-3, 3);
//     this.y = top + cornerbuffer + this.random;
//     this.startY = top + cornerbuffer;
//     this.letter = letter;
//     this.rand = random(1);
//   }

//   show() {
//     noStroke();
//     let colour;
//     if (this.rand < 0.15) {
//       colour = pinkC;
//     } else if (this.rand < 0.25) {
//       colour = greyC;
//     } else {
//       colour = blueC;
//     }

//     fill(colour);
//     rectMode(CORNER);
//     rect(this.x, this.y, this.w, this.h, 5);
//     noStroke();
//     fill(255);
//     textSize(width/20);
//     textAlign(CENTER, CENTER);
//     text(this.letter, this.x + this.w / 2, this.y + this.h / 2);
//   }

//   update() {
//     let offset = map(sin(this.random), -1, 1, -3, 3);
//     this.y = this.startY + offset;
//     this.random += random(0.03, 0.07);
//   }
// }

// function shareTextBlock() {
//   for (let i = 0; i < sharetitletxt.length; i++) {
//     shareTextBlocks.push(new shareBlock(i, sharetitletxt[i]));
//   }
// }


// UP WORKS, DOWN TEST

let sButton;
let shareScreenX, shareScreenY, shareScreenW, shareScreenH, shareLeft, shareTop;
let shareScreenShowing = false;
let shareTxtDiv;
let cButton;
let shareURL = "https://adjacently.xyz";
let fireworkEmojis = [
  "🎆",
  "🎆",
  "🎆",
  "🎆",
  "🎆",
  "🎆",
  "🎆",
  "🎆",
  "🎆",
  "🎆",
];
let sharetitletxt = ["S", "H", "A", "R", "E"];
let shareTextBlocks = [];

function setupShareScreen() {
  createShareScreenBoundaries();
  
  // Ensure animated blocks are created if array is empty
  if (shareTextBlocks.length === 0) {
    shareTextBlock();
  }
}

function createShareScreenBoundaries() {
  let buffer = width / 15;

  shareScreenX = width / 2;
  shareScreenY = height / 2;
  shareScreenW = width - width / 5;
  shareScreenH = height * 0.4;

  shareLeft = shareScreenX - shareScreenW / 2 + buffer;
  shareTop = shareScreenY - shareScreenH / 2 + buffer;
}

async function shareText() {
  // If shareTxtDiv already exists from a previous render, remove it to avoid duplicates
  if (shareTxtDiv) {
    shareTxtDiv.remove();
  }

  await getData();

  let sharetxtTop = shareTop + shareScreenH * 0.25;

  let line1 = (todaysScore === 1) 
    ? "I just scored " + todaysScore + " point playing ADJACENTLY!" 
    : "I just scored " + todaysScore + " points playing ADJACENTLY!";

  let fireworkEmojistoShow = [];
  for (let i = 0; i < todaysScore; i++) {
    fireworkEmojistoShow.push(fireworkEmojis[i] || "🎆");
  }

  let fireworkString = fireworkEmojistoShow.join("");

  let line2 = (todaysScore === 0) ? "😭 💣 😭" : fireworkString;
  let line3 = "Try to beat me: " + shareURL;

  shareTxtDiv = createDiv(line1 + "<br>" + line2 + "<br><br>" + line3);

  // Style and position DOM element
  shareTxtDiv.position(shareScreenX - width * 0.4, sharetxtTop);
  shareTxtDiv.style("width", width * 0.8 + "px");
  shareTxtDiv.style("color", "#000");
  shareTxtDiv.style("font-size", width / 28 + "px");
  shareTxtDiv.style("text-align", "center");
  shareTxtDiv.style("user-select", "text");
  shareTxtDiv.style("background", "none");
  shareTxtDiv.style("border", "none");
  shareTxtDiv.style("text-shadow", "none");
  shareTxtDiv.style("font-weight", "normal");
  shareTxtDiv.style("padding", "0");
  shareTxtDiv.style("margin", "0");
}

function shareScreen() {
  rectMode(CORNER);
  fill(backgroundC);
  rect(0, 0, width, height);

  rectMode(CENTER);
  fill(255);
  rect(shareScreenX, shareScreenY, shareScreenW, shareScreenH, 20);

  textAlign(CENTER, CENTER);
  textSize(width / 8);
  let cornerbuffer = width / 10;
  let left = shareScreenX - shareScreenW / 2;
  let top = shareScreenY - shareScreenH / 2;
  fill(blueC);

  // Render text blocks
  for (let b of shareTextBlocks) {
    if (b) {
      b.show();
      b.update();
    }
  }

  // Guard clause: Only attempt to show cButton if it exists
  if (cButton && typeof cButton.show === "function") {
    cButton.show();
  }

  // Render exit button
  let buffer = width / 20;
  let exButtonX = shareScreenX + shareScreenW / 2 - buffer;
  let exButtonY = shareScreenY - shareScreenH / 2 + buffer;
  exButton = new exitButton(exButtonX, exButtonY);
  if (exButton && typeof exButton.show === "function") {
    exButton.show();
  }
}

async function copyShareText() {
  if (!shareTxtDiv) return;

  // Extract clean plain text and replace <br> with newlines
  let plainText = shareTxtDiv
    .html()
    .replace(/<br\s*[\/]?>/gi, "\n")
    .replace(/<[^>]+>/g, "");

  // 1. Modern Clipboard API
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(plainText);
      return;
    } catch (err) {
      console.warn("Clipboard API failed, falling back...", err);
    }
  }

  // 2. Mobile Fallback
  let textArea = document.createElement("textarea");
  textArea.value = plainText;

  textArea.style.fontSize = "12pt";
  textArea.style.border = "0";
  textArea.style.padding = "0";
  textArea.style.margin = "0";
  textArea.style.position = "fixed";
  textArea.style.left = "-9999px";
  textArea.style.top = "0";
  textArea.setAttribute("readonly", "");

  document.body.appendChild(textArea);

  textArea.focus();
  textArea.select();
  textArea.setSelectionRange(0, textArea.value.length);

  try {
    document.execCommand("copy");
  } catch (err) {
    console.warn("Copy command failed", err);
  }

  document.body.removeChild(textArea);
}

class shareBlock {
  constructor(colNo, letter) {
    let cols = 12;
    this.w = floor(width / cols);

    let cornerbuffer = width / 14;
    let left = shareScreenX - shareScreenW / 2;
    let top = shareScreenY - shareScreenH / 2;

    let totalW = this.w * sharetitletxt.length;

    this.x = width / 2 - totalW / 2 + floor(colNo * this.w);
    this.h = this.w;
    this.random = random(-3, 3);
    this.y = top + cornerbuffer + this.random;
    this.startY = top + cornerbuffer;
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
    textSize(width / 20);
    textAlign(CENTER, CENTER);
    text(this.letter, this.x + this.w / 2, this.y + this.h / 2);
  }

  update() {
    let offset = map(sin(this.random), -1, 1, -3, 3);
    this.y = this.startY + offset;
    this.random += random(0.03, 0.07);
  }
}

function shareTextBlock() {
  shareTextBlocks = []; // Reset array before pushing to avoid stacking duplicates
  for (let i = 0; i < sharetitletxt.length; i++) {
    shareTextBlocks.push(new shareBlock(i, sharetitletxt[i]));
  }
}