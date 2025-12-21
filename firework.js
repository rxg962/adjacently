class Firework {
  constructor(x, y) {
    if (!x) {
      x = random(25, gameWidth - 25);
    }
    if (!y) {
      y = height;
    }
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, -0.2);
    this.maxHeight = random(height / 8, height / 5);
    this.gravity = createVector(0, height * 0.000002);
    this.exploded = false;
    this.burst = false;
    this.alfa = 255;
    this.col = random(fireworkcolours);
  }

  update() {
    this.acc.add(this.gravity);
    this.vel.add(this.acc);
    this.pos.add(this.vel);

    if (this.pos.y < this.maxHeight && !this.exploded && !this.burst) {
      this.explode();
    }
  }

  show() {
    if (!this.exploded && !this.burst) {
      fill(255);
      circle(this.pos.x, this.pos.y, width / 90);
    }
    if (this.burst) {
      let col = color(this.col);
      col.setAlpha(this.alfa);
      fill(col);
      circle(this.pos.x, this.pos.y, 2);
      this.alfa -= 5;
    }
  }

  explode() {
    this.exploded = true;
    navigator.vibrate(1);
    for (let i = 0; i < 500; i++) {
      let f = new Firework(this.pos.x, this.pos.y);
      f.burst = true;
      f.exploded = true;
      let r = random(0.01, 2);
      let angle = random(TWO_PI);
      let x = r * cos(angle);
      let y = r * sin(angle);
      f.acc = createVector(0, 0);
      f.vel = createVector(x, y);
      f.gravity = createVector(0, 0.005);
      fireworks.push(f);
    }
  }
}

class FailFirework {
  constructor(x, y) {
    if (!x) {
      x = random(25, gameWidth - 25);
    }
    if (!y) {
      y = height;
    }
    this.pos = createVector(x, y);
    this.startX = x;
    this.vel = createVector(0, 0);
    this.acc = createVector(0, -0.05);
    this.maxHeight = random(height / 5, height / 3);
    this.gravity = createVector(0, height * 0.0000002);
    this.exploded = false;
    this.burst = false;
    this.alfa = 255;
    this.col = color(255, 0, 255);
    this.phase = random(TWO_PI); // start at a random point
    this.freq = 0.08; // how fast it wiggles
    this.amp = 60;
  }

  update() {
    if (!this.burst) {
      this.acc.add(this.gravity);
    }

    this.vel.add(this.acc);
    this.pos.add(this.vel);

    if (!this.exploded) {
      this.phase += this.freq;
      this.pos.x = this.startX + sin(this.phase) * this.amp;
    }

    if (this.pos.y < this.maxHeight && !this.exploded && !this.burst) {
      this.explode();
    }
  }

  show() {
    if (!this.exploded && !this.burst) {
      fill(255);
      circle(this.pos.x, this.pos.y, width / 90);
    }
    if (this.burst) {
      let col = color(random(255));
      col.setAlpha(this.alfa);
      fill(col);
      circle(this.pos.x, this.pos.y, random(2,10));
      this.alfa -= 2;
    }
  }

  explode() {
    this.exploded = true;
    navigator.vibrate(1);
    for (let i = 0; i < 100; i++) {
      let f = new FailFirework(this.pos.x, this.pos.y);
      f.burst = true;
      f.exploded = true;
      let r = random(0.01, 0.5);
      let angle = random(TWO_PI);
      let x = r * cos(angle);
      let y = r * sin(angle);
      f.acc = createVector(0, 0);
      f.vel = createVector(x, y);
      f.gravity = createVector(0, 0.002);
      failFireworks.push(f);
    }
  }
}

function shootFireworks() {
  if (!fireworksStarted) {
    fireworksStarted = true;
    lastFireworkTime = millis();
    fireworkDelay = millis();
    return;
  }

  if (fireworkCounter < score && millis() - lastFireworkTime > 500) {
    fireworks.push(new Firework());
    lastFireworkTime = millis();
    fireworkCounter++;
  }

  if (millis() - fireworkDelay > 500) {
    for (let i = fireworks.length - 1; i >= 0; i--) {
      let f = fireworks[i];
      f.update();
      f.show();

      if (f.pos.y > height + 20 || (f.burst && f.alpha <= 0)) {
        fireworks.splice(i, 1);
      }
    }
  }

  if (fireworkCounter >= 1) {
    restartMenu();
  }
  
    console.log(fireworks.length);



  // if (fireworkCounter == score && millis() - lastFireworkTime > 3000) {
  // restartMenu();
  // }
}

function shootFailFireworks() {
  if (!fireworksStarted) {
    fireworksStarted = true;
    lastFireworkTime = millis();
    fireworkDelay = millis();
    return;
  }

  if (fireworkCounter < 3 && millis() - lastFireworkTime > 500) {
    failFireworks.push(new FailFirework());
    lastFireworkTime = millis();
    fireworkCounter++;
  }

  if (millis() - fireworkDelay > 0) {
    for (let i = failFireworks.length - 1; i >= 0; i--) {
      let f = failFireworks[i];
      f.update();
      f.show();

      if (f.pos.y > height + 20 || (f.burst && f.alfa <= 0)) {
        failFireworks.splice(i, 1);
      }
    }
  }

  if (fireworkCounter >= 3) {
    restartMenu();
  }
}
