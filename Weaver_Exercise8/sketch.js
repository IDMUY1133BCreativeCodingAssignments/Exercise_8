/* used some code from the Seek exercise and Nature of Code */

var particles = [];
//var par;


function setup(){
	createCanvas(700,600);

}

function draw(){
background(0);
particles.push(new Particle(350,300));
for(var i = 0; i< particles.length;i++){
	var par = this.particles[i];
	par.update();
	par.display();
	if (par.isDead()){
		this.particles.splice(i,1);
	};
}

}