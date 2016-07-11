// This is a simple wrapper on PImage to make it easier to 
// scale and display the images.

function SpecialImage(imgString){
  var self                   = this;
  this.ready                 = false;
  this.default_width         = 0;
  this.default_height        = 0;
  this.display_height        = 0;
  this.display_width         = 0;
  
  this.img                   = loadImage(imgString, function(img){
    self.default_width       = img.width;
    self.default_height      = img.height;
    self.display_width       = img.width;
    self.display_height      = img.height;
    self.ready = true;
  });
  
  this.setScaleByPercent = function(dScale){
    if(this.ready){
      this.display_height = dScale * this.default_height;
      this.display_width  = dScale * this.default_width;
    }
  }
  
  this.setScaleByPixelHeight = function(pixels_high){
    if(this.ready){
      var dScale = pixels_high / this.default_height;
      this.display_height = dScale * this.default_height;
      this.display_width  = dScale * this.default_width;
    }
  }
  
  this.display = function(xPos,yPos){
    if(this.ready){
      image(this.img,0,0,this.default_width,this.default_height,xPos,yPos,this.display_width,this.display_height);
    }
  }
  
}