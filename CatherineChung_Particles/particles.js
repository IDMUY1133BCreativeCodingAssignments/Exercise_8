//REFERENCE: NATURE OF CODE 


function Particle(loc){
	//setting constructors and variables 
	//tested out different vector quantities for acceleration and velocity
	this.loc = loc.copy();
	//this.velocity = createVector(0,0);
	this.velocity = createVector(0,0.01);
	//this.acceleration = createVector(0,0);
	//this.acceleration = createVector(0.9,-0.5);
	//this.acceleration = createVector(random(-1,0), random(-1,0));
	this.acceleration = createVector(random(-1,1),random(-1,1));

	this.lifespan = 255.0;

	//have the update and display function in one 
	//having it separate doesn't work for some reason
	Particle.prototype.go = function(){
		this.update();
		this.display();
	}
	//updating particles function 
	Particle.prototype.update= function(){
		this.velocity.add(this.acceleration);
		this.loc.add(this.velocity);
		this.lifespan -= 1;
	}
	//displaying the particles
	Particle.prototype.display= function(){
		stroke(0);
		fill(random(255),200,random(123));
		rect(this.loc.x,this.loc.y,10,10);


	}
	
	// checking to see if the particle is done falling with this.lifespan
	Particle.prototype.isDead = function(){
		if(this.lifespan<0){
			return true;
		}
		else
		{
			return false;
		}
	}

}