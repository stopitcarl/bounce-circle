CANVAS_SIZE = 600;
BACKGROUND_COLOR = 220;

GROUND_HEIGHT = 40;
GRAVITY = 0.1;
var walls = [];

class Circle {
  constructor(x, y, radius) {
    this.pos = createVector(x, y);
    this.radius = radius;
    this.diameter = radius + radius;
    this.vel = createVector(0, 0);

  }

  update() {
    // Apply gravity
    this.vel.y += GRAVITY;

    // Update position
    this.pos.add(this.vel);

    // Check for collision with walls
    for (var i = 0; i < walls.length; i++) {
      let wall = walls[i];
      let col = wall.collide(this);
      if (col) {
        console.log("Collision!");
        // let speed = this.vel.mag();
        this.vel.y = -1;
        this.pos.y = 100;
        // this.pos = p5.Vector.add(col, p5.Vector.sub(col, this.pos).setMag(this.radius));
      }
    }
  }

  draw() {
    ellipse(this.pos.x, this.pos.y, this.diameter, this.diameter);
  }
}

class Line {
  constructor(x, y, x2, y2) {
    this.x = x;
    this.y = y;
    this.x2 = x2;
    this.y2 = y2;

    this.AB = createVector(x2 - x, y2 - y);
    this.A = createVector(x, y);
  }

  collide(c) {
    let AC = createVector(c.pos.x - this.x, c.pos.y - this.y);

    let AD = p5.Vector.mult(this.AB, (this.AB.dot(AC)) / (this.AB.dot(this.AB)))
    let D = p5.Vector.add(this.A, AD);
    ellipse(D.x, D.y, 10, 10);


    // Check if the intersection point is inside circle
    if (dist(c.pos.x, c.pos.y, D.x, D.y) < c.radius)
      return D;
    else
      return null;

  }

  draw() {
    line(this.x, this.y, this.x2, this.y2);
  }
}


var ground = null;
var circle = null;

function setup() {
  // setup 
  createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  walls.push(new Line(30, CANVAS_SIZE - GROUND_HEIGHT, CANVAS_SIZE - 30, CANVAS_SIZE - GROUND_HEIGHT));
  circle = new Circle(200, 200, 50);
}

function draw() {
  // Clear background
  background(BACKGROUND_COLOR);

  // Update physics
  circle.update();

  // draw  
  for (var i = 0; i < walls.length; i++)
    walls[i].draw();

  circle.draw();

}