function Human(x,y,room) //should be called Piece or Character to be a common class
{
    this.x = x;
    this.y = y;
    this.currentRoom = room;
    this.imgx = 0;
    this.imgy = 0;

this.moveLeft = function()
{
    if(this.hurt)return;
    var t = this.currentRoom.getTile(this.x-1,this.y);
    var p = this.currentRoom.getPiece(this.x-1,this.y);
    this.x--;
 if(p != null && this.pieceEvent(p))this.x++;
    if(t==1 || t==2)this.x++;
}


};

Human.prototype.moveRight = function()
{
     if(this.hurt)return;
    var t = this.currentRoom.getTile(this.x+1,this.y);
    var p = this.currentRoom.getPiece(this.x+1,this.y);
    this.x++;
    if(p != null && this.pieceEvent(p))this.x--;
    if(t==1 || t==2)this.x--;
}


Human.prototype.moveUp = function()
{
     if(this.hurt)return;
    var t = this.currentRoom.getTile(this.x,this.y-1);
    var p = this.currentRoom.getPiece(this.x,this.y-1);
     this.y--;
    if(p != null && this.pieceEvent(p))this.y++;
   if(t==1 || t==2)this.y++;
}

Human.prototype.moveDown = function()  //do not use prototype function if hard to over ride.
{
     if(this.hurt)return;
    var t = this.currentRoom.getTile(this.x,this.y+1);
    var p = this.currentRoom.getPiece(this.x,this.y+1);
     this.y++;
   if(p != null && this.pieceEvent(p))this.y--;
  
if(t==1 || t==2)this.y--;
}

Human.prototype.pieceEvent = function(piece)
{
    if(piece instanceof Ammobox){piece.currentRoom = null; ammo++; return false;} //todo: remove from piece list. fishman should not pickup ammobox.
    return true;
}
