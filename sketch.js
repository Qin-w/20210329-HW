let jsonobj;
let btns = [];
let u = 0 ;

function preload(){
  jsonobj = loadJSON('data.json');  // ./folder/fileName
  img = loadImage('map.jpg');
}

function setup() {
  createCanvas(360, 400);
  console.log(jsonobj);
  jsonobj.features.forEach((v)=>{
    let lat = v.geometry.coordinates[0];
    let lang = v.geometry.coordinates[1];
    let mag = v.properties.mag;
    noStroke();
    fill(255,0,255, mag*mag * 2);
    btns.push(new btn((lat + 180), 180 - (lang + 90),mag*6));
    //circle(lat + 180, 180 - (lang + 90),mag*mag/2+10*sin(u));
  });

}

function draw() {
  //background(220);
  image(img,0,0,360,180);
  push();
  fill(0, 102, 153);
  textSize(24);
  text(jsonobj.metadata.title, 10, 210);
  pop();
  btns.forEach((b)=>{
    b.display();
  });
  //console.log(jsonobj.features[val].geometry.coordinates);
}

class btn{
  constructor(x,y,size){
    this.x = x;
    this.y = y;
    this.size = size;
  }
  display(){
    if (mouseX > this.x - this.size/2 && 
        mouseX < this.x + this.size/2 &&
        mouseY > this.y - this.size/2 &&
        mouseY < this.y + this.size/2){
        fill(255,0,0, this.size* 2);
        rect(this.x-(this.size/2),this.y-(this.size/2),this.size,this.size);
        push();
        fill(255);
        rect(0,220,360,110);
        fill(0, 102, 153);
        textSize(24);
        text("經度："+this.x, 10, 250);
        text("緯度："+this.y, 10, 280);
        text("震度："+this.size/6, 10, 310);
        pop();

    }
    else{
        fill(10,10,255, this.size* 2);
        u = u+0.0002;
        circle(this.x,this.y,this.size+5*sin(u));
        
    }
    noStroke();
    //circle(this.x,this.y,this.size);
  }
}