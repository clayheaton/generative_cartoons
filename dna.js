function DNA(){
  this.bg           = null;
  this.figures      = [];
  this.pl_structure = null;
  this.punchline    = "Text not assigned."
  
  // After the initial population, use this to breed "parents"
  this.initWithGenes = function(dna1,dna2){

    // Pick the background
    if(random(0,1) <= mutationChance){
      // New random background
      this.setRandomBackground();
    } else {
      // 50/50 chance of getting from one of the "parents"
      if(random(0,1) <= 0.5){
        this.bg = dna1.bg;
      } else {
        this.bg = dna2.bg;
      }
    }
    
    // Pick the figures
    if(random(0,1) <= mutationChance){
      // New random figures
      this.figures = [];
      this.setRandomFigures();
    } else {
      // 50/50 chance of getting figures from one of the "parents"
      if(random(0,1) <= 0.5){
        this.figures = dna1.figures;
      } else {
        this.figures = dna2.figures;
      }
    }
    
    // Pick the punchline structure
    if(random(0,1) <= mutationChance){
      // New random punchline structure
      this.setRandomPunchlineStructure();
    } else {
      // 50/50 chance of getting the punchline structure from one of the "parents"
      if(random(0,1) <= 0.5){
        this.pl_structure = dna1.pl_structure;
      } else {
        this.pl_structure = dna2.pl_structure;
      }
    } 
    
    // Pick the punchline 
    if(random(0,1) <= mutationChance){
      // New random punchline 
      this.createRandomPunchline();
    } else {
      // 50/50 chance of getting the punchline from one of the "parents"
      if(random(0,1) <= 0.5){
        this.punchline = dna1.punchline;
      } else {
        this.punchline = dna2.punchline;
      }
    } 
    
  }
  
  // We need to randomly assign a background in the initial population
  this.setRandomBackground = function(){
    this.bg = backgrounds[Math.floor(Math.random()*backgrounds.length)];
  }
  
  
  // We need to randomly populate figures in the initial population
  this.setRandomFigures = function(){
    var numPeople = floor(random(minPeople,maxPeople + 1));
    var a = shuffle(people,false);
    
    // Identify slots for the people and shuffle
    var slots          = [];
    for (var k = 0; k < numPeople; k++){
      slots.push(k+1);
    }
    var shuffled_slots = shuffle(slots);
    
    for (var i = 0; i < numPeople; i++){
      var p = new Person(a[i]);
      
      var randomScale = random(minScale,maxScale);
      p.figureScale   = randomScale;
      
      // x positioning
      p.positionSlot  = shuffled_slots[i];
      p.determineX(numPeople);
      
      var randomY     = random(minY,maxY);
      p.pos.y         = randomY;
      
      this.figures.push(p)
    }
  }
  
  // This randomly sets a grammatical structure for a punchline.
  this.setRandomPunchlineStructure = function(){
    this.pl_structure = punchline_structures[Math.floor(Math.random()*punchline_structures.length)];
  }
  
  // This creates a random punchline based on the structure available.
  this.createRandomPunchline = function(){
    this.punchline = "";
    for (var w = 0; w < this.pl_structure.length; w++){
      var word = this.randomWordForType(this.pl_structure[w]);
      this.punchline += word;
      if (w < this.pl_structure.length - 1){
        var next_structure = this.pl_structure[w+1];
        if (next_structure == "." || 
            next_structure == ":" || 
            next_structure == ","){
          // No space following  next_structure == "''" || next_structure == '``'
          continue;
        } else {
          this.punchline += " ";
        }
      }
    }
    
    // Clean up the generated punchline.
    // This isn't working  - need to use regex.
    // this.punchline = this.punchline.replace(" i."," I.");
    // this.punchline = this.punchline.replace("I is","I am");
    // 
    this.punchline = this.applySentenceCase(this.punchline);
    this.punchline = this.punchline.replace(/i(?=[\s.,!"'\b])/g, "I");
    this.punchline = this.punchline.replace(" 's","'s");
    this.punchline = this.punchline.replace("s ' ","s' ");
    this.punchline = this.punchline.replace(/(I is )/g,"I am ");
    this.punchline = this.punchline.replace(/(Him is )/g,"He is ");
    // print(this.punchline);
  }
  
  // This method is used to create the initial population of comics. 
  this.initAsRandom = function(){
    this.setRandomBackground();
    this.setRandomFigures();
    this.setRandomPunchlineStructure();
    this.createRandomPunchline();
  }
  
  // Returns a word matching a grammatical type
  this.randomWordForType = function(word_type){
    var wl = punchline_vocabulary[word_type];
    var w  = wl[Math.floor(Math.random()*wl.length)];
    return w;
  }
  
  // http://stackoverflow.com/a/20442069/373402
  this.applySentenceCase = function(str) {
    return str.replace(/.+?[\.\?\!](\s|$)/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}
  
}