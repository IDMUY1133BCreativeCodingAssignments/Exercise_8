//http://p5js.org/examples/examples/Simulate_Particle_System.php

var meteorArray = [];
var colors = []; //changes colors of meteors ? 

var velocityXArray = []; //three different velocities -> three different motions ? 
var velocityYArray = [];


var firstLocX = 180;
var firstLocY = 100;

function setup() {
  background(0);
  angleMode(DEGREES);
  createCanvas(720, 400);
  //system = new ParticleSystem(createVector(width/2, height/2)); 
  
  for(var i = 0; i < 3; i++){
    meteorArray.push(new MeteorSystem(createVector(firstLocX, firstLocY)));  
    firstLocX = firstLocX + 100;
    firstLocY = firstLocY + 25;
  }
}

function draw() {
    background(0);  
    for(var i = 0; i <= meteorArray.length - 1; i++)
    {
        meteorArray[i].addMeteors(i);
        meteorArray[i].run();
    }
}

/*
function mousePressed(){
    meteorArray.push(new MeteorSystem(createVector(mouseX, mouseY)));
    
}
*/

var MeteorSystem = function(position){
  this.origin = position.copy();
    this.meteors = []; //meteors in that system
};

MeteorSystem.prototype.addMeteors = function(num){  
  this.meteors.push(new Meteor(this.origin, num));   
};

MeteorSystem.prototype.run = function(){
  for (var i = this.meteors.length - 1; i >= 0; i--) {
    var m = this.meteors[i];
    m.run();
    if (m.isDead()) {
      this.meteors.splice(i, 1);
    }
  }
}; 

var Meteor = function(position, whichVel){
    //this.velocity = createVector(random(-1, 1), random(-1, 0)); //will only go in one general direction
    if(whichVel == 0){
    this.velocity = createVector(random(2, 3), random(2, 3)); //is a straight ish line (tail of meteor)
    }
    if(whichVel == 1){
        this.velocity = createVector(random(-1, 1), random(-1, 0));
    }
    if(whichVel == 2){
        this.velocity = createVector(random(4, 2), random(0, 3));
    }
    this.position = position.copy(); //puts in the position of the meteor
    this.lifespan = 100.0; //how long the meteor sparkles show (decreases) 
};

Meteor.prototype.update = function(){
  this.position.add(this.velocity); //formula for making vectors move (position + speed basically)
  this.lifespan -= 1.5; //decreases lifespan longer it is out 
};

Meteor.prototype.display = function(){
  stroke(200, this.lifespan); //uses this.lifespan for opacity 
  strokeWeight(2); //weight of the ellipses 
  fill(255, 255, 28, this.lifespan); //opacity is directionally proportional to the opacity 
    for(var i = 0; i < 10; i++){
    rect(this.position.x, this.position.y, 10, 10);  //make smaller over time? (maybe?) 
    }
};

Meteor.prototype.isDead = function(){
if (this.lifespan < 0) { //checks if is alive or dead to get rid of it from the array 
    return true;
  } else {
    return false;
  }
};

Meteor.prototype.run = function(){
    this.update(); //continuously changing location of squares 
    this.display();
};

