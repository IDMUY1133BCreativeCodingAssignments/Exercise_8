//Exercise 8 
//creative coding   19 November 2015

//Nature of Code by Dan Shiffman
//chapter 4: Particle

var sparks = [];

function setup(){
	createCanvas(500, 500);

	//par = new Particle(mouseX, mouseY);

	/*for(var i = 0; i < 100; i++){
		sparks[i] = new Particle(mouseX, mouseY);
	}*/

} //void setup()



function draw(){
	sparks.push(new Particle(mouseX, mouseY));
	background(0);
	for (var i = 0; i < sparks.length; i++){
		
		var p = sparks[i];
		p.update();
		p.display();
		
	}

	

} //void draw()

