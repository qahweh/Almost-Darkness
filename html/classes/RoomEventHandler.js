function RoomEventHandler()
{
    this.ammoRoomLevel = 0;
    this.fishmanRoomLevel = 0;
    this.beenHandled = new Array();

    this.handleRoom = function(room)
    {
        if(!(room instanceof Room))throw "room must be instance of Room";

        for(var i=0; i<this.beenHandled.length; i++) if(this.beenHandled[i]==room) return;
        this.beenHandled.push(room);
        
        var r = Math.random();
        if(r<0.4)
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
        }
    }

    this.fillRoomsWith = function(room,withWhat,q)
    {
        for(var i =0; i<q; i++)
        {
            while(true)
            {
                var x = parseInt(Math.random()*room.width);
                var y = parseInt(Math.random()*room.height);
                var t = room.getTile(x,y);
                var p = room.getPiece(x,y);
                if( (t==0 || t==4 || t==5 || t==14 || t==15  || t==24 || t==25 ) && p==null) { pieces.push( withWhat(x,y,room) ); break; }
            }
        }
    }
}
