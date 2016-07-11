// This is an image of a person with the size and position specified.

function Person(img){
  this.figure       = img;
  this.figureScale  = 1.0;
  this.positionSlot = 0;
  this.drawX = 0;
  this.drawY = 0;
  
  // Both x and y are between minX,maxX and minY,maxY. The value is mapped to the 
  // width of the background. Or something like that.
  this.pos = createVector(0,0);
  
  this.determineX = function(totalSlots){
    var slotWidth = 0;;
    if(totalSlots == 1){
      this.pos.x = random(minX,maxX);
    } else {
      slotWidth = 1.0 / totalSlots;
      this.pos.x = ((this.positionSlot-1) * slotWidth) + random(0,slotWidth/3);
    }
    
    if (this.pos.x < 0.05){
      this.pos.x = 0.05;
    }
  }
  
  this.fixPosition = function(posX,posY){
    var pixelsTall = floor(this.figureScale * bgHeightInPixels);
    this.figure.setScaleByPixelHeight(pixelsTall);
    
    // This assumes that the backgrounds are square and will fall apart if not.
    this.drawX = posX + bgHeightInPixels*this.pos.x;
    this.drawY = posY + bgHeightInPixels*this.pos.y;
    
    // Need to adjust the drawY so that we don't hang off the bottom.
    var figBottom = this.drawY + this.figure.display_height;
    if (figBottom > posY + bgHeightInPixels){
      var yAdj = (posY + bgHeightInPixels - 10 - figBottom) / bgHeightInPixels;
      this.pos.y += yAdj;
      this.drawY = posY + bgHeightInPixels*this.pos.y;
    }
    
    // We want the bottom of the figure to be near the bottom of the background. 
    // This checks and adjusts if necessary.
    var threeQuarterHeight = floor((posY + bgHeightInPixels)*0.75);
    if (figBottom < threeQuarterHeight){
      var adjustment = (threeQuarterHeight - figBottom) / bgHeightInPixels;
      this.pos.y += adjustment;
      this.drawY = posY + bgHeightInPixels*this.pos.y;
    }
    
    // Need to adjust the drawX.
    // Assumes that the background images are square.
    var figRight = this.drawX + this.figure.display_width;
    if (figRight > posX + bgHeightInPixels){
      var adjX = (figRight - (posX + bgHeightInPixels)) / bgHeightInPixels;
      this.pos.x -= adjX;
      this.drawX = posX + bgHeightInPixels*this.pos.x;
    }
  }
  
  this.display = function(posX,posY){
    this.figure.display(this.drawX,this.drawY);
  }
}