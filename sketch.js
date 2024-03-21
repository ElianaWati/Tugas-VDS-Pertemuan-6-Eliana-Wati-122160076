let judul;
let nama;
let nim;
let tombol;
let hello;
let objek;
let jalan = false;
let gravForce;
let windForce;

/*
Exercise: buatlah program seperti ini, dengan informasi 
nama dan nim pada posisi di antara Judul simulasi dan tombol.
*/

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  tombol = createButton('Jalankan/Pause')
  tombol.position(100,140)
  
  objekPos = createVector(width/10,height/2);
  objekVel = createVector(0,0);
  objekAcc = createVector(0,0);
  objekMass = 10;
  objek = new Mover(objekPos, objekVel, objekAcc, objekMass);
  
  gravForce = createVector(0, objek.mass*0.1);
  windForce = createVector(0.5, 0);
}


function draw() {
  background(220);
  judul = createElement('h2', 'Simulasi Hukum Newton I')
  judul.position(30, 15)
  nama = createElement('h2', 'Nama : Eliana Wati')
  nama.position(30, 50)
  nim = createElement('h2', 'NIM : 122160076')
  nim.position(30, 80)
  objek.display();
  
  var Cd = 0.0001;
  var diam1 = (2*objek.mass);
  var A1 = PI*diam1/2;
  var frictionForce = objek.velocity.copy();
  frictionForce.normalize()
  frictionForce.mult(-1* (frictionForce.mag()**2) *A1*Cd)

  
  objek.applyForce(gravForce);
  objek.applyForce(windForce);
  objek.applyForce(frictionForce);
  
  
  
  tombol.mousePressed(run);
  
  if (jalan){
    objek.update();
  }
  
}

function sayHello() {
  hello = createElement('h2', 'Selamat datang ' + nama.value())
  hello.position(30, 100)
}

function run(){
  // objek.update();
  if (jalan){
    jalan = false;
  }
  else{
    jalan = true
  }
}

class Mover {
  constructor(loc, vel, acc, m){
    this.location = loc;
    this.mass = m;
    this.velocity = vel;
    this.acceleration = acc;
  }
  update(){
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
  }
  display(){
    noStroke();
    fill('black')
    ellipse(this.location.x, this.location.y, 2*this.mass, 2*this.mass);
  }  
  
  applyForce(force){
    force.div(this.mass)
    this.acceleration.add(force);
  }

}
