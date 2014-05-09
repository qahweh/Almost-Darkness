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
        this.frameskip = 0;
        this.noLightEffect = false;
        this.menu = 0;
        this.rooms = new Array();
        this.level = 1;
        this.config = new Object();
        this.config.light = 1;
        this.zLevel=3;
        this.totalNumberOfRooms = false;
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

    this.getRandomTile = function()
    {
        if(!this.human) return;
        if(!this.human.currentRoom) return;
    	r = parseInt(Math.random()*this.human.currentRoom.width*this.human.currentRoom.height);
        return this.human.currentRoom.matris[r];
    }

    this.nextFeel = new Array();

    this.nextLevelHandler = function()
    {
        return;
        var f = function(pieces)
        {
            for(var i=0; i<pieces.length; i++)
            {
                if(pieces[i].isFishman && !pieces[i].hurt) return false;
            }
            return true; 
        }

        if(f(this.pieces))
        {
            this.zLevel++;
            for(var t=0; t<this.zLevel; t++)
            {
                this.pieces.push ( new Fishman(12+parseInt(t/2),8+(t%2)*7,this.human.currentRoom) );
            }
        }

    }

    this.feelHandler = function()
    {
        for(var i=0; i<60; i++)
        {
            var ttt = false;
            if(this.nextFeel.length==0)
            {
                return;
              //  ttt = this.getRandomTile();  //Instead of get random try remeber what next tile is to split feel on
            }
            else
            {
                ttt = this.nextFeel[0];
                this.nextFeel.splice(0,1);
            }


            if(ttt instanceof Object && ttt.feel)
            {
                var spreadEffect = ttt.feel*0.15;
                if(spreadEffect>0.1)
                {
                    var numberOfSpread = 0;
                    var ttr = this.human.currentRoom.getTile(ttt.x+1,ttt.y);
                    if(ttr instanceof Object && ttr.getPiece && ttr.getPiece()==null) 
                    {
                        if(spreadEffect>ttr.feel)
                        {
                            ttr.feel += spreadEffect;
                            this.nextFeel.push(ttr);
                            numberOfSpread++;
                        }
                    }    

                    var ttr = this.human.currentRoom.getTile(ttt.x-1,ttt.y);
                    if(ttr instanceof Object && ttr.getPiece && ttr.getPiece()==null)
                    {
                        if(spreadEffect>ttr.feel)
                        {
                            ttr.feel += spreadEffect;
                            this.nextFeel.push(ttr);
                            numberOfSpread++;
                        }
                    }

                    var ttr = this.human.currentRoom.getTile(ttt.x,ttt.y+1);
                    if(ttr instanceof Object && ttr.getPiece && ttr.getPiece()==null)
                    {
                        if(spreadEffect>ttr.feel)
                        {
                            ttr.feel += spreadEffect;
                            this.nextFeel.push(ttr);
                            numberOfSpread++;
                        }
                    }

                    var ttr = this.human.currentRoom.getTile(ttt.x,ttt.y-1);
                    if(ttr instanceof Object && ttr.getPiece && ttr.getPiece()==null)
                    {
                        if(spreadEffect>ttr.feel)
                        {
                            ttr.feel += spreadEffect;
                            this.nextFeel.push(ttr);
                            numberOfSpread++;
                        }
                    }

                    var ttr = this.human.currentRoom.getTile(ttt.x,ttt.y);
                    if(ttr instanceof Object)
                    {
                        if(numberOfSpread==4) ttr.feel = ttt.feel*0.40;
                        else if(numberOfSpread==3) ttr.feel = ttt.feel*0.55;
                        else if(numberOfSpread==2) ttr.feel = ttt.feel*0.70;
                        else if(numberOfSpread==1) ttr.feel = ttt.feel*0.85;
                    }
                }
            }
        }
    }

    this.update = function()
    {
        if(this.sleep>0){this.sleep--; return;}
        this.frame++;

        if(this.gameState==2)
        {
            drawText(0,0,"creates world...",gamecanvasC);
            this.gameState=3;
            this.sleep = 100;
            return;
        }

        if(this.gameState==3)
        {
            if(this.level==1) var hb = new HouseBuilder2(this.level);
            else var hb = new HouseBuilder(this.level);
            var roomstart = hb.getStartRoom();
            currentRoom = roomstart;
            this.human = new Human(20,13,roomstart);
            this.human.dir = 2;
            this.reh.handleRoom(roomstart,function(x,y){return false;});
            this.human.isHuman=true;
            this.pieces.push(this.human);             
            this.human.currentRoom=roomstart;
            drawText(0,1,"...done",gamecanvasC);
            this.gameState=4;
            this.sleep = 100;
            this.human.currentRoom.resetFeel();
            return;
        }

        if(this.gameState==1)
        {
            drawText(13,4,"almost darkness",gamecanvasC);
         
            if(this.menu==0)
            {   
                drawText(17,12,(this.option==0 ? ";" : " ")+"start"+(this.option==0 ? ";" : " "),gamecanvasC);
                drawText(16,13,(this.option==1 ? ";" : " ")+"options"+(this.option==1 ? ";" : " "),gamecanvasC);
            }
            else if(this.menu==1)
            {   
                drawText(14,12,(this.option==0 ? ";" : " ")+"frameskip "+this.frameskip+(this.option==0 ? ";" : " "),gamecanvasC);
                drawText(16,13,(this.option==1 ? ";" : " ")+"level "+this.level+(this.option==1 ? ";" : " "),gamecanvasC);
                drawText(16,14,(this.option==2 ? ";" : " ")+"return"+(this.option==2 ? ";" : " "),gamecanvasC);
            }
        }


        if(this.gameState==4)
        {

            var updateTile = new Array();
            this.feelHandler();
            this.nextLevelHandler();
            if(game.config.light!=0)
            {
            for(var x=0; x<this.human.currentRoom.width; x++)
            {
                for(var y=0; y<this.human.currentRoom.height; y++)
                {            
                    var t = this.human.currentRoom.getTile(x,y);
                    if(t instanceof Object) t.brightness = 38;
                }
            }
            }

            this.human.update2();
       
            var dt = new Array();
            dt.push(this.human);
            var pu = this.updatePieces();
            dt = dt.concat(pu);                    
/*
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
*/
            if(this.frame%(this.frameskip+1)!=0)return;

            drawRoom(updateTile);

            for(var g=0; g<2; g++)
            { 
            for(var y=0; y<this.human.currentRoom.height; y++)
            {
                   for(var i=0; i<dt.length; i++)
                    {
                             var p = dt[i];
                             var h = ( p.getHeight ? p.getHeight() : 0 );
                         
                       
                           if( parseInt(p.y2/38)==y) drawPiece(p, (g==0));
                        
                    }
                }
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
                if(this.menu==0)
                {
                    if(this.option==0) {                 gamecanvasC.clearRect(0,0,1120,722);
this.gameState = 2;}
                    else if(this.option==1) {                gamecanvasC.clearRect(0,0,1120,722);
this.menu = 1; this.option=2; }
                }
                else if(this.menu==1)
                {
                    if(this.option==0) { this.frameskip++; if(this.frameskip>9)this.frameskip=0;}
                    else if(this.option==1) { this.level++; if(this.level>9)this.level=1; }
                    else if(this.option==2) {                gamecanvasC.clearRect(0,0,1120,722);
this.menu = 0; this.option=1; }

                }
            }
            if(key==87)this.option--;
            if(key==83)this.option++;

            if(this.option<0) this.option=0;
            if(this.menu==0) if(this.option>1)this.option=1;
            if(this.menu==1) if(this.option>2)this.option=2;

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
