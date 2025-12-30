let todayScore;
let totalScore;
let totalPlays;
let averageScore;
let streak;
let dataScreenShowing = false;

function getData() {
  totalPlays = getItem("totalplays");
  streak = getItem("streak");
  totalScore = getItem("totalscore");
  console.log("today " + score);
  console.log("total " + totalScore);
  console.log("streak " + streak);
  console.log("average " + averageScore);
}
function saveData() {
  totalPlays = getItem("totalplays");
  if (totalPlays == null) {
    totalPlays = 0;
  }
  totalPlays++;
  storeItem("totalplays", totalPlays);

  streak = getItem("streak");
  streak++;
  storeItem("streak", streak);

  totalScore = getItem("totalscore");
  if (totalScore == null) {
    totalScore = 0;
  }
  totalScore += score;
  storeItem("totalscore", totalScore);

  averageScore = totalScore / totalPlays;
  averageScore = Math.round(averageScore * 2) / 2;

  console.log("today " + score);
  console.log("total " + totalScore);
  console.log("total " + totalPlays);
  console.log("average " + averageScore);
}

class dataButton {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.txt = "!";
    this.colour = undefined;
    this.pressed = false;
  }

  show() {
    if (this.pressed) {
      navigator.vibrate(1);
      this.colour = darkblueC;
    } else {
      this.colour = blueC;
    }

    if (this.r > width / 20) {
      noStroke();
      fill(darkblueC);
      circle(this.x + shadowSize / 2, this.y + shadowSize / 2, this.r * 2);
    }

    fill(this.colour);
    circle(this.x, this.y, this.r * 2);
    fill(255);
    textSize(this.r);
    textAlign(CENTER, CENTER);
    text(this.txt, this.x, this.y);
  }

  keyPressed() {
    if (
      mouseX > this.x - this.r &&
      mouseX < this.x + this.r &&
      mouseY > this.y - this.r &&
      mouseY < this.y + this.r
    ) {
      this.pressed = true;

      setTimeout(() => {
        getData();
        dataScreenShowing = true;
      }, 100);
    }

    setTimeout(() => {
      this.pressed = false;
    }, 100);
  }
}

function dataScreen() {
  rectMode(CORNER);
  fill(backgroundC);
  rect(0, 0, width, height);
  rectMode(CENTER);

  fill(255);
  rect(helpScreenX, helpScreenY, helpScreenW, helpScreenH, 20);

  if (!averageScore) {
    txt2 = "AVERAGE: 0";
  } else {
    txt2 = "AVERAGE: " + averageScore;
  }

  if (streak == null) {
    txt3 = "STREAK: 0";
  } else {
    txt3 = "STREAK: " + streak;
  }

  textAlign(CENTER, CENTER);
  fill(blueC);
  textSize(width / 15);
  text(txt2, width / 2, height * 0.33);
  text(txt3, width / 2, height * 0.66);

  let buffer = width / 20;
  let exButtonX = helpScreenX + helpScreenW / 2 - buffer;
  let exButtonY = helpScreenY - helpScreenH / 2 + buffer;
  exButton = new exitButton(exButtonX, exButtonY);
  exButton.show();
}
