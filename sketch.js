/* Variables for the images I drew */
var p01, p02, p03, p04, p05, p06, p07, p08, p09, p10, p11, p12, p13, p14, p15;
var bg01, bg02, bg03, bg04, bg05, bg06, bg07, bg08, bg09;

var backgrounds = [];
var people      = [];

// Some parameters for size and position of figures
var minScale = 0.6;
var maxScale = 0.7;
var minX     = 0.05;
var maxX     = 0.8;
var minY     = 0.25;
var maxY     = 0.5;

// How many people can be in a cartoon.
var minPeople = 1;
var maxPeople = 3;

// The vertical size of the background elements
var bgHeightInPixels = 450;

var critic;
var comicBookSize  = 20; // Must be an even number. (population...)
var mutationChance = 0.05;

// For the punchlines
var punchline_structures;
var punchline_vocabulary;

// This needs to be set to 5 before we display the critic:
var critic_avatars_loaded = 0;

var critic_created        = false;
var pl_structures_loaded  = false;
var pl_vocabulary_loaded  = false;

// We need this to replace some funky text in generated punchlines.
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

function preload(){
  randomSeed(1);
  /* Load the JSON files for the structures and vocabulary
     The text structure, words, and their frequency come from
     103 parsed New Yorker cartoon captions, modified to remove
     contractions and other punctuation that made them difficult
     to work with. */
     
  punchline_structures = loadJSON("data/structures.json",function(){pl_structures_loaded = true;});
  punchline_vocabulary = loadJSON("data/vocabulary.json",function(){pl_vocabulary_loaded = true;});
  
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
  
}

function setup() {
  createCanvas(1130,550);
  background(255);
}

function draw() {
  background(255);
  
  if(pl_structures_loaded && pl_vocabulary_loaded) {
    if (!critic_created){
      /* Create the Critic */
      critic = new Critic();
      critic.setScaleByPercent(0.6);
      critic.commissionWork();
      critic_created = true;
    } else if (critic_avatars_loaded == 5){
      critic.display();
      critic.displayPage();
      noLoop();
    }
  }
}

function mouseClicked(){
  loop();
}

function keyTyped(){
  if(key === "r"){
    critic.reset();
  }
}


/* This calculates the Levenshtein distance between two strings */
function stringDistance(strA,strB){
		var distArray = levenshteinenator(strA, strB);
		var strdist   = distArray[ distArray.length - 1 ][ distArray[ distArray.length - 1 ].length - 1 ];
		return strdist;
}


// Calculates the Levenshtein Distance between two strings.

/* 

This script is free to use under the license below.
No obligation, but if you use this it I'd love to know, thanks!

Andrew Hedges, andrew@hedges.name

-----------------------------------------------------------------------------

The MIT License (MIT)

Copyright (c) 2016 Andrew Hedges

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

-----------------------------------------------------------------------------
*/

var levenshteinenator = (function () {

	function levenshteinenator(a, b) {
		var cost;
		var m = a.length;
		var n = b.length;

		// make sure a.length >= b.length to use O(min(n,m)) space, whatever that is
		if (m < n) {
			var c = a; a = b; b = c;
			var o = m; m = n; n = o;
		}

		var r = []; r[0] = [];
		for (var c = 0; c < n + 1; ++c) {
			r[0][c] = c;
		}

		for (var i = 1; i < m + 1; ++i) {
			r[i] = []; r[i][0] = i;
			for ( var j = 1; j < n + 1; ++j ) {
				cost = a.charAt( i - 1 ) === b.charAt( j - 1 ) ? 0 : 1;
				r[i][j] = minimator( r[i-1][j] + 1, r[i][j-1] + 1, r[i-1][j-1] + cost );
			}
		}

		return r;
	}

	/**
	 * Return the smallest of the three numbers passed in
	 * @param Number x
	 * @param Number y
	 * @param Number z
	 * @return Number
	 */
	function minimator(x, y, z) {
		if (x <= y && x <= z) return x;
		if (y <= x && y <= z) return y;
		return z;
	}

	return levenshteinenator;

}());
