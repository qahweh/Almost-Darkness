
RoomType = {

ENTRANCE: 1,
HALLWAY: 2,
DINING_ROOM: 3

}


function Room(roomType,random, buildRoom, deep)
{
    deep = typeof deep !=='undefined' ? deep : 0;
    
    this.width = 41; //TODO: use 'const' if always is this width/height is one every room. alsow make this to 40 again. unused tile is on far right.
    this.height = 19;
    this.roomType = roomType;
    this.random = random;
    this.matris = new Array();
    this.isBuild = false;
    this.requireDoor = null;
    this.deep = deep;
    if(buildRoom)this._makeRoomMatrisByRandom();
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

    door.toRoom = new Room(RoomType.HALLWAY, random.nextInt(1000), false, this.deep+1);
    var r = 0;
    if(this.matris[p+1]==0) r = DirType.LEFT;
    else if(this.matris[p-1]==0) r = DirType.RIGHT;
    else if(this.matris[p+this.width]==0) r = DirType.UP;
    else if(this.matris[p-this.width]==0) r = DirType.DOWN;
    
    if(r==DirType.LEFT)door.toRoom.requireDoor = DirType.RIGHT;
    if(r==DirType.RIGHT)door.toRoom.requireDoor = DirType.LEFT;
    if(r==DirType.UP)door.toRoom.requireDoor = DirType.DOWN;
    if(r==DirType.DOWN)door.toRoom.requireDoor = DirType.UP;

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
    for(i=0; i<this.width*this.height; i++)this.matris[i] = -1;

    if(this.roomType == RoomType.ENTRANCE)
    {
        this._makeSquare(7,4,26,11);
        this.matris[594] = this._makeDoor(random,594);
        this.matris[593] = this._makeDoor(random,593);
        this.matris[458] = this._makeDoor(random,458);
        this.matris[294] = this._makeDoor(random,294);
        this.matris[483] = this._makeDoor(random,483);
        this.matris[319] = this._makeDoor(random,319);
        this.matris[177] = this._makeDoor(random,177);
        this.matris[190] = this._makeDoor(random,190);
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
    for(var i =0; i<11; i++)
    {
        var x = parseInt(Math.random()*this.width);
        var y = parseInt(Math.random()*this.height);
        var t = this.getTile(x,y);
        var p = this.getPiece(x,y);
        if(t==0 && p==null) pieces.push( new Fishman(x,y,this) );
    }
    for(var i =0; i<7; i++)
    {
        var x = parseInt(Math.random()*this.width);
        var y = parseInt(Math.random()*this.height);
        var t = this.getTile(x,y);
        var p = this.getPiece(x,y);
        if(t==0 && p == null) pieces.push( new Ammobox(x,y,this) );
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
    var random = new Random(this.random);
    //TODO: make better room structure and make them look like what they are for type
    if(this.roomType == RoomType.DINING_ROOM)
    {
        //TODO: make room code
    }
    return -1;
}
