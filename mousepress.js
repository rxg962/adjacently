function touchStarted() {
  let tx = (typeof touches !== 'undefined' && touches.length > 0) ? touches[0].x : mouseX;
  let ty = (typeof touches !== 'undefined' && touches.length > 0) ? touches[0].y : mouseY;

  logDebug(`touchStarted firing at (${floor(tx)}, ${floor(ty)})`);

  try {
    screenInteract(tx, ty);
  } catch (err) {
    logDebug(`ERROR in touchStarted: ${err.message}`);
  }
  
  // Prevent default Safari scrolling/zooming gestures
  return false; 
}

function mousePressed() {
  if (typeof touches !== 'undefined' && touches.length > 0) {
    logDebug(`mousePressed ignored (touches active)`);
    return;
  }

  logDebug(`mousePressed firing at (${floor(mouseX)}, ${floor(mouseY)})`);

  try {
    screenInteract(mouseX, mouseY);
  } catch (err) {
    logDebug(`ERROR in mousePressed: ${err.message}`);
  }
}

// ==========================================
// SCREEN INTERACTION ROUTER
// ==========================================

function screenInteract(px, py) {
  let x = (px !== undefined) ? px : mouseX;
  let y = (py !== undefined) ? py : mouseY;

  logDebug(`screenInteract checking target at (${floor(x)}, ${floor(y)})`);

  // 1. START MENU
  if (gamestate === "startmenu" && !helpScreenShowing && !dataScreenShowing) {
    logDebug(`Checking startmenu buttons...`);
    if (Array.isArray(startmenuButtons)) {
      for (let b of startmenuButtons) {
        b?.keyPressed?.(x, y);
      }
    } else {
      logDebug(`WARNING: startmenuButtons is NOT an array!`);
    }
    hButton?.keyPressed?.(x, y);
    dButton?.keyPressed?.(x, y);
  }

  // 2. OVERLAY SCREENS
  if (helpScreenShowing || hintScreenShowing || dataScreenShowing || shareScreenShowing) {
    logDebug(`Checking overlay exit/action buttons...`);
    exButton?.keyPressed?.(x, y);
  }

  if (shareScreenShowing) {
    cButton?.keyPressed?.(x, y);
  }

  if (hintScreenShowing) {
    hintButton?.keyPressed?.(x, y);
  }

  if (hint2ScreenShowing) {
    hint2Button?.keyPressed?.(x, y);
  }

  // 3. PLAYING STATE
  if (gamestate === "playing" && !helpScreenShowing && !dataScreenShowing) {
    logDebug(`Checking playing keys...`);
    if (Array.isArray(letterKeys)) {
      for (let k of letterKeys) {
        k?.keyPressed?.(x, y);
      }
    }
    if (Array.isArray(functionKeys)) {
      for (let k of functionKeys) {
        k?.keyPressed?.(x, y);
      }
    }
  }

  // 4. REPLAY / PLAY AGAIN (INFINITE MODE)
  if (
    (typeof infinitetxt !== 'undefined' && targetType === infinitetxt && gamestate === "won") ||
    gamestate === "lost" ||
    (gamestate === "played" && playAgButton && !playAgButton.falling)
  ) {
    if (!shareScreenShowing && !dataScreenShowing && !helpScreenShowing) {
      playAgButton?.keyPressed?.(x, y);
    }
  }

  // 5. SUBMIT / SHARE (DAILY MODE)
  if (
    (typeof dailytxt !== 'undefined' && targetType === dailytxt && gamestate === "won") ||
    gamestate === "lost" ||
    (gamestate === "played" && sButton && !sButton.falling)
  ) {
    if (!shareScreenShowing && !dataScreenShowing && !helpScreenShowing) {
      sButton?.keyPressed?.(x, y);
    }
  }

  // 6. TOP BAR BUTTONS
  if (
    gamestate !== "startmenu" &&
    !helpScreenShowing &&
    !dataScreenShowing &&
    !shareScreenShowing
  ) {
    hButtonTopBar?.keyPressed?.(x, y);
    dButtonTopBar?.keyPressed?.(x, y);
    hoButton?.keyPressed?.(x, y);
  }
}

// ==========================================
// ON-SCREEN MOBILE DEBUGGER
// ==========================================
let debugLogs = [];

function logDebug(msg) {
  let timestamp = new Date().toISOString().substr(11, 8);
  debugLogs.unshift(`[${timestamp}] ${msg}`);
  if (debugLogs.length > 8) debugLogs.pop(); // Keep last 8 lines
}



window.addEventListener('load', () => {
  window.addEventListener('touchstart', (e) => {
    if (e.touches && e.touches.length > 0) {
      let tx = e.touches[0].clientX;
      let ty = e.touches[0].clientY;
      logDebug(`Native iOS Touch at (${floor(tx)}, ${floor(ty)})`);
      try {
        screenInteract(tx, ty);
      } catch (err) {
        logDebug(`Error: ${err.message}`);
      }
    }
  }, { passive: false });
});
