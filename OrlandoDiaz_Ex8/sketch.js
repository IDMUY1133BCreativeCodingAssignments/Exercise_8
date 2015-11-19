//Thank you to p5.js for helping me through their example and to Katie for explaining some of this to me!
var system; //right water
var shower; //left water
var waterlevel = 1; //expands a rectangle on the ground to simulate flooding
var opacity = 0; //self-explanatory
var uselesstestdummything = 0; //poor guy never made the final cut

function preload(){
    wordsnstuff = loadFont('data/font2.otf') //I like working with typography in code :P
}

function setup() {
  createCanvas(700, 700);
  system = new ParticleSystem(createVector(680, 20));//right water
  shower = new ShowerSystem(createVector(20, 20));//left water
}

function draw() {
   frameRate(30);
  background(5);
  textFont(wordsnstuff, 20);
  fill(255);
  text("Try to catch the secret message at the end", 40, 350);
  system.addParticle();
  system.run(); //this is the one on the right
  shower.addParticle();
  shower.run(); //I thought they looked like showerheads, this is the left one

  if(waterlevel < 0){
    opacity = opacity + 1; 
  }//getting deeper underwater!
    fill(70,70,255, opacity); //clever trick to simulate submerging in water
  rect(0, 600, 700, waterlevel); //Oh no! The screen is flooding!

  if(opacity == 255){
    opacity == 255; //looks kinda silly, but it works!
    textFont(wordsnstuff, 40);
    fill(0,0,0,255);
    text("Congrats on being able to read!", 10, 350); //HEY! No cheating! Don't peek at the secret message!
    //this flashing by was intentional, it's to entice the user to piece together the message
  }//plz stop opacity, you were making my eyes hurt
}
  

var Particle = function(position) {
  this.acceleration = createVector(0, 0.5);
  this.velocity = createVector(random(-10, 20), random(-7, 20)); //better area coverage with water
  this.position = position.copy();
  this.lifespan = 400.100; //I want it to hit the floor at least, so it makes sense that it's flooding
};//function

Particle.prototype.run = function() {
  this.update();
  this.display();
};//function
Particle.prototype.update = function(){
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 5;
  if(this.position.y > 200){
    waterlevel = waterlevel - 1; //makes water rise up
  }//raises the water level
  //Thanks to Calvin for telling me to put this in update() :)
};//function

Particle.prototype.display = function() {
  stroke(20, 200, 100, this.lifespan);
  strokeWeight(2);
  fill(70, 25, 255, this.lifespan);
  ellipse(this.position.x, this.position.y, 7, 20); //it sorta looks like a raindrop?
};//function

Particle.prototype.isDead = function(){
  if (this.lifespan < 0) {
    return true; //this is for run() down there
  }//if
   else {
    return false;
  }//else
};//function

var ParticleSystem = function(position) {
  this.origin = position.copy(); //emitter
  this.particles = []; //makes arrays full of raindrops
};//function

ParticleSystem.prototype.addParticle = function() {
  this.particles.push(new Particle(this.origin));
}; //function

ParticleSystem.prototype.run = function() {
  for (var i = this.particles.length-1; i >= 0; i--) {
    var p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1); //this massacres the innocent raindrops from the safety of thier array
    }//if
  }//for
};//function

var ShowerSystem = function(position){
    this.origin = position.copy();
    this.particles = [];
}//function

ShowerSystem.prototype.addParticle = function() {
  this.particles.push(new Particle(this.origin));
};//function

ShowerSystem.prototype.run = function() {
  for (var i = this.particles.length-1; i >= 0; i--) {
    var p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }//if
  }//for
};//function