function Particle(tempX,tempY){
	this.location = createVector(tempX,tempY);
	this.velocity = createVector(random(-10,12),random(-10,5));
	this.acceleration = createVector(0,0.1);

	this.lifespan = 150;
};

Particle.prototype.update= function(){
	this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.lifespan -= 2;

};


Particle.prototype.display = function(){
	fill(random(150),random(243),231);
	ellipse(this.location.x,this.location.y, this.lifespan, this.lifespan);
};

Particle.prototype.isDead = function(){
  if (this.lifespan < 0) {
    return true;
  } else {
    return false;
  }
};

