var system; // particle system variable

function setup() {
  createCanvas(windowWidth, windowHeight);
  system = new ParticleSystem(createVector(width/2, height-300)); // constructs a new ParticleSystem class called 'system'
}

function draw() {
  background(255,160,91);
  system.addParticle();  // creates continuous stream
  system.run(); // method to run system
}

// A simple Particle class
var Particle = function(position) {
  this.acceleration = createVector(random(-0.5,0.5), -1);
  this.velocity = createVector(random(-1, 1), random(2,4));
  this.position = position.copy();
  this.lifespan = 255.0;
};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
Particle.prototype.update = function(){
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 1;
};

// Method to display
Particle.prototype.display = function() {
  stroke(255, 246, 240, this.lifespan);
  strokeWeight(1);
  fill(54, 236, 255, this.lifespan);
  line(this.position.x, this.position.y, 0, 0);
  line(this.position.x, this.position.y, width, 0);
  line(this.position.x, this.position.y, 0, height);
  line(this.position.x, this.position.y, width, height);
  ellipse(this.position.x, this.position.y, 12, 12);
};

// Is the particle still useful?
Particle.prototype.isDead = function(){
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
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};