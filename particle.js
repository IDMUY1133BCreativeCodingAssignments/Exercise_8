//commented out http://p5js.org/examples/examples/Simulate_Particle_System.php

var system;

function setup() {
  createCanvas(720, 400);
  system = new ParticleSystem(createVector(width/2, 50));//origin where particles begin
}

function draw() {
  background(51);//gray
  system.addParticle();//function that adds new particle is called
  system.run();//calls function that includes display and update
}

// A simple Particle class
var Particle = function(position) {
  this.acceleration = createVector(0, 0.05); //accelerates down along the y axis
  this.velocity = createVector(random(-1, 1), random(-1, 0));//random x component between -1 and 1 ensures they spurt out to the left and right, random y comp. between -1 and 0 ensures it always heads down a certain amount
  this.position = position.copy();
  this.lifespan = 255.0;
};

Particle.prototype.run = function() {
  this.update();//function that calls update (updates position) 
  this.display();//calls display (displays particles); this calls functions that include other functions that include other functions. 
};

// Method to update position
Particle.prototype.update = function(){
  this.velocity.add(this.acceleration);//adding acceleration to the velocity 
  this.position.add(this.velocity);//adding velocity to the position
  this.lifespan -= 2;//keep subtrating 2 from 255; once the amount goes under 0, the particle will disappear
};

// Method to display
Particle.prototype.display = function() { //sets up shape and lifespan so shape fades out
  stroke(200, this.lifespan);
  strokeWeight(2);
  fill(127, this.lifespan); 
  ellipse(this.position.x, this.position.y, 12, 12);//actual shape that keeps returning
};

// Is the particle still useful?
Particle.prototype.isDead = function(){//causes fade out
  if (this.lifespan < 0) {//kills particle after amount of time, if I change 0 to a higher number for instance, the particles will last a shorter amount of time. 
    return true;
  } else {
    return false;
  }
};

var ParticleSystem = function(position) {
  this.origin = position.copy();
  this.particles = [];//array created in: ParticleSystem.prototype.run = function() 
};

ParticleSystem.prototype.addParticle = function() {
  this.particles.push(new Particle(this.origin));//creates new Particle at the origin point. 
};

ParticleSystem.prototype.run = function() {//creates array of particles and keeps subtracting from them once the particle is deemed "dead"/not useful in the isDead function
  for (var i = this.particles.length-1; i >= 0; i--) {
    var p = this.particles[i];
    p.run();//update and display
    if (p.isDead()) {//if not useful, get rid of particle in array
      this.particles.splice(i, 1);
    }
  }
};
