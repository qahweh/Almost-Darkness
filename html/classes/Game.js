function Game()
{

    this.init = function()
    {
        this.pieces = new Array();
        this.reh = new RoomEventHandler();
        this.forceDrawAll = false;
        this.ammo = 12;
        this.doors = 0;
        this.camera = new Point(0,0);
        this.frame = 0;
        this.gameState = 1;
        this.option = 0;
        this.sleep = 0;
        this.frameskip = 20;
        this.rooms = new Array();
    }

    this.getRandomRoom = function(random)
    {
        random = typeof random !=='undefined' ? random : false;
        var r = false;
        if(random===false)
        {
            r = parseInt(Math.random()*this.rooms.length);
        }
        else
        {
            r = random.nextInt(this.rooms.length);
        }

        
        return this.rooms[r];
    }

    this.update = function()
    {
        if(this.sleep>0){this.sleep--; return;}
        this.frame++;

        if(this.gameState==1)
        {
            drawText(13,4,"almost darkness",gamecanvasC);
            
            drawText(17,12,(this.option==0 ? ";" : " ")+"start"+(this.option==0 ? ";" : " "),gamecanvasC);
            drawText(16,13,(this.option==1 ? ";" : " ")+"options"+(this.option==1 ? ";" : " "),gamecanvasC);
        }

        if(this.gameState==2)
        {
            drawText(0,0,"creates world...",gamecanvasC);
            this.gameState=3;
            this.sleep = 100;
            return;
        }

        if(this.gameState==3)
        {
            var hb = new HouseBuilder();
            var roomstart = hb.getStartRoom();
            currentRoom = roomstart;
            this.human = new Human(19,5,roomstart);
            this.reh.handleRoom(roomstart,function(x,y){return false;});
            this.human.isHuman=true;
            this.pieces.push(this.human);             
            this.human.currentRoom=roomstart;
            drawText(0,1,"...done",gamecanvasC);
            this.gameState=4;
            this.sleep = 100;
            return;
        }

        if(this.gameState==4)
        {

            var updateTile = new Array();

            for(var x=0; x<this.human.currentRoom.width; x++)
            {
                for(var y=0; y<this.human.currentRoom.height; y++)
                {            
                    var t = this.human.currentRoom.getTile(x,y);
                    if(t instanceof Object) t.brightness = 22;
                }
            }

            this.human.update2();
       
            var dt = new Array();
            dt.push(this.human);
            var pu = this.updatePieces();
            dt = dt.concat(pu);                    

            for(var i=0; i<dt.length; i++)
            {
                var p = dt[i];
                var c = ( p.getTilePos ? p.getTilePos() : -1);
                if(c.hurt)c=-1;
                if(c>-1)
                {
                    updateTile.push(c);
                    updateTile.push(c-1);
                    updateTile.push(c+1);
                    updateTile.push(c+this.human.currentRoom.width);
                    updateTile.push(c-this.human.currentRoom.width);
                    updateTile.push(c+this.human.currentRoom.width+1);
                    updateTile.push(c-this.human.currentRoom.width+1);
                    updateTile.push(c+this.human.currentRoom.width-1);
                    updateTile.push(c-this.human.currentRoom.width-1);
                }
            }

            if(this.frame%this.frameskip!=0)return;

            drawRoom(updateTile);

            for(var i=0; i<dt.length; i++)
            {
                var p = dt[i];
                drawPiece(p);
            }
        
            if(Math.random()<0.1 )
            {
                refreshStatus();
            }
        }
    }

    this.updatePieces = function()
    {
        var index;
        var wasUpdated = new Array();
        for(index = 0; index < this.pieces.length; index++)
        {
            var p = this.pieces[index];
            if(p.currentRoom == this.human.currentRoom)
            {
                if(p!=this.human) if(p.update){ p.update(); wasUpdated.push(p);}
            }
        }
        return wasUpdated;
    }

    this.doAction = function(key)
    {
        if(this.gameState==1)
        {
            if(key==13)
            {
                this.gameState = 2;
            }
            if(key==87 || key==83)this.option++;
            if(this.option>1)this.option=0;
        }
        if(this.gameState==4)
        {
            this.human.doAction(key);
        }
    }

    this.releaseAction = function(key)
    {
        if(this.gameState==4)
        {
            this.human.releaseAction(key);
        }
    }

}
