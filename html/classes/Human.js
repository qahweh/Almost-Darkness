function Human(x,y,room)
{
    this.x = x;
    this.y = y;
    this.currentRoom = room;
};

Human.prototype.moveRight = function()
{
    this.x++;
    var t = this.currentRoom.getTile(this.x,this.y);
    if(t==1 || t==2)this.x--;
}

Human.prototype.moveLeft = function()
{
    this.x--;
    var t = this.currentRoom.getTile(this.x,this.y);
    if(t==1 || t==2)this.x++;
}

Human.prototype.moveUp = function()
{
    this.y--;
    var t = this.currentRoom.getTile(this.x,this.y);
    if(t==1 || t==2)this.y++;
}

Human.prototype.moveDown = function()
{
    this.y++;
    var t = this.currentRoom.getTile(this.x,this.y);
    if(t==1 || t==2)this.y--;
}
