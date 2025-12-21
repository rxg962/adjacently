function screenInteract() {
  if (gamestate == "startmenu" && !helpScreenShowing) {
    for (let b of startmenuButtons) {
      b.keyPressed();
    }
    hButton.keyPressed();
  }

  if (gamestate == "startmenu" && helpScreenShowing) {
    exButton.keyPressed();
  }

  if (gamestate == "playing") {
    for (let k of letterKeys) {
      k.keyPressed();
    }

    for (let k of functionKeys) {
      k.keyPressed();
    }
  }

  if (gamestate == "won" || (gamestate == "lost" && playAgButton) && !playAgButton.falling) {
    playAgButton.keyPressed();
  }
}


function mousePressed() {
  screenInteract(mouseX, mouseY);
}

function touchStarted() {
  screenInteract(mouseX, mouseY);
  return false;
}