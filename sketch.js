let guessWords = [],
  targetWords = [];
let blocks = [];
let w, h;
let letters = [];
let target;
let index = 0;
let guessY;
let guessWord;
let totalGuesses = 10;
let inputArr = [];
let redC, yellowC, greenC, blueC, pinkC, greyC, lightredC, lightblueC;
let targetIndex;
let invalidWord = false;
let timeNow;
let gameStarted = false;
let targetType;
let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let fallingBlocks = [];
let fireworks = [];
let fireworkcolours = [];
let fireworkpinkC,
  fireworkblueC,
  fireworkpurpleC,
  fireworkorangeC,
  fireworkgreenC,
  fireworkyellowC;
let fireworkDelay;
let fireworkCounter = 0;
let score = 0;
let lastFireworkTime = 0;
let fireworksStarted = false;
let gameWidth, gameHeight;
let letterKeys = [];
let functionKeys = [];
let keyW, keyH;
let buttonW, buttonH;
let correctLetters = [];
let incorrectLetters = [];
let keyboardTop;
let gameState;
let startmenuButtons = [];
let dividingLineH;
let dailytxt = "Daily";
let infinitetxt = "Infinite";
let playAgButton;
let hButton, exButton;
let helpScreenShowing = false;
let helpImg;
let txt1, txt2, txtStrokeC, txtFillC, text1Size, text2Size;
let restartTexts = [];
let restartTextsCreated = false;
let restartMenuShowing = false;
let failFireworks = [];
let bombs = [];
  let bombDropped = false;
let bombExplodedTime;
let bombExploded = false;

async function setup() {
  //CREATE CANVAS
  gameWidth = 500;
  if (windowWidth < gameWidth) {
   gameWidth = windowWidth - 20;
  }


  createCanvas(gameWidth, windowHeight - 100);

  if (height === 0) {
  resizeCanvas(gameWidth, window.innerHeight - 100);
}
  
 setupLayout();

  textFont("Outfit");

  await getWords();

  getColours();

  

  fallingBlocks.push(new FallingBlock());

  makeKeyboard();

 

  helpImg = await loadImage("helpscreen1.png");

  gamestate = "startmenu";
  gameStartMenu();

  dividingline();
  playAgButton = new playAgainButton();
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

    for (let b of startmenuButtons) {
      b.show();
    }
  }

  if (helpScreenShowing) {
    helpScreen();
  }
  
  for (let b of bombs){
    b.update();
    b.show();
  }

}

function keyPressed() {
  if (key == " ") {
    bomb = new Bomb();
    bomb.update();
    bomb.show();
    
  }
  if(key == "g"){
    inputArr.push("H");
    inputArr.push("E");
    inputArr.push("L");
    inputArr.push("L");
    inputArr.push("O");
    newGuess();
  }
}

function setupLayout(){
   gameHeight = (2 * height) / 3;

  w = floor(gameWidth / 5);
  h = floor(gameHeight / totalGuesses);
  guessY = gameHeight - h;

   buttonW = width / 2;
  buttonH = (2 * ((2 * height) / 3)) / 7;
}
