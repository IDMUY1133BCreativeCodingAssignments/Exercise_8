//Reference Shiffman's Nature of Code

var systems;
var f1;
var f2;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // f1=loadImage("data/flower1.png")
  // f2=loadImage("data/flower2.png")
  systems = [];//array to hold particle clouds vector pos
}

function draw() {
  background(255);
  for (i = 0; i < systems.length; i++) {//loop through array of vectors
      //apply the vectors to particle methods
    systems[i].run();
    systems[i].addpart();
  }
}

function mousePressed() {
  this.f = new Flowersystem(createVector(mouseX, mouseY));//vector position determined by mouse click loc
  systems.push(f);//add vector to array
}

//particle systems class
function Flowersystem(pos) {//taking the vector of mouse click
  this.origin = pos.copy();
  this.flowers = [];
}

Flowersystem.prototype.addpart = function() {
  if (int(random(0, 2)) == 0) {//either option by random prob
    p = new Flower1(this.origin);
  }
  else {
    p = new Flower2(this.origin);
  }
  this.flowers.push(p);
}

Flowersystem.prototype.run = function() {
  for (var i = this.flowers.length - 1; i >= 0; i--) {//creates particle
    var p = this.flowers[i];
    p.run();
    if (p.isDead()) {//lifespan control
      this.flowers.splice(i, 1);
    }
  }
}


//particle class for flower type 1

function Flower1(pos) {//constructor
  this.acceleration = createVector(0, 0.05);
  this.velocity = createVector(random(-3, 3), random(-3, 3));
  this.pos = pos.copy();
  this.lifespan = 255.0;
  this.flow1=f1;
}

Flower1.prototype.run = function() {
  this.update();
  this.display();
}

// method to update position
Flower1.prototype.update = function(){
  this.velocity.add(this.acceleration);
  this.pos.add(this.velocity);
  this.lifespan -= 2;
}

// method to display
Flower1.prototype.display = function () {
  // tint(color(random(255),random(255),random(255),this.lifespan));
  // image(this.flow1,this.pos.x, this.pos.y, 100, 100);
  stroke(120,255,200,this.lifespan);
  strokeWeight(2);
  fill(185,255,200,this.lifespan);
  ellipse(this.pos.x,this.pos.y,random(15),random(15));//size will fluctuate
}

//lifespan control
Flower1.prototype.isDead = function () {
  if (this.lifespan < 0) {
    return true;
  } else {
    return false;
  }
}

// subclass of flower1

function Flower2(origin) {
  // calling parent constructor, inheritance from flower1
  Flower1.call(this, origin);

}


Flower2.prototype = Object.create(Flower1.prototype);

//constructor same as flower1
Flower2.prototype.constructor = function(){
  Flower1.prototype.constructor.call(this);
  this.flow2=f2;
}


// This update() method overrides the parent class update() method
Flower2.prototype.update=function() {
  Flower1.prototype.update.call(this);
}

// This display() method overrides the parent class display() method
Flower2.prototype.display=function() {
	rectMode(CENTER);
	stroke(180,185,255,this.lifespan);
    strokeWeight(2);
    fill(200,185,255,this.lifespan);
    rect(this.pos.x,this.pos.y,random(15),random(15));//size fluctuate, rect instead of ellipse
  // tint(color(this.lifespan));
  // image(this.flow2,this.pos.x-50, this.pos.y-50, 100, 100);
}