function Human(x,y,room) //should be called Piece or Character to be a common class
{
    this.x = x;
    this.y = y;
    this.currentRoom = room;
    this.imgx = 0;
    this.imgy = 0;
    this.hurtAnimation = false;
    this.health = 5;
this.moveLeft = function()
{
    if(this.hurt)return;
    var t = this.currentRoom.getTile(this.x-1,this.y);
    var p = this.currentRoom.getPiece(this.x-1,this.y);
    this.x--;
 if(p != null && this.pieceEvent(p))this.x++;
    if(t==1 || t==2)this.x++;
}

this.getImage = function()
{
    if(this.hurt) return new Point(0,4);
    if(!this.hurtAnimation)return new Point(0,0);
    
    var r = new Point(0,0);
    r.o = new Point(2,4);
    return r;
}


this.getHit = function()
{
    this.hurtAnimation = true;
    this.health--;
    if(this.health<=0)this.hurt = true;   
}

this.update = function()
{
    this.hurtAnimation = false;
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
