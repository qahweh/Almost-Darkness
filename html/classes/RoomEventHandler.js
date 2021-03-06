function RoomEventHandler()
{
    this.ammoRoomLevel = 0;
    this.fishmanRoomLevel = 0;
    this.beenHandled = new Array();

    this.itemsToCome = new Array();
    
    this.pieces = game.pieces;


    obj = new Object();
    obj.f = function(x,y,room){ return new RunningShoes(x,y,room)};
    obj.w = 2;
    this.itemsToCome.push( obj)

    obj = new Object();
    obj.f = function(x,y,room){ return new Gun(x,y,room)};
    obj.w = 2;
    this.itemsToCome.push( obj);

    this.handleRoom = function(room, doNotBuildHere)
    {
        this.doNotBuildHere = doNotBuildHere;
        if(!(room instanceof Room))throw "room must be instance of Room";

        for(var i=0; i<this.beenHandled.length; i++) if(this.beenHandled[i]==room) return;
        this.beenHandled.push(room);

        if(this.beenHandled.length == 1)
        {           
            if(game.level==1)
            {
                this.pieces.push ( new Chest(13,8,room) );
                this.pieces.push ( new Chest(13,13,room) );
                this.pieces.push ( new Chest(16,8,room) );
               // this.pieces.push ( new Lamp(13,9,room) );
               // this.pieces.push ( new Lamp(22,13,room) );
               // this.pieces.push ( new Lamp(11,16,room) );
                this.pieces.push ( new Gun(22,14,room) );
            }
            else
            {
                this.pieces.push(  new Candle(13,9,room) );
                this.pieces.push(  new Candle(15,12,room) );
                this.pieces.push(  new Candle(22,9,room) );
                this.pieces.push(  new Candle(26,6,room) );
                this.pieces.push(  new Candle(30,12,room) );
                this.pieces.push(  new Candle(31,5,room) );
                this.pieces.push(  new Candle(8,10,room) );
            }
            return;
        }



        for(var i=0; i<room.width*room.height; i++)
        {
            
            if(room.matris[i].isFloor)break;
        }

        var n=0;
        while(true)
        {
            n = parseInt( Math.random()*14 )+1;
            if( room.matris[i+room.width*(n+1)] && room.matris[i+room.width*(n+1)].isFloor)break; 
        }
        var s = i+room.width*n;
 
        for(var t=s; t<s+100; t++)
        {
            if(room.matris[t].isFloor) 
            {
                if( !(room.matris[t-1] instanceof Door) &&  !(room.matris[t+1] instanceof Door))
                room.matris[t] = new Water();
                
            } 
            else break;
        }



        for(var i = 0; i<room.width*room.height; i++)
        {
            if(room.matris[i] instanceof Object)
            {
                var p = PointgetPointByIndex(i);
                while(this.doNotBuildHere(p.x+1,p.y+1))
                {
                    p.x++;
                }
                this.pieces.push(  new Lamp(p.x+1,p.y+1,room) );
                break;
            }
        }

        for(var i = 0; i<room.width*room.height; i++)
        {
            var f = room.width*room.height -i -1;
            if(room.matris[f] instanceof Object)
            {
                var p = PointgetPointByIndex(f);
                var lamp = false;
                while(this.doNotBuildHere(p.x-1,p.y-1))
                {
                    p.x--;
                }
                lamp = new Lamp(p.x-1,p.y-1,room);
                this.pieces.push(  lamp );
                break;
            }
        }

        var itemsToComeHandled = false;
        if(this.itemsToCome.length>0)
        {
            while(this.itemsToCome[0].w < this.beenHandled.length)
            {
                this.fillRoomsWith(room, this.itemsToCome[0].f, 1); this.itemsToCome.splice(0,1);itemsToComeHandled = true;
                if(!this.itemsToCome[0])return;
            }
        }
        if(itemsToComeHandled)return;        


        var r = Math.random();
        if(r<0.77)
        {
            var diff = this.fishmanRoomLevel-this.ammoRoomLevel;
            if(diff<-2)this.fishmanRoomLevel+=5;
            else this.fishmanRoomLevel++;

            var noft = room.getNumberOfFloorTiles();
            var h = parseInt(noft / this.fishmanRoomLevel);
            if(h>6)
            {
                this.fillRoomsWith(room, function(x,y,room){ return new Fishman(x,y,room,1); },this.fishmanRoomLevel)
            }
            else if(h>3)
            {
                this.fillRoomsWith(room, function(x,y,room){ return new Fishman(x,y,room,1); },parseInt(this.fishmanRoomLevel/3))
                this.fillRoomsWith(room, function(x,y,room){ return new Fishman(x,y,room,2); },parseInt(this.fishmanRoomLevel/3))
            }
            else
            {
                this.fillRoomsWith(room, function(x,y,room){ return new Fishman(x,y,room,2); },parseInt(this.fishmanRoomLevel/2))				
			}
        }
        else if(r<0.9)
        {


            var diff = this.ammoRoomLevel-this.fishmanRoomLevel;
            if(diff<-2)this.ammoRoomLevel+=5;
            else this.ammoRoomLevel++;
            this.fillRoomsWith(room, function(x,y,room){ return new Ammobox(x,y,room); },this.ammoRoomLevel);
        }
        else
        {
            this.fillRoomsWith(room, function(x,y,room){ return new QuestItem(x,y,room); },1);
            this.fillRoomsWith(room, function(x,y,room){ return new Health(x,y,room); },1);
        }

        
        this.fillRoomsWith(room, function(x,y,room){ return new Chest(x,y,room); },1);
        this.fillRoomsWith(room, function(x,y,room){ return new StoneBlock(x,y,room); },parseInt(room.getNumberOfFloorTiles()/10));

        var t = parseInt(Math.random()*room.width*room.height);
        while(!room.matris[t].isFloor)
        {
            t = parseInt(Math.random()*room.width*room.height);
        }
        room.matris[t] = new Carpet(room,t);
        var dx = ( Math.random()<0.5 ? -1 : 1 );
        while(room.matris[t+dx].isFloor)
        {
            room.matris[t+dx] = new Carpet(room,t+dx);
            if(dx<0)dx--;
            else if(dx>0)dx++;
        }

        var j = function(i) { return i;  };
        var j2 = function(i) { return i+room.width;  };

        if(Math.random()<0.5)
        {
            var j = function(i) { return room.width*room.height-i-1;  };
            var j2 = function(i) { return        (room.width*room.height-i-1) - room.width;         };
        }
        for(var i = 0; i<room.width*room.height; i++)
        {
            if(room.matris[j(i)] instanceof Carpet)
            {
                if(room.matris[j2(i)].isFloor) room.matris[j2(i)] = new Carpet(room,j2(i));
            }
        }


    }

    this.fillRoomsWith = function(room,withWhat,q)
    {
        for(var i =0; i<q; i++)
        {
            var c = 0;
            while(true)
            {
                c++;
                if(c>1000) return;
                var x = parseInt(Math.random()*room.width);
                var y = parseInt(Math.random()*room.height);
                var t = room.getTile(x,y);
                var p = room.getPiece(x,y);
                if( (t==0 || t==4 || t==5 || t==14 || t==15  || t==24 || t==25 || (t instanceof Object && t.canWalkOn)) && p==null && !this.doNotBuildHere(x,y)) { this.pieces.push( withWhat(x,y,room) ); break; }
            }
        }
    }
}
