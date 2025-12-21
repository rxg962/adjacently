async function getWords() {
  let responseTarget = await fetch("targetwords.txt");
  let txtTarget = await responseTarget.text();
  targetWords = txtTarget
    .split("\n")
    .map((w) => w.trim().toLowerCase())
    .filter((w) => w.length > 0);

  let responseGuess = await fetch("guesswords.txt");
  let txtGuess = await responseGuess.text();
  guessWords = txtGuess
    .split("\n")
    .map((w) => w.trim().toLowerCase())
    .filter((w) => w.length > 0);

  allWords = [...guessWords, ...targetWords];
}

function getTargetIndex() {
  let d = day();
  let m = month();
  let y = year();
  let rand = 10000 * y + 100 * m + d;
  let scramble = abs(sin(rand)) * 1000000;
  targetIndex = floor(scramble % targetWords.length);
  // console.log(targetIndex);
  return targetIndex;
}

function getTarget() {
  if (targetType == infinitetxt) {
    target = random(targetWords);
  } else if (targetType == dailytxt) {
    getTargetIndex();
    target = targetWords[targetIndex];
    keyboardShowing = true;
  }

  target = target.toUpperCase().split("");
  console.log(target);
  keyboardShowing = true;
}
