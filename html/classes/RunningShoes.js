function RunningShoes(x,y,room)
{
    this.x = x;
    this.y = y;
    this.imgx = 2;
    this.imgy = 1;
    this.currentRoom = room;
    this.x2 = x*28;
    this.y2 = y*38;
    this.offsetImg = new Point(0,0);
    
    this.getImage = function() { return new Point(6,3); }
    this.update = function() {} //TODO: must have update to be drawn. not well. look over this logic.
} 
