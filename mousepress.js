function screenInteract() {
  if (gamestate == "startmenu" && !helpScreenShowing) {
    for (let b of startmenuButtons) {
      b.keyPressed();
    }
    hButton.keyPressed();
    dButton.keyPressed();
  }

  if (helpScreenShowing || hintScreenShowing || dataScreenShowing) {
    exButton.keyPressed();
  }

  if (hintScreenShowing) {
    hintButton.keyPressed();
  }

  if (gamestate == "playing") {
    for (let k of letterKeys) {
      k.keyPressed();
    }

    for (let k of functionKeys) {
      k.keyPressed();
    }
  }

  if (
    gamestate == "won" || 
    gamestate == "lost" || gamestate == "played" && (playAgButton && !playAgButton.falling)) {
    playAgButton.keyPressed();
  }

  if (gamestate != "startmenu") {
    hButtonTopBar.keyPressed();
    dButtonTopBar.keyPressed();
  }
}

function mousePressed() {
  screenInteract(mouseX, mouseY);
}

function touchStarted() {
  screenInteract(touches[0].x, touches[0].y);
  return false;
}

function touchEnded() {
  screenInteract(touches[0].x, touches[0].y);
  return false;
}
