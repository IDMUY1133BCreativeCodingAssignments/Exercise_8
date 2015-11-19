//REFERENCE: NATURE OF CODE 



var particle;

function setup(){

	createCanvas(500,500);
	//using particle system instead of particle because 
	//particle system contains the array
	particle = new ParticleS(createVector(width/2,height/2));
	//particles were going too fast.
	frameRate(10);
}

function draw(){
	background(0);
	particle.addParticle();
	particle.go();
	//particle.update();
	//particle.display();


}