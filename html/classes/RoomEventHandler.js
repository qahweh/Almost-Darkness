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
    this.itemsToCome.push( obj)


    var obj = new Object();
    obj.f = function(x,y,room){ return new Key(x,y,room)};
    obj.w = 4;

    this.itemsToCome.push( obj)

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
                this.pieces.push ( new Fishman(13,8,room) );
                this.pieces.push ( new Fishman(13,13,room) );
                this.pieces.push ( new Fishman(16,8,room) );
                this.pieces.push ( new Lamp(13,9,room) );
                this.pieces.push ( new Lamp(22,13,room) );
                this.pieces.push ( new Lamp(11,16,room) );
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
                lamp.offsetImg = new Point(-16,-18);
                this.pieces.push(  lamp );
                break;
            }
        }

        var itemsToComeHandled = false;
        if(this.itemsToCome.length>0)
        {
            while(this.itemsToCome[0].w < this.beenHandled.length){ this.fillRoomsWith(room, this.itemsToCome[0].f, 1); this.itemsToCome.splice(0,1);itemsToComeHandled = true;  }
        }
        if(itemsToComeHandled)return;        


        var r = Math.random();
        if(r<0.45)
        {
            var diff = this.fishmanRoomLevel-this.ammoRoomLevel;
            if(diff<-2)this.fishmanRoomLevel+=5;
            else this.fishmanRoomLevel++;
            this.fillRoomsWith(room, function(x,y,room){ return new Fishman(x,y,room); },this.fishmanRoomLevel)
        }
        else if(r<0.8)
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
    }

    this.fillRoomsWith = function(room,withWhat,q)
    {
        for(var i =0; i<q; i++)
        {
            var c = 0;
            while(true)
            {
                c++;
                if(c>1000) throw "loop freeze";
                var x = parseInt(Math.random()*room.width);
                var y = parseInt(Math.random()*room.height);
                var t = room.getTile(x,y);
                var p = room.getPiece(x,y);
                if( (t==0 || t==4 || t==5 || t==14 || t==15  || t==24 || t==25 || (t instanceof Object && t.canWalkOn)) && p==null && !this.doNotBuildHere(x,y)) { this.pieces.push( withWhat(x,y,room) ); break; }
            }
        }
    }
}
