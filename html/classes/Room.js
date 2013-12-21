
RoomType = {

ENTRANCE: 1,
HALLWAY: 2,
DINING_ROOM: 3

}


function Room(roomType,random)
{
    this.width = 41; //TODO: use 'const' if always is this width/height is one every room. alsow make this to 40 again. unused tile is on far right.
    this.height = 19;
    this.roomType = roomType;
    this.random = random;
    this.matris = new Array();
    this._makeRoomMatrisByRandom(random);
}

Room.prototype._makeRoomMatrisByRandom = function(random)
{
    var random = new Random(this.random);
    for(i=0; i<this.width*this.height; i++)this.matris[i] = -1;

    if(this.roomType == RoomType.ENTRANCE)
    {
        this._makeSquare(7,4,26,11);
        this.matris[594] = 3;
        this.matris[593] = 3;
        this.matris[458] = 3;
        this.matris[294] = 3;
        this.matris[483] = 3;
        this.matris[319] = 3;
        this.matris[177] = 3;
        this.matris[190] = 3;
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

        var t = 0;
        while(t<300)
        {
            var x = random.nextInt(this.width);
            var y = random.nextInt(this.height);
            if(this.matris[x+y*this.width] == 1 || this.matris[x+y*this.width] == 2)
            {
                this.matris[x+y*this.width] = 3;
                t=t+100;
            }
            t++;
        }
        //this.matris[x+y*this.width+3] = 3;
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
    // cache room in matris. Will make game calc more faster
    if(this.roomType == RoomType.ENTRANCE )
    {
        if(x==15 && y==15)return 0;
        if(x==14 && y==15)return 1;
        if(x==16 && y==15)return 1;
        if(x==15 && y==14)return 3;
        if(x==14 && y==14)return 2;
        if(x==16 && y==14)return 2;
        if(x==15 && y==16)return 2;
        if(x==14 && y==16)return 2;
        if(x==16 && y==16)return 2;
 
    }
    else if(this.roomType == RoomType.HALLWAY)
    {
        startx = random.nextInt(20);
        endx = startx+3+random.nextInt(20);
        starty = random.nextInt(3);
        endy = starty+3+random.nextInt(10);
        if(x>startx && x<endx && y>starty && y<endy)
        {
            if(y==starty+1 || y==endy-1) { if( ((x+y*3)%7) == 0) return 3; return 2; }
            if(x==startx+1 || x==endx-1){if( ((x+y*3)%7) == 0) return 3; return 1; }
            return 0;
        }
    }
    else if(this.roomType == RoomType.DINING_ROOM)
    {
        //TODO: make room code
    }
    return -1;
}
