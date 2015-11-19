//Nature of Code by Dan Shiffman
//chapter 4: Particle

//particles respon to force vectors --> applyForce()
//particles can rotate --> add angular velocity

function Particle(tempX, tempY){
  //A “Particle” object is just another name for “Mover.” It has location, velocity, and acceleration.
  this.location = createVector(tempX, tempY);
  this.velocity = createVector(random(-2, 1), random(-2, 0));
  this.acceleration = createVector(0, 0.05);

  this.lifespan = 255.0; //how long the particles will be "alive" for
 
  } //function Particle()
 
  Particle.prototype.update = function() {
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);

    this.lifespan -= 3;
  } //update

 
  Particle.prototype.display = function() {
    noStroke();
    fill(222, 178, 62, this.lifespan); //lifespan is from 255 to 0, works as alpha
    triangle(this.location.x, this.location.y, this.location.x - 8, this. location.y-8, this.location.x + 5, this.location.y - 5);

  
  } //display

