
var bgHeight = 450;

/* Variables for the images I drew */
var p01, p02, p03, p04, p05, p06, p07, p08, p09, p10, p11, p12, p13, p14, p15;
var bg01, bg02, bg03, bg04, bg05, bg06, bg07, bg08, bg09;

var backgrounds = [];
var people      = [];

var minScale = 0.6;
var maxScale = 0.7;
var minX     = 0.05;
var maxX     = 0.8;
var minY     = 0.25;
var maxY     = 0.5;

// How many people can be in a cartoon.
var minPeople = 1;
var maxPeople = 3;

var bgHeightInPixels = 450;

var critic;
var comicBookSize = 10; // (population...)

function preload(){
  /* Load the cartoon character images */
  p01 = new SpecialImage("images/people/person01.png");
  p02 = new SpecialImage("images/people/person02.png");
  p03 = new SpecialImage("images/people/person03.png");
  p04 = new SpecialImage("images/people/person04.png");
  p05 = new SpecialImage("images/people/person05.png");
  p06 = new SpecialImage("images/people/person06.png");
  p07 = new SpecialImage("images/people/person07.png");
  p08 = new SpecialImage("images/people/person08.png");
  p09 = new SpecialImage("images/people/person09.png");
  p10 = new SpecialImage("images/people/person10.png");
  p11 = new SpecialImage("images/people/person11.png");
  p12 = new SpecialImage("images/people/person12.png");
  p13 = new SpecialImage("images/people/person13.png");
  p14 = new SpecialImage("images/people/person14.png");
  p15 = new SpecialImage("images/people/person15.png");
  
  people.push(p01);
  people.push(p02);
  people.push(p03);
  people.push(p04);
  people.push(p05);
  people.push(p06);
  people.push(p07);
  people.push(p08);
  people.push(p09);
  people.push(p10);
  people.push(p11);
  people.push(p12);
  people.push(p13);
  people.push(p14);
  people.push(p15);
  
  /* Load the background images */
  bg01 = new SpecialImage("images/backgrounds/bg01.png");
  bg02 = new SpecialImage("images/backgrounds/bg02.png");
  bg03 = new SpecialImage("images/backgrounds/bg03.png");
  bg04 = new SpecialImage("images/backgrounds/bg04.png");
  bg05 = new SpecialImage("images/backgrounds/bg05.png");
  bg06 = new SpecialImage("images/backgrounds/bg06.png");
  bg07 = new SpecialImage("images/backgrounds/bg07.png");
  bg08 = new SpecialImage("images/backgrounds/bg08.png");
  bg09 = new SpecialImage("images/backgrounds/bg09.png");
  
  backgrounds.push(bg01);
  backgrounds.push(bg02);
  backgrounds.push(bg03);
  backgrounds.push(bg04);
  backgrounds.push(bg05);
  backgrounds.push(bg06);
  backgrounds.push(bg07);
  backgrounds.push(bg08);
  backgrounds.push(bg09);
  
  /* Create the Critic */
  critic = new Critic();
  critic.setScaleByPercent(0.6);
  critic.commissionWork();
}

function setup() {
  createCanvas(1200,500);

  background(255);
}

function draw() {
  background(255);
  critic.display();
  critic.displayPage();
  
  noLoop();
}

function mouseClicked(){
  loop();
}
