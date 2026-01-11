function screenInteract() {
  if (gamestate == "startmenu" && !helpScreenShowing) {
    for (let b of startmenuButtons) {
      b.keyPressed();
    }
    hButton.keyPressed();
    dButton.keyPressed();
  }

  if (
    helpScreenShowing ||
    hintScreenShowing ||
    dataScreenShowing ||
    shareScreenShowing
  ) {
    if (exButton) {
      exButton.keyPressed();
    }
  }

  if (shareScreenShowing) {
    cButton.keyPressed();
  }

  if (dataScreenShowing) {
    rButton.keyPressed();
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

  if ( targetType == infinitetxt && 
    gamestate == "won" ||
    gamestate == "lost" ||
    (gamestate == "played" && playAgButton && !playAgButton.falling)
  ) {
    playAgButton.keyPressed();
  }

  if (
   targetType == dailytxt && 
    gamestate == "won" ||
    gamestate == "lost" ||
    (gamestate == "played" && sButton && !sButton.falling)
  ) {
    sButton.keyPressed();
  }

  if (gamestate != "startmenu") {
    hButtonTopBar.keyPressed();
    dButtonTopBar.keyPressed();
    hoButton.keyPressed();
  }
}

function mousePressed() {
  screenInteract(mouseX, mouseY);
}

function touchStarted() {
if (touches.length > 0) {
    screenInteract(touches[0].x, touches[0].y);
  }
  return false;
}

function touchEnded() {
if (touches.length > 0) {
    screenInteract(touches[0].x, touches[0].y);
  }
  return false;
}
