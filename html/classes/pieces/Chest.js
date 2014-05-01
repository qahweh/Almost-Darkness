function Chest(x,y,room)
{
    this.currentRoom = room;
    this.x2 = x*28;
    this.y2 = y*38;
    this.offsetImg = new Point(0,0);
    this.open = ( Math.random() < 0.5);

    this.getImage = function() { if(this.open) return new Point(10,7);  return new Point(9,7); }
    this.update = function() {} //TODO: must have update to be drawn. not well. look over this logic.
} 
