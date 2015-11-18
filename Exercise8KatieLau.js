//http://p5js.org/examples/examples/Simulate_Particle_System.php

var meteorArray = []; //array of meteor systems 

var firstLocX = 100; //location of first system 
var firstLocY = 100;

function setup() {
  background(100);
  createCanvas(700, 700);
  
  for(var i = 0; i < 3; i++){
    meteorArray.push(new MeteorSystem(createVector(firstLocX, firstLocY)));  //a system of systems, essentially  
    firstLocX = firstLocX + 250; //location of each thing 
    firstLocY = firstLocY + 150;
  }
}

function draw() {
    background(100);  
    for(var i = 0; i <= meteorArray.length - 1; i++)
    {
        meteorArray[i].addMeteors(i); //pushes individual meteors into meteorARray
        meteorArray[i].run(i); //updates and displays the meteors
    }
}

var MeteorSystem = function(position){
    this.origin = position.copy(); //take position of first object and copies it into origin 
    this.meteors = []; //arrays for meteors in that system
};

MeteorSystem.prototype.addMeteors = function(num){  
  this.meteors.push(new Meteor(this.origin, num)); //pushs individual meteors into meteor Array, num is later used to determine what velocity / acceleration is applied to it. 
};

MeteorSystem.prototype.run = function(){
  for (var i = this.meteors.length - 1; i >= 0; i--) {
    var m = this.meteors[i]; //checks if meteors are alive/dead, if dead, gets rid of it
      //starts from last array space instead of beginning in order to ensure no meteors gets skipped 
    m.run(); //updates and displays each set of meteors
    if (m.isDead()) {
      this.meteors.splice(i, 1);
    }
  }
}; 

var Meteor = function(position, whichVel){
    this.lifespan = 100.0; //how long the meteor sparkles show (decreases) 
    
    if(whichVel == 0){ //whichVel changes each meteor's motion to make them unique. also changes color within if statement  
    this.velocity = createVector(random(2, 3), random(2, 3)); //is a straightish line (tail of meteor)
        fill(232, 142, 48, this.lifespan);
    }
    if(whichVel == 1){
        this.velocity = createVector(random(-1.5, 1.5), random(-1.5, 1.5));
       fill(204, 167, 255, this.lifespan); //opacity not working? 
    }
    if(whichVel == 2){
        this.velocity = createVector(random(-4, -2), random(-3, 3 ));
        this.acceleration = createVector(-.2, .2);
        fill(58, 190, 255, this.lifespan);
    }
    
    this.position = position.copy(); //puts in the position of the meteor
};

Meteor.prototype.update = function(){
  this.velocity.add(this.acceleration); //adds acceleration to velocity
  this.position.add(this.velocity); //formula for making vectors move (position + speed basically)
  this.lifespan -= 2.2; //decreases lifespan until it eventually runs out 
};

Meteor.prototype.display = function(){
  stroke(0, this.lifespan); //uses this.lifespan for opacity 
  strokeWeight(1); //stroke weight of the rectangles 
  // fill(192, 255, 192, this.lifespan);
    for(var i = 0; i < 10; i++){
    rect(this.position.x, this.position.y, 20, 20); //displays all the rectangles (10 at a time per frame)
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
    this.display(); //displays the rectangles based on update coordinates 
};

