function StoneBlock(x,y,room)
{
    this.currentRoom = room;
    this.x2 = x*28;
    this.y2 = y*38;
    this.offsetImg = new Point(0,0);
    this.health = 4;

    this.getImage = function() { return new Point(9,6); }
    this.update = function() {  if(this.health<=0)this.currentRoom = null; }
} 
