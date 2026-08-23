document.body.addEventListener("touchstart", function (_ev) {});
document.body.addEventListener("touchmove", function (_ev) {});
document.body.addEventListener("touchend", function (_ev) {});


async function setup() {
  gameWidth = 500;
  if (windowWidth < gameWidth) {
    gameWidth = windowWidth;
  }
  //let c = createCanvas(gameWidth, windowHeight - 75);
  let c = createCanvas(gameWidth, windowHeight);
  c.elt.style.touchAction = 'none';

  pixelDensity(window.devicePixelRatio);

  textFont("Outfit");

  await getWords();

  getColours();

  gameHeight = (2 * height) / 3;
  //gameHeight = height;
  topBarH = height / 15;
  playAreaTop = topBarH + (5 * height) / 162;
  playAreaBottom = gameHeight;
  playAreaHeight = playAreaBottom - playAreaTop;

  w = floor(gameWidth / 5);
  h = floor(playAreaHeight / totalGuesses);
  guessY = playAreaBottom - h;

  fallingBlocks.push(new FallingBlock());

  shadowSize = width / 80;

  makeKeyboard();

  buttonW = width / 2;
  buttonH = (1.75 * ((2 * height) / 3)) / 7;

  gamestate = "startmenu";
  gameStartMenu();

  dividingline();
  playAgButton = new playAgainButton();

  setupHelpScreen();

  setupHintScreen();

  setupShareScreen();

  sButton = new shareButton();

  setUpTopBar();

  titleTextStartMenu();

  rButton = new resetDataButton();

  cButton = new copyButton();

  hoButton = new homeButton();
  
  shareTextBlock();
  statsTextBlock();
}

function draw() {
  background(lightblueC);

  for (let b of blocks) {
    b.checkNeighbours();
    b.show();
    b.update();
  }

  for (let b of doneBlocks) {
    b.show();
    b.update();
  }

  dividingline();

  if (gamestate == "playing") {
    ghosttext();

    for (let k of letterKeys) {
      k.show();
    }
    for (let k of functionKeys) {
      k.show();
    }

    if (!hintChosen && blocks.length >= 15) {
      setTimeout(() => {
        checkHint();
      }, 1000);
    }

    if (hintScreenShowing && !hintScreenShown) {
      hintScreen();
    }
  }

  if (gamestate != "startmenu" && gamestate != "playing") {
    restartMenuShowing = true;
  }

  if (restartMenuShowing) {
    restartMenu();
  }

  // if (gamestate == "won" || gamestate == "lost" || gamestate == "played") {
  //   if (!helpScreenShowing) {
  //     restartMenu();
  //   }
  // }

  if (gamestate == "won") {
    shootFireworks();
  }

  if (gamestate == "lost") {
    dropBomb();
  }

  if (gamestate == "startmenu") {
    fallingBlock();
    hButton.show();
    dButton.show();

    for (let b of titleTextBlocksStartMenu) {
      b.show();
      b.update();
    }

    for (let b of startmenuButtons) {
      b.show();
    }
  }

  for (let b of bombs) {
    b.update();
    b.show();
  }

  if (gamestate != "startmenu") {
    drawTopBar();
    for (let b of titleTextBlocksTopBar) {
      b.show();
      b.update();
    }
  }

  if (dataScreenShowing) {
    dataScreen();
    // return;
  }

  if (helpScreenShowing) {
    helpScreen();
    // return;
  }

  if (shareScreenShowing) {
    shareScreen();
    // return;
  }

  // console.log("state: " + gamestate);
  // console.log("help: " + helpScreenShowing);
  // console.log("data: " + dataScreenShowing);
  // console.log("share: " + shareScreenShowing);
  //  console.log("restart: " + restartMenuShowing);


  //drawDebugOverlay();
  
}

async function keyPressed() {
  if (key == "g") {
    inputArr.push("H");
    inputArr.push("E");
    inputArr.push("L");
    inputArr.push("L");
    inputArr.push("O");
    newGuess();
    checkIfWon();
    checkIfLost();
  }

  if (key == "r") {
    removeItem("data");
    removeItem("todaysBoard");
  }

  if (key == "t") {
    inputArr.push(target[0]);
    inputArr.push(target[1]);
    inputArr.push(target[2]);
    inputArr.push(target[3]);
    inputArr.push(target[4]);
    newGuess();
    checkIfWon();
  }

  if (key == "d") {
    await getTodaysBoard();
  }
}

//function drawDebugOverlay() {
 // push(); // Isolate styling so it doesn't affect your game graphics
  
  // Measure exact visible viewport height on mobile
 // let visualH = window.visualViewport ? Math.round(window.visualViewport.height) : window.innerHeight;
  //let visualW = window.visualViewport ? Math.round(window.visualViewport.width) : window.innerWidth;

 // let boxW = 220;
 // let boxH = 110;
 // let padding = 10;

  // Background Box
 // fill(0, 0, 0, 200); // Semi-transparent black
 // stroke(255, 255, 0); // Bright yellow border
 // strokeWeight(2);
 // rect(10, 10, boxW, boxH, 8);

  // Text Styling
  //noStroke();
  //fill(255);
  //textAlign(LEFT, TOP);
  //textSize(12);
 // textFont("monospace");

  // Output Metrics
 // text(`Canvas Height:   ${Math.round(height)}px`, 10 + padding, 10 + padding);
 // text(`Window Height:   ${Math.round(windowHeight)}px`, 10 + padding, 28 + padding);
  //text(`Game Height:     ${Math.round(gameHeight)}px`, 10 + padding, 46 + padding);
  
  // Highlight the true visible viewport space
  //fill(0, 255, 150); // Mint green
 // text(`Visual Viewport: ${visualH}px (w: ${visualW})`, 10 + padding, 64 + padding);

  //pop(); // Restore game drawing settings
//}
