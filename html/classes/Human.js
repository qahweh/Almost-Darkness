function Human(x,y,room)
{
    this.x = x;
    this.y = y;
    this.currentRoom = room;
    this.imgx = 0;
    this.imgy = 0;
};

Human.prototype.moveRight = function()
{
    this.x++;
    var t = this.currentRoom.getTile(this.x,this.y);
    var p = this.currentRoom.getPiece(this.x,this.y);
    if(p != null)this.x--;
    if(t==1 || t==2)this.x--;
}

Human.prototype.moveLeft = function()
{
    this.x--;
    var t = this.currentRoom.getTile(this.x,this.y);
    var p = this.currentRoom.getPiece(this.x,this.y);
     if(p != null)this.x++;
   if(t==1 || t==2)this.x++;
}

Human.prototype.moveUp = function()
{
    this.y--;
    var t = this.currentRoom.getTile(this.x,this.y);
    var p = this.currentRoom.getPiece(this.x,this.y);
     if(p != null)this.y++;
   if(t==1 || t==2)this.y++;
}

Human.prototype.moveDown = function()
{
    this.y++;
    var t = this.currentRoom.getTile(this.x,this.y);
    var p = this.currentRoom.getPiece(this.x,this.y);
      if(p != null)this.y--;
  if(t==1 || t==2)this.y--;
}
