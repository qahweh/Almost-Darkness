
RoomType = {

ENTRANCE: 1,
HALLWAY: 2,
DINING_ROOM: 3,
EMPTY: 4
}

RoomValue = {
WIDTH: 41    
}


function Room(roomType,random, buildRoom, deep)
{
    deep = typeof deep !=='undefined' ? deep : 0;
    
    this.width = 41; //TODO: use 'const' if always is this width/height is one every room. alsow make this to 40 again. unused tile is on far right.
    this.height = 19;
    this.roomType = roomType;
    this.random = random;
    this.matris = new Array();
    for(i=0; i<this.width*this.height; i++)this.matris[i] = -1;
    this.isBuild = false;
    this.requireDoor = null;
    this.deep = deep;
    if(buildRoom)this._makeRoomMatrisByRandom();

    this.getNumberOfDoors = function()
    {
        var x = 0;
        for(var i=0; i<this.width*this.height; i++) if(this.matris[i] instanceof Door) x++;
        return x;
    }

    this.getCameraOnCenter = function()
    {
        var xLeft = this.width;
        for(var y=0; y<this.height; y++)
        {
            var newXLeft = 0;
            for(var i=0; i<this.width; i++) if(this.matris[i+y*this.width]!=-1) { newXLeft = i; break; }
            if(newXLeft < xLeft && newXLeft!=0) xLeft = newXLeft;
        }

        var xRight = 0;
        for(var y=0; y<this.height; y++)
        {
            var newXRight = this.width;
            for(var i=this.width; i>0; i--) if(this.matris[i+y*this.width]!=-1) { newXRight = i; break; }
            if(newXRight > xRight && newXRight!=this.width) xRight = newXRight;
        }

        var yUp = this.height;
        for(var x=0; x<this.width; x++)
        {
            var newYUp = 0;
            for(var i=0; i<this.height; i++) if(this.matris[x+i*this.width]!=-1) { newYUp = i; break; }
            if(newYUp < yUp && newYUp!=0) yUp = newYUp;
        }

        var yDown = 0;
        for(var x=1; x<21; x++)
        {
            var newYDown = 200;
            for(var i=this.height-1; i>0; i--) { if(this.matris[x+i*this.width]!=-1) { newYDown = i; break; }}

            if(newYDown > yDown && newYDown!=200) yDown = newYDown;
        }

        //TODO: Check why yDown and xRight logic is not the same. xRigt do not use -1 on its width. I think it should be -1.
        // Also do not use values like 9 and 20. user this.width / 2 etc

        var m = xLeft + parseInt(xRight-xLeft)/2;
        var m2 = yUp + parseInt(yDown-yUp)/2;
        return new Point(m-20,m2-9);
    }

}

Room.prototype.getPiece = function(x,y)
{
    var index;
    for(index = 0; index < pieces.length; index++)
    {
        var p = pieces[index];
        if(p.currentRoom == this && p.x==x && p.y==y) return p;
    }
    return null;
}

Room.prototype._makeDoor = function(random,p)
{
    door = new Door();

    var r = 0;
    if(this.matris[p+1]==0) r = DirType.LEFT;
    else if(this.matris[p-1]==0) r = DirType.RIGHT;
    else if(this.matris[p+this.width]==0) r = DirType.UP;
    else if(this.matris[p-this.width]==0) r = DirType.DOWN;
    


    //alert(r);
    door.position = p;
    door.doorDir = r;
    door.belongToRoom = this;
    return door;
}

Room.prototype._makeRoomMatrisByRandom = function()
{
    if(this.isBuild)return;
    this.isBuild= true;

    var random = new Random(this.random);

    if(this.roomType == RoomType.ENTRANCE)
    {
        this._makeSquare(7,4,26,11);
        this.matris[594] = this._makeDoor(random,594);
        this.matris[594].toRoom = true;
        this.matris[593] = this._makeDoor(random,593);
        this.matris[593].toRoom = true;
        this.matris[458] = this._makeDoor(random,458);
        this.matris[294] = this._makeDoor(random,294);
        this.matris[483] = this._makeDoor(random,483);
        this.matris[319] = this._makeDoor(random,319);
        this.matris[177] = this._makeDoor(random,177);
        this.matris[190] = this._makeDoor(random,190);

    }
    else if(this.roomType == RoomType.EMPTY)
    {
        this._makeSquare(2,2,37,15);
    }
    else if(this.roomType == RoomType.HALLWAY)
    {
        var x = 2+random.nextInt(14);
        var y = 2+random.nextInt(4);
        var width = random.nextInt(10)+5;
        var height = random.nextInt(10)+5;
        this._makeSquare(x,y,width,height);
        
        var doorx = random.nextInt(this.width);
        var doory = random.nextInt(this.height);

        var makeDoorAtDir = this.requireDoor;

        var t = 0;
        var t2 = 0;
        if(this.deep==0)t2=350; // do not exist yet. first room is always ENTRANCE
        if(this.deep==1)t2=350;
        if(this.deep==2)t2=600;
        if(this.deep==3)t2=900;
        if(this.deep==4)t2=1200;
        if(this.deep==5)t2=1500;

        while(t<1500)
        {
            var x = random.nextInt(this.width);
            var y = random.nextInt(this.height);
            if(this.matris[x+y*this.width] == 1 || this.matris[x+y*this.width] == 2)
            {
                if(makeDoorAtDir==null)
                {
                    if(this.matris[x+y*this.width-1]==0 || this.matris[x+y*this.width+1]==0 || this.matris[x+(y+1)*this.width]==0 || this.matris[x+(y-1)*this.width]==0)
                    {
                        this.matris[x+y*this.width] = this._makeDoor(random,x+y*this.width);
                        t=t+t2;
                    }
                }
                else
                {
                    if( (this.matris[x+y*this.width-1]==0 && makeDoorAtDir==DirType.RIGHT) || 
                        (this.matris[x+y*this.width+1]==0 && makeDoorAtDir==DirType.LEFT) || 
                        (this.matris[x+(y+1)*this.width]==0 && makeDoorAtDir==DirType.UP ) || 
                        (this.matris[x+(y-1)*this.width]==0 && makeDoorAtDir==DirType.DOWN ) )
                    {
                        makeDoorAtDir = null;
                        this.matris[x+y*this.width] = this._makeDoor(random,x+y*this.width);
                        t=t+t2;
                    }

                }
            }
            t++;
        }
    }
}

Room.prototype._makeSquare = function(x,y,width,height)
{
    for(i=x; i<x+width; i++ )
    {
        for(u=y; u<y+height; u++)
        {
            if(y==u || y+height-1 == u) this.matris[i+u*this.width] = 2;
            else if(x==i || x+width-1==i) this.matris[i+u*this.width] = 1;
            else this.matris[i+u*this.width] = 0;
        }
    }
}

Room.prototype.getTile = function(x,y)
{
    return this.matris[x+y*this.width];
}
