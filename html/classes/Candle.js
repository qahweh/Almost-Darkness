function Candle(x,y,room)
{
    this.x = x;
    this.y = y;
    this.currentRoom = room;
    this.x2 = x*28;
    this.y2 = y*38;
    this.offsetImg = new Point(parseInt(Math.random()*5)-2,14-parseInt(Math.random()*3));
    this.frame = 0;
    this.currentImg = new Point(6,4)

    this.getImage = function()
    {
        //TODO: make sure images have even animation steps. and make animation more random in what order images happen

        if(this.frame%11==3)this.currentImg = new Point(6,4);
        if(this.frame%11==7)this.currentImg = new Point(6,5);
        if(this.frame%11==0)this.currentImg = new Point(6,7);
        return this.currentImg;
    }
    this.update = function() { this.frame+=parseInt(Math.random()*2) ; this.updateLight(7);}

    this.updateLight = function(effect)
    {
        var p = parseInt(Math.random()*7);
        if(game.noLightEffect)p = 3;
        for(var x=-1; x<2; x++)
        {
            for(var y=-1; y<2; y++)
            {
                var r = Math.abs(x)+Math.abs(y);
                var b = 8*effect;
                if(r==1)b = 4*effect;
                if(r==2)b = 1*effect;


                var t = this.currentRoom.getTile( parseInt(  ((this.x2)/28)+x) ,parseInt((this.y2)/38)+y );
                if(t instanceof Object)
                {
                    t.brightness += b+p;
                }
            }
        }
    }
} 
