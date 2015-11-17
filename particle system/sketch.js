//reference the THE NATURE OF CODE by DANIEL SHIFFMAN aswell as http://p5js.org/examples/examples/Simulate_Particle_System.php from the p5js site.

var system //global var system 
function setup() {
  createCanvas(720, 400);
  system = new ParticleSystem(createVector(width/2, 50));//
}

function draw() {
  background(51);
  system.addParticle();//
  system.run();
}

// classs
var Particle = function(position) {
  this.acceleration = createVector(0, 0.05);//acceleration vector .05 
  this.velocity = createVector(random(-1, 1), random(-1, 0));//velocity random so it will go random places 
  this.position = position.copy();// get the position so that it wont change later (basically saving the original location)
  this.lifespan = 255.0;// how long the particle lasts
};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

//
Particle.prototype.update = function(){
  this.velocity.add(this.acceleration); //add velocity to acceleration and set to velocity then add this to the possition 
  this.position.add(this.velocity);
  this.lifespan -= 2;//decrease lifespan 
};

//display
Particle.prototype.display = function() {//lifespan is being used to manipulate opasity and other things to make the particle fade and create a smooth transition rather than falling a offscreen 
  stroke(200, this.lifespan);
  strokeWeight(2);
  fill(127, this.lifespan);
  ellipse(this.position.x, this.position.y, 12, 12);// change position after we added velocity this will create the position of x and y to move
};

// this is cheaking if the particle is past its lifespan if true its dead if false its alive 
Particle.prototype.isDead = function(){
  if (this.lifespan < 0) {//below 0 dead=true above alive=false
    return true;
  } else {
    return false;
  }
};

var ParticleSystem = function(position) {
  this.origin = position.copy();//copy position so when we use it again its not changed
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function() {
  this.particles.push(new Particle(this.origin));// and making new particle 
};

ParticleSystem.prototype.run = function() {
  for (var i = this.particles.length-1; i >= 0; i--) { //cycling through backwards to prevent errors with placement 
    var p = this.particles[i];//cycling through particles 
    p.run();//running run :)
    if (p.isDead()) {
      this.particles.splice(i, 1);//taking the particle out of array if dead
    }
  }
};