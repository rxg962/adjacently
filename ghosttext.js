function ghosttext() {
  for (let i = 0; i < inputArr.length; i++) {
    textSize(min(w, h) / 2);
    fill(255);
    textAlign(CENTER, CENTER);
    let x = i * w + w / 2;

    if (!invalidWord) {
      text(inputArr[i], x, guessY + h / 2);

      if (guessY < h) {
        let startX = x;
        let startY = guessY + h / 2;
        let wiggleAmt = 2;
        let wiggleX = random(-wiggleAmt, wiggleAmt);
        let wiggleY = random(-wiggleAmt, wiggleAmt);
        text(inputArr[i], startX + wiggleX, startY + wiggleY);
      }
    } else if (invalidWord && millis() - timeNow < 1000) {
      fill(redC);
      navigator.vibrate(1);
      let startX = x;
      let startY = guessY + h / 2;
      let wiggleAmt = 2;
      let wiggleX = random(-wiggleAmt, wiggleAmt);
      let wiggleY = random(-wiggleAmt, wiggleAmt);
      text(inputArr[i], startX + wiggleX, startY + wiggleY);
    } else if (invalidWord && millis() - timeNow >= 1000) {
      invalidWord = false;
      text(inputArr[i], x, guessY + h / 2);
    }
  }
}
