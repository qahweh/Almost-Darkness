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
    this.locked = ( parseInt(Math.random()*3)==1 ? true : false);

    if(this.locked)
    {
        this.lockedType = 1+parseInt(Math.random()*3);
    }

    this.isWall = true;
    this.otherDoor = false;
    this.isForcedClosed = false;
    
    this.getImage = function()
    {
		if(this.isForcedClosed)return new Point(0,1);
		
        if(this.locked)
        {
            if(this.lockedType === 1) return new Point(6,2);
            if(this.lockedType === 2) return new Point(9,5);
            if(this.lockedType === 3) return new Point(10,5);
            return new Point(6,2);
        }
        return new Point(4,0);
    }

    this.openDoor = function(forceOpen)
    {
        if(!forceOpen)
        {
            if(this.isForcedClosed) return false;
            if(this.locked)
            {
                if(game.human.getNumberOfKeys(this.otherDoor.lockedType)>0)
                {
                    game.human.removeOneKey(this.otherDoor.lockedType);
                    this.locked = false;
                    this.lockedtype = false;
                }
                else return false;
            }
        }
        var d = this.getToRoom();
        if(d===true)return;
        var dx = 0;
        var dy = 0;
        if(this.doorDir == DirType.UP) dy = 1;
        else if(this.doorDir == DirType.DOWN) dy = -1;
        else if(this.doorDir == DirType.LEFT) dx = 1; // it seems these LEFT and RIGHT do not work. think there is an issue with some of doors having a reversed dir. TODO: look this up. fixed it by doing it in another way
        else if(this.doorDir == DirType.RIGHT) dx = -1;
        else throw "aaaa";


        this.otherDoor = d.matris[this.startx+(-1)+(this.starty+dy)*d.width];
        if(!( this.otherDoor instanceof Door )) this.otherDoor = d.matris[this.startx+(0)+(this.starty+dy)*d.width];
        if(!( this.otherDoor instanceof Door )) this.otherDoor = d.matris[this.startx+(1)+(this.starty+dy)*d.width];

        if(this.locked)
        {    
            if(!(this.otherDoor instanceof Door)) {  console.log(this.otherDoor); console.log(dx); console.log(dy); throw "aa";  }  
            this.otherDoor.locked = true;
            this.otherDoor.lockedType = this.lockedType;
        }

        if(!this.locked)
        {        
            if(!(this.otherDoor instanceof Door)) {  console.log(this.otherDoor); console.log(dx); console.log(dy); throw "aa";  }  
            this.otherDoor.locked = false;
            this.otherDoor.lockedType = false;
        }

        return d;

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
        
        if(this.toRoom === true) return true;

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


    this.getDarkness = tileFactory.getDarkness;

    this.skipDraw = tileFactory.skipDraw;
    
};
