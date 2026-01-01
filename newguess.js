function newGuess() {
  let guess = inputArr.join("").toLowerCase();
  let guessArr = inputArr;
  guessWord = guessArr;

  if (guessArr.length != 5 || !allWords.includes(guess)) {
    invalidWord = true;
    timeNow = millis();
    return;
  } else {
    for (g of guessArr) {
      let col = index % 5;
      let x = floor(col * w);
      let y = guessY;
      let b = new Block(x, y, index, g);
      blocks.push(b);
      letters.push(b.letter);

      index++;
      if (index % 5 == 0) {
        guessY -= h;
      }
    }
  }
  updateKeyColour();
  updateKeyColour();
  inputArr = [];
}

function updateKeyColour() {
  for (let b of blocks) {
    b.checkNeighbours();
    b.isNotAllowed();
    if (
      b.incorrectLetter &&
      !incorrectLetters.includes(b.letter) &&
      !correctLetters.includes(b.letter)
    ) {
      incorrectLetters.push(b.letter);
    }
    if (b.matched && !correctLetters.includes(b.letter)) {
      correctLetters.push(b.letter);
    }
  }
}

async function checkIfLost() {
  if (gamestate != "won" && guessY < playAreaTop) {
    await saveTodaysBoard();
    gamestate = "lost";
    if (targetType == dailytxt) {
      await saveData();
    }
    storeItem("streak", 0);
  }
}

async function checkIfWon() {
  if (!guessWord) {
    return;
  }

  for (let i = 0; i < 5; i++)
    if (guessWord[i] != target[i]) {
      return;
    }

  gamestate = "won";
  score = totalGuesses + 1 - blocks.length / 5;

  if (targetType == dailytxt) {
    await saveTodaysBoard();
    await saveData();
  }
}
