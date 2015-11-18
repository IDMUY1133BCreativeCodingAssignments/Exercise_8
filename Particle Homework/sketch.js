var system; // what the particle system is reffered to as

function setup() { // set up size and declare system as the ParticleSystem class
  createCanvas(720, 400);
  system = new ParticleSystem(createVector(width/2, height/2)); // passes the parameter 
}

function draw() { // draws the final code
  background(130); // background color
  system.addParticle(); //creates the particle
  system.run(); // drops it from the origin
}

// A simple Particle class for a single particle
var Particle = function(position) {
  this.acceleration = createVector(0, -0.05); // the increse in speed of the particle
  this.velocity = createVector(random(-2, 2), random(-1, 1)); // initial velocity
  this.position = position.copy(); // coppies the position to be used later
  this.lifespan = 255.0; // has the particles fade out
};

Particle.prototype.run = function() { // runs the function that moves the particle
  this.update(); // calls update
  this.display(); // calls display
};

// Method to update position of each particle
Particle.prototype.update = function(){
  this.velocity.add(this.acceleration); // adds th eacceleration to the velocity 
  this.position.add(this.velocity); // changes th eposition based on the velocity
  this.lifespan -= 2; // has the particle fade out at -2 on the alpha scale 255-0
};

// Method to display the particles
Particle.prototype.display = function() {
  stroke(random(0,255),random(0,255), random(0,255), this.lifespan); // color 200 alpha is the lifespan
  strokeWeight(2); // thickness of the stroke
  fill(random(0,255),random(0,255), random(0,255), this.lifespan); // the fill of the particle with the alpha
  ellipse(this.position.x, this.position.y, 12, 12); // the actual particle
};

// Is the particle still useful?
Particle.prototype.isDead = function(){
  if (this.lifespan < 0) { // tests to see if the particle is ready to die 
      // checks if the alpha is less than 0 
    return true;
  } else {
    return false;
  }
};

var ParticleSystem = function(position) { // creates the Particle System class called in setup
  this.origin = position.copy(); // sets the origin as the position 
  this.particles = []; //creates an array for multiple particles
};

ParticleSystem.prototype.addParticle = function() { // pushparticles into array
  this.particles.push(new Particle(this.origin));
};

ParticleSystem.prototype.run = function() { //creates the array that spits out particles and kills them off if they isDead
  for (var i = this.particles.length-1; i >= 0; i--) {
    var p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};