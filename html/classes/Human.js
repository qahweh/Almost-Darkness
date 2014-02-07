function Human(x,y,room) //should be called Piece or Character to be a common class
{
    this.x = x;
    this.y = y;
    this.currentRoom = room;
    this.imgx = 0;
    this.imgy = 0;
    this.hurtAnimation = false;
    this.health = 500;
    this.x2 = 300;
    this.y2 = 300;
    this.anim = 0;
    this.action = new Array();
    this.dir = 0;
    this.action[65] = false;
    this.action[68] = false;
    this.action[87] = false;
    this.action[83] = false;


    this.update2 = function()
    {
        this.moved = 0;
        var odir = this.dir;
        if(this.action[68] == true && this.action[65] == false) { this.x2 += 1; this.moved++; this.dir = 0;}
        if(this.action[68] == false && this.action[65] == true) { this.x2 -= 1; this.moved++; this.dir = 1;}
        if(this.action[87] == true && this.action[83] == false) { this.y2 -= 1; this.moved++; this.dir = 2;}
        if(this.action[87] == false && this.action[83] == true) { this.y2 += 1; this.moved++; this.dir = 3;}
        if(this.moved>0){this.anim++; if(this.anim%26==13){mixer.play(2);}}
        if(this.moved>1)this.dir = odir; //if diagonal then do not change dir.
    }

    this.releaseAction = function(c)
    {
        this.action[c]=false;
    }

    this.doAction = function(c)
    {
        this.action[c]=true;
    }

    this.getTilePos = function()
    {
        var c = parseInt(this.x2/28)+( parseInt(this.y2/38)*this.currentRoom.width);
        //console.log(c);
        return c;
    }

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
    if(piece instanceof Ammobox){piece.currentRoom = null; ammo=ammo+3; return false;} //todo: remove from piece list. fishman should not pickup ammobox.
    return true;
}
