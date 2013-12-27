function Door()
{
    this.leftRoom = null;
    this.rightRoom = null;
    this.upRoom = null;
    this.downRoom = null;
    this.toRoom = null;
    this.startx = 0;
    this.starty = 0;
    this.doorDir = null;
    this.belongToRoom = null;
    this.position = null;
};

Door.prototype.calculateStart = function()
{
    if(this.doorDir == DirType.LEFT)
    {
        var t = this._findDoorInRoom(this.toRoom,DirType.LEFT) - 1;
        this.startx = t%this.toRoom.width;
        this.starty = parseInt(t/this.toRoom.width);
    }
    else if(this.doorDir == DirType.RIGHT)
    {
        var t =this._findDoorInRoom(this.toRoom,DirType.RIGHT) + 1;
        this.startx = t%this.toRoom.width;
        this.starty = parseInt(t/this.toRoom.width);
    }
    else if(this.doorDir == DirType.UP)
    {
        var t = this._findDoorInRoom(this.toRoom,DirType.UP) - this.toRoom.width;
        this.startx = t%this.toRoom.width;
        this.starty = parseInt(t/this.toRoom.width);
    }
    else if(this.doorDir == DirType.DOWN)
    {
        var t = this._findDoorInRoom(this.toRoom,DirType.DOWN) + this.toRoom.width;
        this.startx = t%this.toRoom.width;
        this.starty = parseInt(t/this.toRoom.width);
    }

}

Door.prototype._findDoorInRoom = function(room,dir)
{
    for(i = 0; i<room.width*room.height; i++)
    {
        if(room.matris[i] instanceof Door)
        {
            if(dir==DirType.LEFT && room.matris[i-1]==0)
            {
                room.matris[i].toRoom = this.belongToRoom; 
                room.matris[i].startx = this.position%this.belongToRoom.width +1; 
                room.matris[i].starty = parseInt(this.position/this.belongToRoom.width);
                return i;
            }
            else if(dir==DirType.RIGHT && room.matris[i+1]==0 )
            { 
                room.matris[i].toRoom = this.belongToRoom;
                room.matris[i].startx = this.position%this.belongToRoom.width -1; 
                room.matris[i].starty = parseInt(this.position/this.belongToRoom.width);
                return i;
            }
            else if(dir==DirType.UP && room.matris[i-room.width]==0 )
            {
                room.matris[i].toRoom = this.belongToRoom; 
                room.matris[i].startx = this.position%this.belongToRoom.width; 
                room.matris[i].starty = parseInt(this.position/this.belongToRoom.width) + 1;
                return i;
            }
            else if(dir==DirType.DOWN && room.matris[i+room.width]==0 )
            {
                room.matris[i].toRoom = this.belongToRoom; 
                room.matris[i].startx = this.position%this.belongToRoom.width; 
                room.matris[i].starty = parseInt(this.position/this.belongToRoom.width) - 1;
               return i;
            }
        }
    }
    return 0;
}
