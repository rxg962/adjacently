class helpButton{
  
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.r = buttonW/8;
    this.txt = "?"; 
    this.colour = undefined;
    this.pressed = false;
    }
    
   
  
  show(){
    if(this.pressed){
      navigator.vibrate(1);
      this.colour = color(38,151,192);
    }
    else {
      this.colour = blueC;
    }
     
    fill(this.colour);
    noStroke();
    circle(this.x, this.y, this.r*2);
    fill(255);
    textSize(this.r);
    textAlign(CENTER,CENTER);
    text(this.txt, this.x, this.y); 
    
    }

    

  
  keyPressed(){
    if(mouseX > this.x - this.r && mouseX < this.x + this.r && mouseY > this.y - this.r && mouseY < this.y + this.r){
      
      this.pressed = true;
           
        setTimeout(() => {
          helpScreenShowing = true;
          }, 100);
        }
       
    
     setTimeout(() => {
        this.pressed = false;
      }, 100);
  }
}

class exitButton{
  
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.r = buttonW/15;
    this.txt = "X"; 
    this.colour = greyC;
    this.pressed = false;
    }
    
   
  
  show(){
    // if(this.pressed){
    //   navigator.vibrate(1);
    //   this.colour = greyC;
    // }
    // else {
    //   this.colour = blueC;
    // }
     
    fill(this.colour);
    noStroke();
    circle(this.x, this.y, this.r*2);
    fill(255);
    textSize(this.r);
    textAlign(CENTER,CENTER);
    text(this.txt, this.x, this.y); 
    
    }

    

  
  keyPressed(){
    if(mouseX > this.x - this.r && mouseX < this.x + this.r && mouseY > this.y - this.r && mouseY < this.y + this.r){
      
      this.pressed = true;
        setTimeout(() => {
          helpScreenShowing = false;
          }, 100);
        }
    
     setTimeout(() => {
        this.pressed = false;
      }, 100);
  }
}

function helpScreen(){
  fill(255, 200);
  rectMode(CENTER);
  // rect(width/2, height/2, 2*width/3, 3*height/4);
  imageMode(CENTER);
  let aspect = helpImg.width / helpImg.height;
  let newWidth = width * 0.75;
  let newHeight = newWidth / aspect;
  image(helpImg, width/2, height/2, newWidth, newHeight);
 
  let buffer = width/20;
  let exButtonX = width/2 + newWidth/2 - buffer;
  let exButtonY = height/2 - newHeight/2 + buffer;
  exButton = new exitButton(exButtonX, exButtonY);
  exButton.show();

}
