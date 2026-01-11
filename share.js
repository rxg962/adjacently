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

  let sharetxtTop = shareTop + shareScreenH * 0.3;

  let line1 = "I just played ADJACENTLY and scored " + todaysScore + "!";

  let fireworkEmojistoShow = [];
  for (i = 0; i < todaysScore; i++) {
    fireworkEmojistoShow.push(fireworkEmojis[i]);
  }

  let fireworkString = fireworkEmojistoShow.join("");
  
   if (todaysScore == 0) {
    let line2 = "💣";
  } else {
    let line2 = fireworkString;
  }
  
  let line3 = "Play @ " + shareURL;

  shareTxtDiv = createDiv(line1 + "<br>" + line2 + "<br><br>" + line3);

  // Create new div
  // shareTxtDiv = createDiv(shareTxt);
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
  rectMode(CENTER);
  fill(255);
  rect(shareScreenX, shareScreenY, shareScreenW, shareScreenH, 20);

  textAlign(CENTER, CENTER);
  textSize(width / 8);
  let cornerbuffer = width / 10;
  let left = shareScreenX - shareScreenW / 2;
  let top = shareScreenY - shareScreenH / 2;
  fill(blueC);
  text("SHARE", shareScreenX, top + cornerbuffer);

  cButton.show();

  // shareText();

  let buffer = width / 20;
  let exButtonX = shareScreenX + shareScreenW / 2 - buffer;
  let exButtonY = shareScreenY - shareScreenH / 2 + buffer;
  exButton = new exitButton(exButtonX, exButtonY);
  exButton.show();
}

function copyShareText() {
  let temp = createElement(
    "textarea",
    shareTxtDiv.html().replace(/<br>/g, "\n")
  );
  temp.position(-9999, -9999); // hide off-screen
  temp.elt.select(); // select the text
  document.execCommand("copy"); // copy to clipboard
  temp.remove(); // remove temporary textarea
}
