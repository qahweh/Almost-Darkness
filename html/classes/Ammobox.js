function Ammobox(x,y,room)
{
    this.x = x;
    this.y = y;
    this.imgx = 2;
    this.imgy = 1;
    this.currentRoom = room;
    this.x2 = x*28;
    this.y2 = y*38;
    
    this.getImage = function()
{
    return new Point(2,1);
}
} 
