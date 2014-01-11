function HouseBuilder()
{
	this.house = new Array();

    var x = 5;
    var y = 8;
    this.width = 11;
    this.height = 11;

    this.calc = function(i,door)
    {
        var x = 0;
        var y = 0;
        if(door.doorDir==DirType.LEFT) { x = door.toRoom.width-3; y = parseInt(i/door.toRoom.width);}
        if(door.doorDir==DirType.RIGHT) { x = 3; y = parseInt(i/door.toRoom.width);}

        if(door.doorDir==DirType.UP) { x = i%door.toRoom.width; y = door.toRoom.height-3;}
        if(door.doorDir==DirType.DOWN) { x = i%door.toRoom.width; y = 3;}

        return x+y*door.toRoom.width;
    }

    this.makeDoor = function(door,i,room)
    {
        var d = new Door();
        d.doorDir = DirMirror(door.doorDir);
        d.toRoom = door.belongToRoom;
        d.startx = i%d.toRoom.width-this.offsetByDoor(door).x;
        d.starty = parseInt(i/d.toRoom.width)-this.offsetByDoor(door).y;
//        d.belongToRoom = room; ?
        return d;
    }
    
    this.offsetByDoor = function(door)
    {
        if(door.doorDir == DirType.LEFT) return new Point(-1,0);
        if(door.doorDir == DirType.RIGHT) return new Point(1,0);
        if(door.doorDir == DirType.UP) return new Point(0,-1);
        if(door.doorDir == DirType.DOWN) return new Point(0,1);
    }
    
    this.buildRoomsByDoors = function(room,p)
    {        
        for(var i =0; i<room.matris.length; i++)
        {
            if(room.matris[i] instanceof Door && room.matris[i].toRoom == null)
            {
                var door = room.matris[i];
                var offset = 0;
                if(door.doorDir==DirType.LEFT) offset = -1;
                if(door.doorDir==DirType.RIGHT) offset = 1;
                if(door.doorDir==DirType.UP) offset = -this.width; 
                if(door.doorDir==DirType.DOWN) offset = this.width; 

                //check if there is a room at this spot
                if(this.house[p+offset])
                {
                    door.toRoom = this.house[p+offset][0];
                    var g = this.calc(i,door);
                    door.toRoom.matris[g] = this.makeDoor(door,i,room);
                    door.startx = g%door.toRoom.width+this.offsetByDoor(door).x;
                    door.starty = parseInt(g/door.toRoom.width)+this.offsetByDoor(door).y;
                }
                else
                {
                    door.toRoom = new Room(RoomType.EMPTY, 1, false, this.deep+1);
                    door.toRoom.name='B';

                    
                    var g = this.calc(i,door);
                    door.toRoom.matris[g] = this.makeDoor(door,i,room);
                    door.startx = g%door.toRoom.width+this.offsetByDoor(door).x;
                    door.starty = parseInt(g/door.toRoom.width)+this.offsetByDoor(door).y;
                    

                    if(!this.house[p+offset])this.house[p+offset] = new Array();
                    this.house[p+offset].push(door.toRoom);
                }
            }
        }
    };
    
    this.getStartRoom = function()
    {
        return this.startRoom;
    }
    
    var room = new Room(RoomType.ENTRANCE,111,true);
    room.name = 'A';
    this.startRoom = room;
	this.house[x+y*this.width] = new Array( room );
    this.house[this.width*this.height-1] = false;
    this.buildRoomsByDoors(room,x+y*this.width);
    
    var roomNext = this.house[x+y*this.width-1][0];
    
    var door = new Door();
    door.doorDir = DirType.LEFT;
    roomNext.matris[200] = door;
    door.belongToRoom = roomNext;
    this.buildRoomsByDoors(roomNext,x+y*this.width-1);
};
