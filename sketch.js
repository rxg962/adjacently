async function setup() {
  //CREATE CANVAS
  gameWidth = 500;
  if (windowWidth < gameWidth) {
    gameWidth = windowWidth;
  }
  createCanvas(gameWidth, windowHeight);
  gameHeight = (2 * height) / 3;

  pixelDensity(window.devicePixelRatio);

  textFont("Outfit");

  await getWords();

  titleImg = await loadImage("Adjacently.png");
  let imgRatio = titleImg.width / titleImg.height;
  let imgW = width * 0.8;
  let imgH = titleImg.height / imgRatio;
  titleImg.resize(imgW, imgH);

  getColours();

  w = floor(gameWidth / 5);
  h = floor(gameHeight / totalGuesses);
  guessY = gameHeight - h;

  fallingBlocks.push(new FallingBlock());

  shadowSize = width / 80;

  makeKeyboard();

  buttonW = width / 2;
  buttonH = (1.75 * ((2 * height) / 3)) / 7;

  gamestate = "startmenu";
  gameStartMenu();

  dividingline();
  playAgButton = new playAgainButton();

  //HELPSCREEN
  setupHelpscreen();

  setupHintscreen();

  titleText();
}

function draw() {
  background(lightblueC);

  for (let b of blocks) {
    b.checkNeighbours();
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

    if (!hintChosen && guessY < gameHeight - 3 * h) {
      setTimeout(() => {
        checkHint();
      }, 1000);
    }
  }

  if (gamestate == "won") {
    shootFireworks();
  }

  if (gamestate == "lost") {
    // shootFailFireworks();
    dropBomb();
  }

  if (gamestate == "startmenu") {
    fallingBlock();
    hButton.show();

    for (let b of titleTextBlocks) {
      b.show();
    }

    for (let b of startmenuButtons) {
      b.show();
    }
  }

  if (helpScreenShowing) {
    helpScreen();
  }

  if (hintScreenShowing) {
    hintScreen();
  }

  for (let b of bombs) {
    b.update();
    b.show();
  }
}

function keyPressed() {
  if (key == " ") {
    let bomb = new Bomb();
    bomb.update();
    bomb.show();
  }

  if (key == "g") {
    inputArr.push("H");
    inputArr.push("E");
    inputArr.push("L");
    inputArr.push("L");
    inputArr.push("O");
    newGuess();
  }

  if (key == "h") {
    hintScreenShowing = true;
  }
}
