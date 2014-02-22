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
    this.counter = 1;
    this.locked = ( parseInt(Math.random()*5)==3 ? true : false);

    this.getImage = function()
    {
        if(this.locked) return new Point(6,2);
        return new Point(4,0);
    }

    this.getToRoom = function()
    {
        if(this.toRoom == null)
        {
            if(this.doorDir == DirType.DOWN)
            {
                this.startx=this.position%RoomValue.WIDTH;
                this.starty=parseInt(this.position/RoomValue.WIDTH)+1;
                this.toRoom = this.belongToRoom;
            }

            if(this.doorDir == DirType.UP)
            {
                this.startx=this.position%RoomValue.WIDTH;
                this.starty=parseInt(this.position/RoomValue.WIDTH)-1;
                this.toRoom = this.belongToRoom;
            }

            if(this.doorDir == DirType.LEFT)
            {
                this.startx=this.position%RoomValue.WIDTH+1;
                this.starty=parseInt(this.position/RoomValue.WIDTH);
                this.toRoom = this.belongToRoom;
            }

            if(this.doorDir == DirType.RIGHT)
            {
                this.startx=this.position%RoomValue.WIDTH-1;
                this.starty=parseInt(this.position/RoomValue.WIDTH);
                this.toRoom = this.belongToRoom;
            }
        }
        
        if(this.toRoom.matris[this.startx+this.starty*this.toRoom.width] != -1)
            return this.toRoom;

        if(this.toRoom.alternativeRoom.matris[this.startx+this.starty*this.toRoom.alternativeRoom.width] != -1)
            return this.toRoom.alternativeRoom;

        if(this.toRoom.alternativeRoom.alternativeRoom.matris[this.startx+this.starty*this.toRoom.alternativeRoom.width] != -1)
            return this.toRoom.alternativeRoom.alternativeRoom;

        if(this.toRoom.alternativeRoom.alternativeRoom.alternativeRoom.matris[this.startx+this.starty*this.toRoom.alternativeRoom.width] != -1)
            return this.toRoom.alternativeRoom.alternativeRoom.alternativeRoom;

        if(this.toRoom.alternativeRoom.alternativeRoom.alternativeRoom.alternativeRoom.matris[this.startx+this.starty*this.toRoom.alternativeRoom.width] != -1)
            return this.toRoom.alternativeRoom.alternativeRoom.alternativeRoom.alternativeRoom;

        if(this.toRoom.alternativeRoom.alternativeRoom.alternativeRoom.alternativeRoom.alternativeRoom.matris[this.startx+this.starty*this.toRoom.alternativeRoom.width] != -1)
            return this.toRoom.alternativeRoom.alternativeRoom.alternativeRoom.alternativeRoom.alternativeRoom;

        if(this.toRoom.alternativeRoom.alternativeRoom.alternativeRoom.alternativeRoom.alternativeRoom.alternativeRoom.matris[this.startx+this.starty*this.toRoom.alternativeRoom.width] != -1)
            return this.toRoom.alternativeRoom.alternativeRoom.alternativeRoom.alternativeRoom.alternativeRoom.alternativeRoom;
        
        return this.toRoom.alternativeRoom.alternativeRoom.alternativeRoom.alternativeRoom.alternativeRoom.alternativeRoom.alternativeRoom;
    }
    
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
                room.matris[i].counter=0;
                return i;
            }
            else if(dir==DirType.RIGHT && room.matris[i+1]==0 )
            { 
                room.matris[i].toRoom = this.belongToRoom;
                room.matris[i].startx = this.position%this.belongToRoom.width -1; 
                room.matris[i].starty = parseInt(this.position/this.belongToRoom.width);
                room.matris[i].counter=0;
                return i;
            }
            else if(dir==DirType.UP && room.matris[i-room.width]==0 )
            {
                room.matris[i].toRoom = this.belongToRoom; 
                room.matris[i].startx = this.position%this.belongToRoom.width; 
                room.matris[i].starty = parseInt(this.position/this.belongToRoom.width) + 1;
                room.matris[i].counter=0;
                return i;
            }
            else if(dir==DirType.DOWN && room.matris[i+room.width]==0 )
            {
                room.matris[i].toRoom = this.belongToRoom; 
                room.matris[i].startx = this.position%this.belongToRoom.width; 
                room.matris[i].starty = parseInt(this.position/this.belongToRoom.width) - 1;
                room.matris[i].counter=0;
                return i;
            }
        }
    }
    return 0;
}
