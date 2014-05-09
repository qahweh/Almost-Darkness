

function Carpet(room,pos)
{

    this.room = room;
    this.pos = pos;
    this.currentRoom = room;
    this.canWalkOn = true;
    this.x = pos%room.width;
    this.y = parseInt(pos/room.width);

    this.getImage = function()
    {
        if( this.connect(this.pos-1) && this.connect(this.pos+1) )
        {
            if(!this.connect(this.pos-this.room.width) ) return new Point(9,2);  
            return new Point(9,3);  
        }

        if(this.connect(this.pos+1))
        {
           return new Point(9,0); 
        }
        if(!(this.connect(this.pos-this.room.width))) return new Point(9,1);  
        

        return new Point(6,6);
    }

    this.getDarkness = function()
    {
            var abrightness = this.brightness/100;
            if(abrightness>1)return 0;
            return ( abrightness < 1 ? 1-abrightness : 1);
    }

    this.connect = function(pos)
    {
        if(this.room.matris[pos] instanceof Carpet) return true;
        if(this.room.matris[pos].isWall) return true;
        return false;
    }

    this.skipDraw = tileFactory.skipDraw;
    this.getNextToTile = tileFactory.getNextToTile;
};

