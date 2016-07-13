
/* The target is set by the critic, who has a somewhat random sense of humor. */
function Critic(){

  this.cAngryMost = new SpecialImage("images/critic/critic05.png", function(){critic_avatars_loaded += 1;});
  this.cAngry     = new SpecialImage("images/critic/critic04.png", function(){critic_avatars_loaded += 1;});
  this.cNeutral   = new SpecialImage("images/critic/critic01.png", function(){critic_avatars_loaded += 1;});
  this.cHappy     = new SpecialImage("images/critic/critic02.png", function(){critic_avatars_loaded += 1;});
  this.cHappyMost = new SpecialImage("images/critic/critic03.png", function(){critic_avatars_loaded += 1;});
  
  this.draw_scale   = 1.0;
  this.pixels_high  = 200;
  
  this.use_draw_scale  = false;
  this.use_pixels_high = false;
  
  // This is the target for the critic
  this.preference = new DNA();
  this.preference.initAsRandom();
  
  // Store the population of comics
  this.comicBook             = [];
  this.comicBookTotalFitness = 0;
  
  // Index number of the first of two comics from this pool that we'll show.
  this.comicBookPage = 0;
  
  // Everything should be random the first time. 
  this.createFirstPool = true;
  
  // Track the generation;
  this.generation = 1;
  
  // Want to start over? Reset the critic.
  this.reset = function(){
    this.generation       = 1;
    this.createFirstPool  = true;
    this.comicBookPage    = 0;
    this.comicBook        = [];
    this.comicBookFitness = 0;
    
    this.preference = new DNA();
    this.preference.initAsRandom();
    
    this.commissionWork();
    loop();
  }
  
  // Commission work
  this.commissionWork = function(){
    if(this.createFirstPool) {
      for(var i = 0; i < comicBookSize; i++){
        var dna = new DNA();
        dna.initAsRandom();
        var comic = new Cartoon(dna);
        comic.fitness = this.calcFitness(comic);
        this.comicBookTotalFitness += comic.fitness;
        this.comicBook.push(comic);
      }
      this.createFirstPool = false;

    } else {
      // Subsequent generations
      this.generation += 1;
      
      // 1. Create breeding pool
      var pool = [];
      for (var i = 0; i < comicBookSize; i++){
        // Figure out what percentage of the total score
        // each comic is and populate the pool with that number.
        var comic = this.comicBook[i];
        var copiesForPool = parseInt(100*(comic.fitness / this.comicBookTotalFitness));
        for (var q = 0; q < copiesForPool; q++){
          pool.push(comic);
        }
      }
      
      // 1.5 Reset the count of the total Fitness.
      this.comicBookTotalFitness = 0;
      
      // 2. Breed to get a new population
      var newComicBook = [];
      for(var j = 0; j < comicBookSize; j++){
        // Pick two randomly from the pool.
        var shuffledPool = shuffle(pool);
        var a = shuffledPool[0];
        var b = shuffledPool[1];
        
        var dna = new DNA();
        dna.initWithGenes(a.dna,b.dna);
        
        var comic = new Cartoon(dna);
        comic.fitness = this.calcFitness(comic);
        this.comicBookTotalFitness += comic.fitness;
        newComicBook.push(comic);
      }
      
      // 3. Replace the old pool with the new pool.
      this.comicBook = newComicBook;
    }
  }
  
  this.calcFitness = function(comic){
    // Compare to this.preference
    // 1. Number of figures
    // 2. Types of figures
    // 3. Background
    // 4. Punchline structure
    // 5. Punchline string distance
    var fitness = 0;
    
    // Number of figures
    if(this.preference.figures.length == comic.dna.figures.length){ fitness += 15; }
    
    // Types of figures
    var a, b;
    for (var i = 0; i < this.preference.figures.length; i++){
      a = this.preference.figures[i].figure;
      
      for (var j = 0; j < comic.dna.figures.length; j++){
        b = comic.dna.figures[j].figure;
        if (a === b) { fitness += 5; }
      }
    }
    
    // Background
    if(this.preference.bg === comic.dna.bg) { fitness += 10; }
    
    // Punchline Structure
    if(this.preference.pl_structure === comic.dna.pl_structure) { fitness += 20; }
    
    // String similarity
    var distMeasure = stringDistance(this.preference.punchline, comic.dna.punchline);
    fitness += (max(50 - distMeasure,0));
    
    return fitness;
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
    
    
    // Reset to zero for now.
    if(this.comicBookPage > comicBookSize - 1){
      // Commission new work.
      this.commissionWork();
      this.comicBookPage = 0;
    }
    
    var comic1 = this.comicBook[this.comicBookPage]
    var comic2 = this.comicBook[this.comicBookPage+1]
    this.comicBookPage += 2;
    
    comic1.adjustPositions(210,10);
    comic1.display(210,10);
    
    comic2.adjustPositions(210 + bgHeightInPixels + 10,10);
    comic2.display(210 + bgHeightInPixels + 10,10);
    
  }
  
  this.display = function(){
    this.displayBorder();
    textAlign(CENTER);
    textSize(18);
    fill(0);
    text("Comic Critic",100,25);
    
    textSize(14);
    textAlign(LEFT);
    var inst = "The Comic Critic has a preference for certain types of cartoons. Each generation, ";
    inst += "he commissions " + comicBookSize + " cartoons based on his enjoyment of the previous generation.\n\nClick to view ";
    inst += "cartoons in each generation.\n\nAfter " + parseInt(comicBookSize / 2) + " clicks, the critic commissions the next generation.";
    inst += "\n\nPress 'r' to reset.";
    
    text(inst,10,160,190,280);
    
    textAlign(LEFT);
    text("Generation " + this.generation,10,450);
    
    // TODO: Change attitude.
    
    if(this.use_draw_scale){
      this.cNeutral.setScaleByPercent(this.draw_scale);
    } else if (this.use_pixels_high){
      this.cNeutral.setScaleByPixelHeight(this.pixels_high);
    }
    this.cNeutral.display(50,40);
  }
  
  this.displayBorder = function(){
    noStroke();
    fill("#efefef");
    rect(0,0,200,bgHeightInPixels+10);
  }
}