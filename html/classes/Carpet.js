function Carpet(room,pos)
{

    this.room = room;
    this.pos = pos;
    this.canWalkOn = true;
    this.getImage = function()
    {
        return new Point(6,6);
    }

    this.getDarkness = function()
    {
            var abrightness = this.brightness/100;
            if(abrightness>1)return 0;
            return ( abrightness < 1 ? 1-abrightness : 1);
    }

    this.skipDraw = function()
    {
        return (this.obrightness == this.brightness);
    }
    
};

