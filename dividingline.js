function dividingline() {
  fill(255);
  noStroke();
  rectMode(CORNER);
  let gameHei = gameHeight;
  gameHei = gameHei; // + gameHei/20;
  let keyboardOffset = height / 81;
  dividingLineH = (gameHei + keyboardTop) / 2;
  if (gamestate != "startmenu") {
    rect(0, dividingLineH, width, height - dividingLineH);
  }
}
