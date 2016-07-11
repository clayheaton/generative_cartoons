
function Cartoon(dna){
  this.dna = dna;
  
  this.adjustPositions = function(posX,posY){
    for (var p = 0; p < this.dna.figures.length; p++){
      var person = this.dna.figures[p];
      person.fixPosition(posX,posY);
    }
  }
  
  this.display = function(posX,posY){
    this.dna.bg.setScaleByPixelHeight(bgHeightInPixels);
    this.dna.bg.display(posX,posY);
    
    for (var p = 0; p < this.dna.figures.length; p++){
      var person = this.dna.figures[p];
      person.display(posX,posY);
    }
  }
}