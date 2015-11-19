// this was all adapted from the example on the p5 website. http://p5js.org/examples/examples/Simulate_Particle_System.php

var particleSys; 

function setup(){ 
createCanvas(900, 800);
particleSys= new ParticleSystem(createVector(width/2, 110));
}

function draw(){ 
background(30,20,10,100); 
//particleSys.addParticle();
//particleSys.run();
}

//Class of ParticleSys 
var Particles = function(loc){
this.acc = createVector (0,1); //acceleration vector x component 0, y component 1 
this.speed=createVector(1,3); //speed vector x component 1, y component 3 
this.loc=loc.copy()
this.life=125; 
};

Particles.prototype.run=function(){ //when particleSys is run, this is what happens, eventually the screen will hold flashing particles that wither away
this.speed.add(this.loc); 
this.loc.add(this.acc);
this.life-=4; 
}; 

Particles.prototype.display= function(){ //smileys show up dispersing across screen
	stroke(225,this.life%2); 
	fill(255,255,0); 
	ellipse(this.position.x+10, this.position.y+10,20,20); //yellow face
	fill(0); 
	ellipse(this.position.x+15, this.position.y+15,6,6); //eye 1
	ellipse(this.position.x+5, this.position.y+15,6,6); //eye 2
	line(this.position.x+6,this.position.y+2,this.position.x+13,this.position.y+5); // ":/"" face
};

Particles.prototype.noLife=function(){ //dissipation after lifespan via if statement
if (this.life<0){
return true; 
} else { 
return false; 
}
};

var ParticleSys=function(loc) { 
	this.origin=loc.copy();
	this.partArray = []; //creating new array for particles
};

ParticleSys.prototype.addParticle=function(){ //putting living particles in array 
	this.partArray.push(new Particles(this.origin));
}; 

ParticleSys.prototype.run = function(){
	for(var j = this.partArray.length-1; j>=0; j--){
		var f = this.partArray[j];
		f.run();
		if(f.noLife()){
			this.partArray.splice(i,1); //taking dead particles out of array 
		}
	}
}; 

