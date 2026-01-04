async function setup() {
  //CREATE CANVAS
  gameWidth = 500;
  if (windowWidth < gameWidth) {
    gameWidth = windowWidth;
  }
  createCanvas(gameWidth, windowHeight - 75);

  pixelDensity(window.devicePixelRatio);

  textFont("Outfit");

  await getWords();

  getColours();

  gameHeight = (2 * height) / 3;
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

  setupHelpscreen();

  setupHintscreen();

  setUpTopBar();

  titleTextStartMenu();

  rButton = new resetDataButton();
}

function draw() {
  background(lightblueC);
  
   if (dataScreenShowing) {
    dataScreen();
    return;
  }
  
   if (helpScreenShowing) {
    helpScreen();
    return;
  }
  
   if (hintScreenShowing && !hintScreenShown) {
    hintScreen();
  }

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

    if (!hintChosen && guessY < playAreaBottom - 3 * h) {
      setTimeout(() => {
        checkHint();
      }, 1000);
    }
  }
  
  if(gamestate !="startmenu" && gamestate != "playing"){
    restartMenu();
  }

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
    }
  }
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
