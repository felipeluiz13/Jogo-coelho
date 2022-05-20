const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var engine;
var world;
var link;
var link2;
var link3;
var air;
var cut;
var soundEat;
var soundSad;
var backSound;
var mute;
var frutaCaiu = false;

var ground;
var rope;
var rope2;
var rope3;
var fruit;
var fruitImg;
var fundo;
var bunnyImg;
var bunny;
var button;
var button2;
var button3;
var idle;
var eat;
var sad;
var balloon;

function preload () {
  fruitImg = loadImage("images/melon.png");
  fundo = loadImage ("images/background.png");
  idle = loadAnimation ("images/rabbit1.png","images/rabbit2.png","images/rabbit3.png","images/rabbit2.png")
  eat = loadAnimation ("images/eat1.png","images/eat2.png","images/eat3.png","images/eat4.png","images/eat5.png")
  sad = loadAnimation ("images/sad_1.png","images/sad_2.png","images/sad_3.png")
  eat.looping = false;
  sad.looping = false;
  air = loadSound ("sounds/air.wav")
  cut = loadSound ("sounds/rope_cut.mp3")
  soundEat = loadSound ("sounds/eating_sound.mp3")
  soundSad = loadSound ("sounds/sad.wav")
  backSound = loadSound ("sounds/sound1.mp3")
}

function setup(){
  createCanvas(500,700);
  engine = Engine.create();
  world = engine.world;
 
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50);
  imageMode(CENTER);

  ground = Bodies.rectangle(250,690,500,20,{isStatic: true});
  World.add(world,ground);

  rope = new Rope (10,{x:250,y:30});

  fruit = Bodies.circle(250,300,20)
  Composite.add (rope.body,fruit)

  link = new Link (rope,fruit);
  

  eat.frameDelay = 12;
  sad.frameDelay = 12;

  idle.frameDelay = 12;
  bunny = createSprite(400,600);
  bunny.addAnimation ("idle",idle);
  bunny.addAnimation ("eat",eat);
  bunny.addAnimation ("sad",sad)
  bunny.scale = 0.2;
  
  button = createImg ("images/cut_btn.png")
  button.size (50,50);
  button.position (225,30);
  button.mouseClicked (drop)

  button2 = createImg ("images/cut_btn.png")
  button2.size (50,50);
  button2.position (20,30);
  button2.mouseClicked (drop2);

  button3 = createImg ("images/cut_btn.png")
  button3.size (50,50);
  button3.position (50,550);
  button3.mouseClicked (drop3);

  balloon = createImg ("images/balloon.png")
  balloon.position (10,350)
  balloon.size (150,100)
  balloon.mouseClicked (airBlow)
  

  backSound.play ();
  backSound.setVolume (0.3)

  mute = createImg ("images/mute.png");
  mute.position (450,20)
  mute.size (50,50);
  mute.mouseClicked (mutar)

  rope2 = new Rope (6,{x:20,y:30}) 
  link2 = new Link (rope2,fruit);

  rope3 = new Rope (7,{x:50,y:550})
  link3 = new Link (rope3,fruit);
}

function draw(){
  background(50);
  Engine.update(engine);
  
  rect(ground.position.x,ground.position.y,500,20);
  image (fundo,250,350,500,700)
  rope.show ()
  rope2.show ()
  rope3.show ()
  if (fruit!=null ) {
    image (fruitImg,fruit.position.x,fruit.position.y,60,60);
  }
  if (fruit!=null&&fruit.position.y >= 650) {
    bunny.changeAnimation ("sad");
    if (!frutaCaiu) {
      soundSad.play ()
      frutaCaiu = true
    }
  }
  if (collide(fruit,bunny)==true) {
    bunny.changeAnimation ("eat");
    soundEat.play ();
  }
  

  drawSprites ();
}

function drop (){
  rope.break ();
  link.break ();
  link = null;
  cut.play ()
}

function drop2 (){
  rope2.break ();
  link2.break ();
  link2 = null;
  cut.play ()
}

function drop3 (){
  rope3.break ();
  link3.break ();
  link3 = null;
  cut.play ()
}

function collide (body,sprite){
  if (body!=null) {
    var D = dist (body.position.x,body.position.y,sprite.position.x,sprite.position.y);
    if (D <= 80) {
      World.remove (world,fruit);
      fruit = null;
      return true;
    }
    else {
      return false;
    }
  }
}

function airBlow () {
  Matter.Body.applyForce (fruit,{x:0,y:0},{x:0.02,y:0})
  air.play ();
  air.setVolume (0.3);
}

function mutar () {
  if (backSound.isPlaying ()) {
  backSound.pause ();
  }
  else {
  backSound.play ();
  }
}
