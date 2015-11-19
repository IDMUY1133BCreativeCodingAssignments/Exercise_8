//var clouds;
var particles=[];
var lifespan=255;

function setup(){
    createCanvas(600,400);
    //clouds=new Dots();
    //system=new System();
}

function draw(){
    background(255);
    //system.addParticle();
    particles.push(new Dots());
    //system.run();
    for (var i = particles.length-1; i >= 0; i--) {
        var p = particles[i];
        p.update();
        p.display();
        if (lifespan<0) {
            particles.splice(i, 1);
        }
    }
}

//class for particles
function Dots(){
    this.acceleration=createVector(random(-.1,.1),random(-.1,.1));
    this.speed=createVector(random(-1,1),random(-1,1));
    this.position=createVector(mouseX,mouseY);
    this.lifespan=255;
}

Dots.prototype.update=function(){
    this.speed.add(this.acceleration);
    this.position.add(this.speed);
    this.lifespan-=1;
}

Dots.prototype.display=function(){
    //fill(150);
    //ellipse(mouseX,mouseY,10,10);
    stroke(200, this.lifespan);
    strokeWeight(2);
    var randColor=color(random(0,255),random(0,255),random(0,255));
    fill(randColor, this.lifespan);
    ellipse(this.position.x, this.position.y, 12, 12);
}