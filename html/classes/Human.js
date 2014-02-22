function Human(x,y,room) //should be called Piece or Character to be a common class
{
    this.x = x;
    this.y = y;
    this.currentRoom = room;
    this.imgx = 0;
    this.imgy = 0;
    this.hurtAnimation = false;
    this.health = 4;
    this.x2 = x*28;
    this.y2 = y*38;
    this.anim = 0;
    this.action = new Array();
    this.dir = 0;
    this.action[65] = false;
    this.action[68] = false;
    this.action[87] = false;
    this.action[83] = false;
    this.offsetImg = new Point(14,35);
    this.startrunningCooldown = 0;
    this.steplength = 1;
    this.walklength = 1;
    this.runlength = 1; //start as 1. when get shoes then 2

    this.update2 = function()
    {
        if(this.startrunningCooldown>0){ this.startrunningCooldown--; } else this.steplength = this.walklength;

        this.moved = 0;
        var odir = this.dir;
        if(this.action[68] == true && this.action[65] == false) { if(this.startrunningCooldown>0 && this.startrunningCooldown<14)this.steplength=this.runlength; this.moveRight(this.steplength); this.startrunningCooldown = 15; this.moved++; this.dir = 0;}
        if(this.action[68] == false && this.action[65] == true) { if(this.startrunningCooldown>0 && this.startrunningCooldown<14)this.steplength=this.runlength; this.moveLeft(this.steplength); this.startrunningCooldown = 15; this.moved++; this.dir = 1;}
        if(this.action[87] == true && this.action[83] == false) { if(this.startrunningCooldown>0 && this.startrunningCooldown<14)this.steplength=this.runlength; this.moveUp(this.steplength); this.startrunningCooldown = 15; this.moved++; this.dir = 2;}
        if(this.action[87] == false && this.action[83] == true) { if(this.startrunningCooldown>0 && this.startrunningCooldown<14)this.steplength=this.runlength; this.moveDown(this.steplength); this.startrunningCooldown = 15; this.moved++; this.dir = 3;}

        if(this.dir != odir)this.startrunningCooldown=0; //force cooldown down to make player walk

        if(this.moved>0){this.anim += this.steplength; if(this.anim%26==13){mixer.play(2);}}
        if(this.moved>1){ this.dir = odir; this.startrunningCooldown=0;} //if diagonal then do not change dir. and force cooldown down to make player walk
        if(this.moved==0)this.anim=23;
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

    this.canWalkOn = function(t)
    {
        return (t==0 || t==4 || t==5 || t==14 || t==15 || t==24 || t==25);
    }

    this.move = function(dx,dy)
    {
        if(this.hurt)return;
        var t = this.currentRoom.getTile( parseInt(  ((this.x2+dx)/28)) ,parseInt((this.y2+dy)/38) );
        var p = this.currentRoom.getPiece2( this.x2+dx, this.y2+dy, this );

        var b = false;
        if(p != null) b = this.pieceEvent(p);

        if(!b && this.canWalkOn(t)){ this.x2 += dx; this.y2 += dy; return; }


        if(t instanceof Door && this == human)
        {
            var door = t;
            doors = doors + door.counter;
            door.counter =  0;  
            room = door.getToRoom(human);
            camera = room.getCameraOnCenter();
            human.x2 = door.startx*28+14;
            human.y2 = door.starty*38+30;
            human.currentRoom = room;
            drawRoom(true);
            reh.handleRoom(room, function(x,y){ return (  (Math.abs(x-parseInt(human.x2/28)) + Math.abs(y-parseInt(human.y2/38)))<4 ) }); //do fix so they are even some spaces away also
        }
    }

    this.moveLeft = function(d){ this.move(-d,0);}
    this.moveRight = function(d){ this.move(d,0);}
    this.moveUp = function(d){ this.move(0,-d);}
    this.moveDown = function(d){ this.move(0,d);}

    this.getImage = function()
    {
        var x = 1;
        var y = 5;
        if(this.anim%28<13)x=0;
        if(this.dir==0)x=x;
        if(this.dir==1){  if(x==0)x=3; if(x==1)x=2; }
        if(this.dir==3)
        {
            x=0; y=0;
            if(this.anim%56<42){y=6; x=3;}
            if(this.anim%56<28){y=0; x=0;}
            if(this.anim%56<14){y=6; x=2;}

        }
        if(this.dir==2)
        {
            x=4;
            if(this.anim%56<42){y=6; x=0;}
            if(this.anim%56<28){y=5; x=4;}
            if(this.anim%56<14){y=6; x=1;}

        }

        if(this.hurt) return new Point(0,4);
        if(!this.hurtAnimation)return new Point(x,y);

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
    if(piece instanceof Key){piece.currentRoom = null; return false;} //todo: remove from piece list. fishman should not pickup ammobox.
    if(piece instanceof RunningShoes){piece.currentRoom = null; human.runlength=2; return false;} //todo: remove from piece list. fishman should not pickup ammobox.
    return true;
}
