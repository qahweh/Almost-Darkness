
RoomType = {

ENTRANCE: 1,
HALLWAY: 2,
DINING_ROOM: 3

}


function Room(roomType,random)
{
    this.width = 40; //TODO: use 'const' if always is this width/height is one every room
    this.height = 19;
    this.roomType = roomType;
    this.random = random;
};

Room.prototype.getTile = function(x,y)
{
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
        startx = random.nextInt(10);
        endx = 10+random.nextInt(10);
        if(x>startx && x<endx && y>3 && y<15)
        {
            if(y==4 || y==14) { if( ((x+y*3)%7) == 0) return 3; return 2; }
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
