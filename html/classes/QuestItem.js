function QuestItem(x,y,room)
{
    this.x = x;
    this.y = y;
    this.currentRoom = room;
    this.x2 = x*28;
    this.y2 = y*38;
    this.offsetImg = new Point(0,0);
    this.type = parseInt(Math.random()*3);
    this.getImage = function()
    {
        if(this.type==0)return new Point(4,4);
        if(this.type==1)return new Point(5,4);
        return new Point(5,3);
    }
    this.update = function() {} //TODO: must have update to be drawn. not well. look over this logic.
} 
