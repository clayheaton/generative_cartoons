function DNA(){
  this.bg        = null;
  this.figures   = [];
  this.punchline = "Text not assigned."
  
  this.initAsRandom = function(){
    this.bg = backgrounds[Math.floor(Math.random()*backgrounds.length)];
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
  
}