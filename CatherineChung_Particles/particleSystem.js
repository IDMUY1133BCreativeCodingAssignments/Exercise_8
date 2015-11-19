//REFERENCE: NATURE OF CODE 


function ParticleS(loc){
	this.place = loc.copy();
	this.particle = [];
///pushing new particle into empty array
ParticleS.prototype.addParticle= function(){
	this.particle.push(new Particle(this.place));
}
//as it goes through the array, create particles 

ParticleS.prototype.go= function(){

	for(var i = this.particle.length-1; i >=0; i--){
		 var d = this.particle[i];
		d.go();
	}

}

}