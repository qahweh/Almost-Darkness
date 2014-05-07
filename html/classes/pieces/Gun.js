function Gun(x,y,room)
{
    this.currentRoom = room;
    this.x2 = x*28;
    this.y2 = y*38;
    this.offsetImg = new Point(0,0);
    this.getHeight = function(){ return 0;}
    this.getTall = function(){ return 5;}
    this.getImage = function() { return new Point(6,9); }
    this.update = function() {} //TODO: must have update to be drawn. not well. look over this logic.
} 
