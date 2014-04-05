function Table(room,pos)
{

    this.room = room;
    this.pos = pos;

    this.getImage = function()
    {
        if(this.room.matris[this.pos-1] instanceof Table && this.room.matris[this.pos+1] instanceof Table )return new Point(4,7);
        if(this.room.matris[this.pos-1] instanceof Table)return new Point(5,7);
        return new Point(3,7);
    }

    this.getDarkness = tileFactory.getDarkness;

    this.skipDraw = tileFactory.skipDraw;
    
};

