function Human(x,y,room) //should be called Piece or Character to be a common class
{
    this.x = x;
    this.y = y;
    this.currentRoom = room;
    this.imgx = 0;
    this.imgy = 0;
    this.hurtAnimation = false;
    this.health = 500;
    this.x2 = x*28;
    this.y2 = y*38;
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
        if(this.action[68] == true && this.action[65] == false) { this.moveRight(); this.moved++; this.dir = 0;}
        if(this.action[68] == false && this.action[65] == true) { this.moveLeft(); this.moved++; this.dir = 1;}
        if(this.action[87] == true && this.action[83] == false) { this.moveUp(); this.moved++; this.dir = 2;}
        if(this.action[87] == false && this.action[83] == true) { this.moveDown(); this.moved++; this.dir = 3;}
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

    this.move = function(dx,dy)
    {
        if(this.hurt)return;
        var t = this.currentRoom.getTile( parseInt(  ((this.x2+dx)/28)) ,parseInt((this.y2+dy)/38) );
        if(t==0 || t==4 || t==5){ this.x2 += dx; this.y2 += dy; return; }

        if(t instanceof Door)
        {
            var door = t;
            doors = doors + door.counter;
            door.counter =  0;  
            room = door.getToRoom(human);
            camera = room.getCameraOnCenter();
            human.x2 = door.startx*28;
            human.y2 = door.starty*38;
            human.currentRoom = room;
            drawRoom(true);
        }
    }


    this.moveLeft = function(){ this.move(-1,0);}
    this.moveRight = function(){ this.move(1,0);}
    this.moveUp = function(){ this.move(0,-1);}
    this.moveDown = function(){ this.move(0,1);}



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



Human.prototype.pieceEvent = function(piece)
{
    if(piece instanceof Ammobox){piece.currentRoom = null; ammo=ammo+3; return false;} //todo: remove from piece list. fishman should not pickup ammobox.
    return true;
}
