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

    this.update2 = function()
    {
        this.moved = 0;
        var steplength = 1;
        var odir = this.dir;
        if(this.action[68] == true && this.action[65] == false) { this.moveRight(steplength); this.moved++; this.dir = 0;}
        if(this.action[68] == false && this.action[65] == true) { this.moveLeft(steplength); this.moved++; this.dir = 1;}
        if(this.action[87] == true && this.action[83] == false) { this.moveUp(steplength); this.moved++; this.dir = 2;}
        if(this.action[87] == false && this.action[83] == true) { this.moveDown(steplength); this.moved++; this.dir = 3;}
        if(this.moved>0){this.anim++; if(this.anim%26==13){mixer.play(2);}}
        if(this.moved>1)this.dir = odir; //if diagonal then do not change dir.
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
            reh.handleRoom(room);
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
    return true;
}
