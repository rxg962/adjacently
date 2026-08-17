// class Bomb {
//   constructor(x, y) {
//     if (!x) {
//       x = floor(random(0,4))*width/5 + w/2;
//     }
//     this.r = width / 15;
//     if (!y) {
//       y = -2 * this.r;
//     }
//     this.pos = createVector(x, y);
//     this.startX = x;
//     this.vel = createVector(0, 0);
//     this.acc = createVector(0, 0.001);
//     if(!expertMode){
//       this.minHeight = floor(random(3,8)) * h + h/2;
//     } else{
//       this.minHeight = floor(random(2,6)) * h + h/2;
//     }
    
//     this.gravity = createVector(0, height * 0.00003);
//     this.exploded = false;
//     this.burst = false;
//     this.alfa = 255;
//   }

//   update() {
//     if (!this.exploded && !this.burst) {
//       this.acc.add(this.gravity);
//     }

//     this.vel.add(this.acc);
//     this.pos.add(this.vel);
//     this.acc.mult(0);

//     if (this.pos.y > this.minHeight && !this.exploded) {
//       explodeBlocks();
//       this.explode();
//     }
//   }

//   show() {
//     if (!this.exploded) {
//       let w = 10;
//       rectMode(CENTER);
//       fill(255);
//       rect(this.pos.x, this.pos.y - this.r / 2 - w, 2, w / 2);
//       fill(0);
//       rect(this.pos.x, this.pos.y - this.r / 2, w, w);
//       circle(this.pos.x, this.pos.y, this.r);
//       let offset = this.r / 5;
//       fill(255);
//       circle(this.pos.x - offset, this.pos.y - offset * 0.5, offset * 1.75);
//       fill(0);
//       circle(
//         this.pos.x - offset + 4,
//         this.pos.y - offset * 0.5 + 2,
//         offset * 2
//       );
//     }
//     if (this.burst) {
//       let col = color(random(255));
//       col.setAlpha(this.alfa);
//       fill(col);
//       circle(this.pos.x, this.pos.y, random(2, 10));
//       this.alfa -= 2;
//     }
//   }

//   explode() {
//     this.exploded = true;
//     bombExploded = true;
//     bombExplodedTime = millis();
//     navigator.vibrate(1);
//     for (let i = 0; i < 100; i++) {
//       let b = new Bomb(this.pos.x, this.pos.y);
//       b.burst = true;
//       b.exploded = true;
//       let r = random(0.2, 0.8);
//       let angle = random(TWO_PI);
//       let x = r * cos(angle);
//       let y = r * sin(angle);
//       b.acc = createVector(0, 0);
//       b.vel = createVector(x, y);
//       b.gravity = createVector(0, 0.002);
//       bombs.push(b);
//     }
//   }
// }

// function dropBomb() {
 
//   if (!bombDropped) {
//     bombs.push(new Bomb());
//     bombDropped = true;
//   }

//   for (let b of bombs) {
//     b.update();
//     b.show();

//     if (b.pos.y > height + 20 || (b.burst && b.alfa <= 0)) {
//       bombs.splice(i, 1);
//     }
//   }

//   if (millis() - bombExplodedTime > 100) {
//     restartMenu();
//   }
// }


/// UP IS GOOD, DOWN IS TEST

class Bomb {
  constructor(x, y) {
    if (!x) {
      x = floor(random(0, 4)) * width / 5 + w / 2;
    }
    this.r = width / 15;
    if (!y) {
      y = -2 * this.r;
    }
    this.pos = createVector(x, y);
    this.startX = x;
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0.001);

    if (!expertMode) {
      this.minHeight = floor(random(3, 8)) * h + h / 2;
    } else {
      this.minHeight = floor(random(2, 6)) * h + h / 2;
    }

    this.gravity = createVector(0, height * 0.00003);
    this.exploded = false;
    this.burst = false;
    this.alfa = 255;
  }

  update() {
    if (!this.exploded && !this.burst) {
      this.acc.add(this.gravity);
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);

      // Check height trigger only before explosion
      if (this.pos.y > this.minHeight) {
        if (typeof explodeBlocks === 'function') explodeBlocks();
        this.explode();
      }
    } else if (this.burst) {
      // Particle behavior
      this.vel.add(this.gravity);
      this.pos.add(this.vel);
      this.alfa -= 5; // Fade out particles faster
    }
  }

  show() {
    if (!this.exploded && !this.burst) {
      let w = 10;
      rectMode(CENTER);
      fill(255);
      rect(this.pos.x, this.pos.y - this.r / 2 - w, 2, w / 2);
      fill(0);
      rect(this.pos.x, this.pos.y - this.r / 2, w, w);
      circle(this.pos.x, this.pos.y, this.r);
      let offset = this.r / 5;
      fill(255);
      circle(this.pos.x - offset, this.pos.y - offset * 0.5, offset * 1.75);
      fill(0);
      circle(
        this.pos.x - offset + 4,
        this.pos.y - offset * 0.5 + 2,
        offset * 2
      );
    } else if (this.burst && this.alfa > 0) {
      let col = color(random(255));
      col.setAlpha(this.alfa);
      fill(col);
      noStroke();
      circle(this.pos.x, this.pos.y, random(2, 8));
    }
  }

  explode() {
    this.exploded = true;
    bombExploded = true;
    bombExplodedTime = millis();

    // Safe haptic feedback
    if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
      try { navigator.vibrate(50); } catch (e) {}
    }

    // Spawn 50 explosion particles (with high minHeight to prevent re-explosion)
    for (let i = 0; i < 50; i++) {
      let b = new Bomb(this.pos.x, this.pos.y);
      b.burst = true;
      b.exploded = true;
      b.minHeight = Infinity; // 💡 Prevents recursive explosion loop!

      let r = random(1, 4);
      let angle = random(TWO_PI);
      let x = r * cos(angle);
      let y = r * sin(angle);

      b.acc = createVector(0, 0);
      b.vel = createVector(x, y);
      b.gravity = createVector(0, 0.05);
      bombs.push(b);
    }
  }
}

function dropBomb() {
  if (!bombDropped) {
    bombs.push(new Bomb());
    bombDropped = true;
  }

  // Backwards loop for safe array splicing
  for (let i = bombs.length - 1; i >= 0; i--) {
    let b = bombs[i];
    b.update();
    b.show();

    // Clean up dead particles and offscreen bombs
    if (b.pos.y > height + 20 || (b.burst && b.alfa <= 0)) {
      bombs.splice(i, 1);
    }
  }

  // Trigger restart menu 1 second after explosion (changed 100ms to 1000ms for visual polish)
  if (bombExploded && millis() - bombExplodedTime > 1000) {
    if (typeof restartMenu === 'function') {
      restartMenu();
    }
  }
}
