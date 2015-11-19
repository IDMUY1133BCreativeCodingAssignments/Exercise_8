var part;
var Y_AXIS = 1;
var c1, c2;

function setup(){
	createCanvas(800,800);
	frameRate(20);			//slowed it down because it was too fast
	c1 = color(0);
 	c2 = color(153, 102, 0);
	part = new ParticleSystem(createVector(400,600));			//i made two of these to have more particles spew out
	part2 = new ParticleSystem(createVector(400,600));
}

function draw(){
	setGradient(0, 0, width, height, c1, c2, Y_AXIS);		//looked up how to make a gradient background for fun
	noStroke();
	fill(80,40,0);
	part.addParticle();
	part.run();
	part2.addParticle();
	part2.run();
	fill(80,40,0);
	quad(350,500,450,500,500,800,300,800);			//decided to make a volcano :D
	

}

function Particle(pos){							//particle class for an invididual particle
	this.velocity = createVector(0,-50);
	this.acceleration = createVector(random(-5,5), random(-5,5));
	this.pos = pos.copy();	
	this.lifespan = 255;

}

Particle.prototype.run = function(){		//combines both functions for convenience
	this.update();
	this.display();
}

Particle.prototype.update = function(){
	this.velocity.add(this.acceleration);
  	this.pos.add(this.velocity);
  	this.lifespan -= 10;

}

Particle.prototype.display = function(){
	fill(255, random(255), 0, this.lifespan);
	ellipse(this.pos.x, this.pos.y, 20, 20);


}

Particle.prototype.dead = function(){
	if(this.lifespan < 0){
		return true;
	}else{
		return false;
	}
}

function ParticleSystem(pos){		//make a particle system that starts from pos
	this.center = pos.copy();
	this.particles = [];
}

ParticleSystem.prototype.addParticle = function(){
	this.particles.push(new Particle(this.center));		//push adds a particle to the array, creating a new particle
}

ParticleSystem.prototype.run = function() {
  for (var i = this.particles.length-1; i >= 0; i--) {	//loop backwards to remove
    var p = this.particles[i];
    p.run();
    if (p.dead()) {						//check to see if the particle is dead
      this.particles.splice(i, 1);		//splice = remove
    }
  }
};

function setGradient(x, y, w, h, c1, c2, axis) {		//this part was just looked up for aesthetics
														//http://p5js.org/examples/examples/Color_Linear_Gradient.php
  noFill();		

  if (axis == Y_AXIS) {  // Top to bottom gradient
    for (var i = y; i <= y+h; i++) {
      var inter = map(i, y, y+h, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x+w, i);
    }
  }
} 