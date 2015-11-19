var system; 

function setup() {
  createCanvas(1000, 1000);
  system = new ParticleSystem(createVector(width/15, 50));  //system is a variable of the class, particleSystem
}

function draw() {
  background(255,23,100);
  system.addParticle();  
  system.run();      //calls update and display functions
}

// A Particle class
var Particle = function(position) {
  this.acceleration = createVector(10, 10);
  this.velocity = createVector(random(-3, 3), random(-3, 0));
  this.position = position.copy();
  this.lifespan = 200.0;
};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
Particle.prototype.update = function(){
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 5;
};

// Method to display
Particle.prototype.display = function() {
  stroke(400, this.lifespan);
  strokeWeight(40);
  fill(0, this.lifespan);
  ellipse(this.position.x-20, this.position.y+50, 50, 50);
  ellipse(this.position.x+100, this.position.y+50,40,40);
  ellipse(this.position.x+200, this.position.y+50,30,30);
  ellipse(this.position.x+300, this.position.y+50,20,20);
  ellipse(this.position.x+400, this.position.y+50,10,10);
  ellipse(this.position.x+500, this.position.y+50,5,5);

};

Particle.prototype.gone = function(){
  if (this.lifespan < 0) {
    return true;
  } else {
    return false;
  }
};

var ParticleSystem = function(position) {
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function() {
  this.particles.push(new Particle(this.origin));

};

ParticleSystem.prototype.run = function() {
  for (var i = this.particles.length-1; i >= 0; i--) {  
    var p = this.particles[i];
    p.run();
    if (p.gone()) {
      this.particles.splice(i, 10);
    }
  }
};