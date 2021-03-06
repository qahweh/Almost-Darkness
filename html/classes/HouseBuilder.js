function HouseBuilder(level)
{


    this.calc = function(i,door)
    {
        var x = 0;
        var y = 0;
        if(door.doorDir==DirType.LEFT) { x = door.toRoom.width-3; y = parseInt(i/door.toRoom.width);}
        if(door.doorDir==DirType.RIGHT) { x = 2; y = parseInt(i/door.toRoom.width);}

        if(door.doorDir==DirType.UP) { x = i%door.toRoom.width; y = door.toRoom.height-3;}
        if(door.doorDir==DirType.DOWN) { x = i%door.toRoom.width; y = 2;}

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
                    door.toRoom = new Room(RoomType.EMPTY, 1, true, this.deep+1);
                    //this.splitRoom(door.toRoom);
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
    
    this.nearOtherDoorInY = function(y,x,room)
    {
        this.caller++;
        if(this.caller>1000) throw "build loop might been freezed";
        for(var i=y-2; i<y+4; i++)
        if(room.matris[x+room.width*i] instanceof Door)return true;
        return false;
    }
    
    this.nearOtherDoorInX = function(x,y,room)
    {
        this.caller++;
        if(this.caller>1000) throw "build loop might been freezed";
        for(var i=x-3; i<x+8; i++)
        if(room.matris[i+room.width*y] instanceof Door)return true;
        return false;
    }
    
    this.canSplitRoom = function(room)
    {
        if(room.beenSplited) return false;
        if(room.roomType == RoomType.ENTRANCE) return false;
        return true;
    }

    this.splitRoom = function(room,r)
    {
        if( !this.canSplitRoom(room) ) return;
        room.beenSplited = true;
        var x=0; var y=0;
//        var r = parseInt(Math.random()*2);
       // r = 1;
        if(r==0 || r == 2)
        {
            var yHandler = function(y) { return y; }
            if(r==2)var yHandler = function(y) { return 18-y; }// mirror

            x = 10;
            for(y=3; y<10; y++){room.matris[x+yHandler(y)*room.width] = 1;}
            for(x=11; x<20; x++){for(y=3; y<10; y++){room.matris[x+yHandler(y)*room.width]=4;}}
            for(x=21; x<38; x++){for(y=3; y<10; y++){room.matris[x+yHandler(y)*room.width]=5;}}
            for(x=31; x<38; x++){for(y=10; y<16; y++){room.matris[x+yHandler(y)*room.width]=5;}}
            y = 10;
            for(x=10; x<31; x++){room.matris[x+yHandler(y)*room.width] = 2;}
            x = 30;for(y=11; y<16; y++){room.matris[x+yHandler(y)*room.width] = 1;}
            x = 20;for(y=3; y<10; y++){room.matris[x+yHandler(y)*room.width] = 1;}
            x = 25; y=10;room.matris[x+yHandler(y)*room.width] = 10;
            x = 10; y=7;room.matris[x+yHandler(y)*room.width] = 10;
            this.roomCounter+=3;
        }
        else if(r==1)
        {
            var x2 = 7+parseInt(this.randomObject.nextInt(10));
            if(!(room.matris[x2+2*room.width]==2 && room.matris[x2+16*room.width]==2)){ x2 = 7+this.randomObject.nextInt(10); }

            var x3 = x2+this.randomObject.nextInt(11)+6;
            if(!(room.matris[x3+2*room.width]==2 && room.matris[x3+16*room.width]==2)){ x3 = x2+this.randomObject.nextInt(11)+6; }


            x=x2;
            for(y=3; y<16; y++){room.matris[x+y*room.width] = 1;}            
            for(x=x2+1; x<x3; x++){for(y=3; y<16; y++){room.matris[x+y*room.width]=0;}}
            x=x3;
            for(y=3; y<16; y++){room.matris[x+y*room.width] = 1;}            
            for(x=3; x<x2; x++){for(y=3; y<16; y++){room.matris[x+y*room.width]=0;}}

            var height = 6+this.randomObject.nextInt(7);
            while( room.matris[2+height*room.width] !=1 ) { height = 6+this.randomObject.nextInt(7); }

            var c = 0;
            var h = 2;
            for(var x = 3; x<38; x++)
            {
                c++;
                if(room.matris[x+height*room.width] == 1)
                {
                    
                    room.matris[x+height*room.width] = 2;
                    h--;
                    height = 6+this.randomObject.nextInt(7);
                    while( room.matris[2+height*room.width] !=1) { height = 6+this.randomObject.nextInt(7); }
                    c = 0;
                }
                if(c!=3)room.matris[x+height*room.width] = 2;
                else room.matris[x+height*room.width] = 10;

                if(c!=0)
                {
                    room.matris[x+(height-1)*room.width] = 4+h*10;
                    room.matris[x+(height+1)*room.width] = 5+h*10;
                }
            }

            if( room.matris[38+height*room.width] instanceof Door)
            {
                for(var x=37; this.isFloor(room.matris[x+(height-1)*room.width]); x-- )
                {
                    room.matris[x+(height+1)*room.width] = 0;
                    room.matris[x+(height-1)*room.width] = 0;
                    room.matris[x+height*room.width] = 0;
                }
                this.roomCounter+=5;
            }
            else this.roomCounter+=6;

            //x = x3; y=10; room.matris[x+y*room.width] = 10;
            //x = x2; y=7; room.matris[x+y*room.width] = 10;
            this.spreadColor(room,4);
            this.spreadColor(room,5);
            this.spreadColor(room,14);
            this.spreadColor(room,15);
            this.spreadColor(room,24);
            this.spreadColor(room,25);

            for(var x = 3; x<38; x++)
            {
                c++;
                if(room.matris[x+4*room.width] == 1)
                {
                    room.matris[x+4*room.width] = 10;
                }
        }


        }else throw "type not implemented";
    }

    this.isFloor = function(x)
    {
        return (x==0 || x==4 || x==5 || x==14 || x== 15 || x==24 || x== 25);
    }

    this.spreadColor = function(room,color)
    {
        for(var t=0; t<20; t++)
        {
            for(var x=0; x<room.width*room.height; x++ )
            {
                if(room.matris[x]==color && room.matris[x-room.width]==0 )room.matris[x-room.width] = color;
                if(room.matris[x]==color && room.matris[x+room.width]==0 )room.matris[x+room.width] = color;
            }
        }
    }

    this.clearWhereAroundVoid = function(room)
    {
        for(var x=0; x<room.width; x++)
        {        
            for(var y=0; y<room.height; y++)
            {      
                if( room.matris[x+y*room.width] == 2 || room.matris[x+y*room.width] == 1 || room.matris[x+y*room.width] instanceof Door ) 
                {
                    var c = 0;
                    if( x == room.width-1 || room.matris[x+1+y*room.width] == -1 ) c++;
                    if( x==0 || room.matris[x-1+y*room.width] == -1 ) c++;
                    if( y==0 || room.matris[x+(y-1)*room.width] == -1 ) c++;
                    if( y == room.height-1 || room.matris[x+(y+1)*room.width] == -1 ) c++;
                    if(c>2) room.matris[x+y*room.width] = -1;
                }
            }
        }
    }

    this.clearRoom = function(room)
    {

        for(var x=0; x<room.width; x++)
        {        
            for(var y=0; y<room.height; y++)
            {      
                if(room.matris[x+y*room.width] == 1 && room.matris[x+y*room.width-1] ==-1 && room.matris[x+y*room.width+1] ==-1)
                {
                    room.matris[x+y*room.width] = -1;
                }
                if(room.matris[x+y*room.width] == 2 && room.matris[x+(y-1)*room.width] ==-1 && room.matris[x+(y+1)*room.width] ==-1)
                {
                    room.matris[x+y*room.width] = -1;
                }
            }
        }

        for(var x=0; x<room.width; x++)
        {        
            for(var y=0; y<room.height; y++)
            {      
                if(room.matris[x+y*room.width] instanceof Door && room.matris[x+y*room.width-1] ==-1 && room.matris[x+y*room.width+1] ==-1 && room.matris[x+(y-1)*room.width] ==-1 && room.matris[x+(y+1)*room.width] ==-1)
                {
                    room.matris[x+y*room.width] = -1;
                }

                if(room.matris[x+y*room.width] == 2 && room.matris[x+y*room.width-1] ==-1 && room.matris[x+y*room.width+1] ==-1 && room.matris[x+(y-1)*room.width] ==-1 && room.matris[x+(y+1)*room.width] ==-1)
                {
                    room.matris[x+y*room.width] = -1;
                }
            }
        }

        this.clearWhereAroundVoid(room);

        for(var x=0; x<room.width; x++)
        {        
            for(var y=0; y<room.height; y++)
            {      
                if(room.matris[x+y*room.width] == 2 && room.matris[x+(y-1)*room.width] == 1 && room.matris[x+(y+1)*room.width] == 1)room.matris[x+y*room.width] = 1;
                if(room.matris[x-1+y*room.width] == 2 && room.matris[x+(y+1)*room.width] == 1 && room.matris[x+y*room.width] == 1)room.matris[x+y*room.width] = 2;
                if(room.matris[x+y*room.width] == 2 && room.matris[x+(y+1)*room.width] == 2){room.matris[x+y*room.width] = 1; room.matris[x+(y+1)*room.width] = 1;}
                if(room.matris[x-1+y*room.width] == 2 && room.matris[x+(y+1)*room.width] instanceof Door && room.matris[x+y*room.width] == 1)room.matris[x+y*room.width] = 2;
                //if(room.matris[x+y*room.width] instanceof Door && !this.isFloor(room.matris[x+(y+1)*room.width]) && !this.isFloor(room.matris[x+(y-1)*room.width]) && !this.isFloor(room.matris[x-1+(y)*room.width]) && !this.isFloor(room.matris[x+1+(y+1)*room.width]) ) room.matris[x+y*room.width] = -1;
                if(room.matris[x+y*room.width] == 1 && room.matris[x+(y-1)*room.width] ==-1 && room.matris[x+(y+1)*room.width] == 1)room.matris[x+y*room.width] = 2;
                if(room.matris[x+y*room.width] == 1 && room.matris[x+(y+1)*room.width] ==-1 && room.matris[x+(y-1)*room.width] instanceof Door )room.matris[x+y*room.width] = 2;
                this.clearWhereAroundVoid(room);

            }
        }

        
    }

    this.removeTiles = function(room,tile)
    {
        for(var x=0; x<room.width; x++)
        {        
            for(var y=0; y<room.height; y++)
            {      
                if(tile.indexOf(room.matris[x+y*room.width])!=-1) room.matris[x+y*room.width] = -1;
            }
        }
    }
    

        this.cloneRoom = function(room)
        {
            var newroom = new Room(RoomType.EMPTY,111,true);
            for(var x = 0; x<newroom.width; x++)
            {
            for(var y = 0; y<newroom.height; y++)
            {
                newroom.matris[x+y*newroom.width] = room.matris[x+y*newroom.width];
            }
            }
            return newroom;
        }


    this.calcDoorConnect = function(room)
    {
        for(var x = 0; x<room.width; x++)
        {
            for(var y = 0; y<room.height; y++)
            {
                if(room.matris[x+y*room.width] == 10)
                {
                    
                    room.matris[x+y*room.width] = new Door(); 
                    
                    if(room.matris[x+y*room.width-1]==-1)room.matris[x+y*room.width].doorDir = DirType.RIGHT;
                    if(room.matris[x+y*room.width+1]==-1)room.matris[x+y*room.width].doorDir = DirType.LEFT;
                    if(room.matris[x+y*room.width-room.width]==-1)room.matris[x+y*room.width].doorDir = DirType.UP;
                    if(room.matris[x+y*room.width+room.width]==-1)room.matris[x+y*room.width].doorDir = DirType.DOWN;
                    room.matris[x+y*room.width].position = x+y*room.width;
                    room.matris[x+y*room.width].belongToRoom = room;
                }
            }
        }        
    }

    this.fillRoomsWith = function(room)
    {    
        throw "is not being used anymore?";
        for(var i =0; i<11; i++)
        {
            var x = parseInt(Math.random()*room.width);
            var y = parseInt(Math.random()*room.height);
            var t = room.getTile(x,y);
            var p = room.getPiece(x,y);
            if( (t==0 || t==4 || t==5) && p==null) pieces.push( new Fishman(x,y,room) );
        }
        for(var i =0; i<7; i++)
        {
            var x = parseInt(Math.random()*room.width);
            var y = parseInt(Math.random()*room.height);
            var t = room.getTile(x,y);
            var p = room.getPiece(x,y);
            if( (t==0 || t==4 || t==5) && p == null) pieces.push( new Ammobox(x,y,room) );
        }
    }

    this.getRandomSpot = function()
    {
        var i = this.randomObject.nextInt(this.width*this.height);
        var spot = this.house[i];
        return spot;
    }

    this.openDoor = function(door)
    {
        door.opened = true;
        var room = door.getToRoom();
        if(!room.entered)
        {
           game.rooms.push(room);
           room.entered = true;
        }
        return room;
    }


    this.rootBuild = function()
    {
	    this.house = new Array();
        this.roomCounter = 1; //1 is the first entrance
        var startx = 1;
        var starty = 2;
        this.width = 3;
        this.height = 3;

        this.caller = 0;

        var room = new Room(RoomType.ENTRANCE,111,true);
        room.name = 'A';
	    this.house[startx+starty*this.width] = new Array( room );
        this.house[this.width*this.height-1] = false;

        var roomE = new Room(RoomType.EMPTY,111,true);
        //this.splitRoom(roomE);

        this.house[0] = new Array( roomE );
        this.startRoom = room;

        for(var x2 = 0; x2<this.width; x2++)
        {
            
            
            for(var y2 = 0; y2<8; y2++)
            {

            if( !( (x2 == startx && y2 == starty) || (x2-1 == startx && y2 == starty) || (x2+1 == startx && y2 == starty) || (x2 == startx && y2 == starty-1) ) )
            {
                var thisRoom = null;
                if(this.house[x2+y2*this.width])
                {
                    thisRoom = this.house[x2+y2*this.width][0];
                }
                else
                {
                    thisRoom = new Room(RoomType.EMPTY,111,true);
                    //this.splitRoom(thisRoom);
                    this.house[x2+y2*this.width] = new Array( thisRoom );
                }
                
                var l = 0;//thisRoom.getNumberOfDoors();

                for(var u=0; u<3; u++)
                {
                    var dir = DirGetDirByRandom(this.randomObject);
                    while(dir == DirType.LEFT || dir == DirType.UP) dir = DirGetDirByRandom(this.randomObject);
                    var x = 0; var y = 0;
                    
                    if(dir==DirType.RIGHT)
                    {
                        if(x2!=this.width-1) // do not build to right when far right
                        {
                            var x = thisRoom.width-3;
                            var y = this.randomObject.nextInt(thisRoom.height-6)+3;
                            while( this.nearOtherDoorInY(y,x, thisRoom) ) y = this.randomObject.nextInt(thisRoom.height-6)+3;
                        }
                    }
                    if(dir==DirType.DOWN)
                    {
                        var y = thisRoom.height-3;
                        var x = this.randomObject.nextInt(thisRoom.width-6)+3;     
                        while( this.nearOtherDoorInX(x,y, thisRoom) ) x = this.randomObject.nextInt(thisRoom.width-6)+3;
                    }
                    var door = new Door();
                    door.doorDir = dir;
                    thisRoom.matris[x+y*thisRoom.width] = door;
                    door.belongToRoom = thisRoom; 
                }

                this.buildRoomsByDoors(thisRoom,x2+y2*this.width);
            }
            }
        }
        this.buildRoomsByDoors(room,startx+starty*this.width);
        


        //make two rooms of the type of three rooms. but other type reverse.
        var spot = this.getRandomSpot();
        while(!this.canSplitRoom(spot[0])) spot = this.getRandomSpot();
        this.splitRoom(spot[0],0);
        while(!this.canSplitRoom(spot[0])) spot = this.getRandomSpot();
        this.splitRoom(spot[0],2);

        for(var i = 0; i<this.width*this.height; i++)
        {
            var spot = this.house[i];
              
           
            if(spot)
            {
            this.splitRoom(spot[0],1);

                spot[1] = this.cloneRoom(spot[0]);
                spot[2] = this.cloneRoom(spot[0]); 
                spot[3] = this.cloneRoom(spot[0]);
                spot[4] = this.cloneRoom(spot[0]); 
                spot[5] = this.cloneRoom(spot[0]);
                spot[6] = this.cloneRoom(spot[0]); 

                this.removeTiles(spot[0],[4,5,14,15,24,25]); this.clearRoom(spot[0]);
                this.removeTiles(spot[1],[0,5,14,15,24,25]); this.clearRoom(spot[1]);
                this.removeTiles(spot[2],[4,0,14,15,24,25]); this.clearRoom(spot[2]);
                this.removeTiles(spot[3],[4,0,5,15,24,25]); this.clearRoom(spot[3]);
                this.removeTiles(spot[4],[4,0,14,5,24,25]); this.clearRoom(spot[4]);
                this.removeTiles(spot[5],[4,0,14,15,5,25]); this.clearRoom(spot[5]);
                this.removeTiles(spot[6],[4,0,14,15,24,5]); this.clearRoom(spot[6]);
                
                spot[0].alternativeRoom = spot[1];
                spot[1].alternativeRoom = spot[2];
                spot[2].alternativeRoom = spot[3];
                spot[3].alternativeRoom = spot[4];
                spot[4].alternativeRoom = spot[5];
                spot[5].alternativeRoom = spot[6];
                spot[6].alternativeRoom = spot[0];
                
                this.calcDoorConnect(spot[0]);
                this.calcDoorConnect(spot[1]);
                this.calcDoorConnect(spot[2]);
                this.calcDoorConnect(spot[3]);
                this.calcDoorConnect(spot[4]);
                this.calcDoorConnect(spot[5]);
                this.calcDoorConnect(spot[6]);
                
                this.clearRoom(spot[0]);
                this.clearRoom(spot[1]);
                this.clearRoom(spot[2]);
                this.clearRoom(spot[3]);
                this.clearRoom(spot[4]);
                this.clearRoom(spot[5]);
                this.clearRoom(spot[6]);
                
    //            this.fillRoomsWith(spot[0]);
      //          this.fillRoomsWith(spot[1]);
        //        this.fillRoomsWith(spot[2]);
                
            }
        }

        for(var i = 0; i<this.width*this.height; i++)
        {
            var spot = this.house[i];
            spot[0].openAllDoors();
            spot[1].openAllDoors();
            spot[2].openAllDoors();
            spot[3].openAllDoors();
            spot[4].openAllDoors();
            spot[5].openAllDoors();
            spot[6].openAllDoors();
        }

        var room = this.getStartRoom();
        room.entered = true;
        game.rooms.push(room);
        for(var i=0; i<250; i++)
        {
            room.getDoor = function() { for(var i=0; i<this.width*this.height; i++) if(this.matris[i] instanceof Door && !this.matris[i].opened && this.matris[i].toRoom!==true) { this.matris[i].opened = true; return this.matris[i]; } return false; }


            var door = room.getDoor();
            if(door===false)
            {
                room = game.getRandomRoom(this.randomObject);
            }
            else
            {
                room = this.openDoor(door);
            }
        }
    }

//    for(var i=0; i<50; i++)
  //  {
    //    
        var first = true;
        var initr = level*100;
        var randomObject = new Random(initr);
        while(this.roomCounter!=game.rooms.length || first)
        {
            game.rooms = new Array();
            var r = false;
            if(first)
            {
                this.randomObject = new Random(initr);
            }
            else
            {
                initr++;
                
                this.randomObject = new Random(initr);
            }
            first = false;

            //this.randomObject = new Random(60);
            this.rootBuild();

        }
   // }

        //TODO: unset all temponary stuff from objects being used in game


};
