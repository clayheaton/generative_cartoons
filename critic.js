
/* The target is set by the critic, who has a somewhat random sense of humor. */
function Critic(){
  this.cAngryMost = new SpecialImage("images/critic/critic05.png");
  this.cAngry     = new SpecialImage("images/critic/critic04.png");
  this.cNeutral   = new SpecialImage("images/critic/critic01.png");
  this.cHappy     = new SpecialImage("images/critic/critic02.png");
  this.cHappyMost = new SpecialImage("images/critic/critic03.png");
  
  this.draw_scale   = 1.0;
  this.pixels_high  = 200;
  
  this.use_draw_scale  = false;
  this.use_pixels_high = false;
  
  // This is the target for the critic
  this.preference = new DNA();
  this.preference.initAsRandom();
  
  // Store the population of comics
  this.comicBook     = [];
  
  // Index number of the first of two comics from this pool that we'll show.
  this.comicBookPage = 0;
  
  // Everything should be random the first time. 
  this.createFirstPool = true;
  
  // Commission work
  this.commissionWork = function(){
    if(this.createFirstPool) {
      for(var i = 0; i < comicBookSize; i++){
        var dna = new DNA();
        dna.initAsRandom();
        var comic = new Cartoon(dna);
        this.comicBook.push(comic);
      }
    }
  }
  
  // Implements the same API as SpecialImage for displaying stuff.
  this.setScaleByPercent = function(dScale){
    this.use_draw_scale  = true;
    this.use_pixels_high = false;
    this.draw_scale      = dScale;
  }
  
  this.setScaleByPixelHeight = function(pixels_high){
    this.use_pixels_high = true;
    this.use_draw_scale  = false;
    this.pixels_high     = pixels_high;
  }
  
  this.displayPage = function(){
    var comic1 = this.comicBook[this.comicBookPage]
    var comic2 = this.comicBook[this.comicBookPage+1]
    this.comicBookPage += 2;
    
    // Reset to zero for now.
    if(this.comicBookPage > 9){
      this.comicBookPage = 0;
    }
    
    comic1.adjustPositions(210,10);
    comic1.display(210,10);
    
    comic2.adjustPositions(210 + bgHeightInPixels + 10,10);
    comic2.display(210 + bgHeightInPixels + 10,10);
    
  }
  
  this.display = function(){
    this.displayBorder();
    textSize(18);
    fill(0);
    text("Comic Critic",50,50);
    
    // TODO: Change attitude.
    
    
    if(this.use_draw_scale){
      this.cNeutral.setScaleByPercent(this.draw_scale);
    } else if (this.use_pixels_high){
      this.cNeutral.setScaleByPixelHeight(this.pixels_high);
    }
    this.cNeutral.display(50,100);
  }
  
  this.displayBorder = function(){
    noStroke();
    fill("#efefef");
    rect(0,0,200,height);
  }
}