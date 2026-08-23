
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
  await getData();

  // First line still drawn on canvas

  let sharetxtTop = shareTop + shareScreenH * 0.25;

  let line1;
  if (todaysScore == 1) {
    line1 = "I just scored " + todaysScore + " point playing ADJACENTLY!";
  } else if (todaysScore != 1) {
    line1 = "I just scored " + todaysScore + " points playing ADJACENTLY!";
  }

  let fireworkEmojistoShow = [];
  for (let i = 0; i < todaysScore; i++) {
    fireworkEmojistoShow.push(fireworkEmojis[i]);
  }

  let fireworkString = fireworkEmojistoShow.join("");

  let line2;
  if (todaysScore == 0) {
    line2 = "😭 💣 😭";
  } else {
    line2 = fireworkString;
  }

  let line3 = "Try to beat me: " + shareURL;

  shareTxtDiv = createDiv(line1 + "<br>" + line2 + "<br><br>" + line3);

  // Create new div
  shareTxtDiv.position(shareScreenX - width * 0.4, sharetxtTop); // adjust for alignment
  shareTxtDiv.style("width", width * 0.8 + "px"); // wrap nicely
  shareTxtDiv.style("color", "#000");
  shareTxtDiv.style("font-size", width / 28 + "px");
  shareTxtDiv.style("text-align", "center");
  shareTxtDiv.style("user-select", "text"); // make it selectable
  shareTxtDiv.style("background", "none"); // remove background
  shareTxtDiv.style("border", "none"); // remove any border
  shareTxtDiv.style("text-shadow", "none"); // remove shadows
  shareTxtDiv.style("font-weight", "normal"); // normal weight
  shareTxtDiv.style("padding", "0"); // remove extra padding
  shareTxtDiv.style("margin", "0"); // remove extra margin
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

  for (let b of shareTextBlocks) {
    b.show();
    b.update();
  }

  cButton.show();

  let buffer = width / 20;
  let exButtonX = shareScreenX + shareScreenW / 2 - buffer;
  let exButtonY = shareScreenY - shareScreenH / 2 + buffer;
  exButton = new exitButton(exButtonX, exButtonY);
  exButton.show();
}

async function copyShareText() {
  if (!shareTxtDiv) return;

  // Extract clean plain text and replace <br> with newlines
  let plainText = shareTxtDiv
    .html()
    .replace(/<br\s*[\/]?>/gi, "\n")
    .replace(/<[^>]+>/g, ""); // strip any remaining HTML tags

  // 1. Modern Clipboard API (Works on iOS Safari 13.4+ & Android Chrome/Firefox)
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(plainText);
      alert("Copied to clipboard!");
      return;
    } catch (err) {
      console.warn("Clipboard API failed, falling back...", err);
    }
  }

  // 2. Mobile Fallback (Works on older iOS Safari & Android browsers)
  let textArea = document.createElement("textarea");
  textArea.value = plainText;

  // Prevent auto-zoom and page jumping on mobile
  textArea.style.fontSize = "12pt";
  textArea.style.border = "0";
  textArea.style.padding = "0";
  textArea.style.margin = "0";
  textArea.style.position = "fixed";
  textArea.style.left = "-9999px";
  textArea.style.top = "0";
  textArea.setAttribute("readonly", "");

  document.body.appendChild(textArea);

  // Explicit focus and selection for mobile clipboards
  textArea.focus();
  textArea.select();
  textArea.setSelectionRange(0, textArea.value.length);

  try {
    let successful = document.execCommand("copy");
    if (successful) {
      alert("Copied to clipboard!");
    } else {
      alert("Failed to copy automatically.");
    }
  } catch (err) {
    alert("Copy not supported on this browser.");
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
  for (let i = 0; i < sharetitletxt.length; i++) {
    shareTextBlocks.push(new shareBlock(i, sharetitletxt[i]));
  }
}
