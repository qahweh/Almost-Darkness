function Lamp(x,y,room)
{
    this.x = x;
    this.y = y;
    this.currentRoom = room;
    this.x2 = x*28+14;
    this.y2 = y*38+19;
    this.offsetImg = new Point(14,0);
    this.frame = 0;

    this.getImage = function()
    {
        return new Point(0,8);
    }
    this.update = function() { this.frame+=parseInt(Math.random()*2) ; this.updateLight(1);}

    this.getHeight = function(){ return 90; }

    this.updateLight = function(effect)
    {
        if(game.config.light==0) return;

        if(!this.cachedLight)
        {
        this.cachedLight = new Array();
        var p = 3;
        for(var x=-5; x<6; x++)
        {
            for(var y=-5; y<6; y++)
            {
                var r = Math.abs(x)+Math.abs(y);
                var b = 70*effect;
                if(r==1)b = 60*effect;
                if(r==2)b = 39*effect;
                if(r==3)b = 33*effect;
                if(r==4)b = 20*effect;
                if(r==5)b = 10*effect;
                if(r==6)b = 7*effect;

                if(r==7)b = 5*effect;
                if(r==8)b = 1*effect;
                if(r==9)b = 0;
                if(r==10)b = 0;


                var t = this.currentRoom.getTile( parseInt(  ((this.x2)/28)+x) ,parseInt((this.y2)/38)+y );
                
                if(t instanceof Object)
                {
                var o = new Object();
                o.l = b+p;
                o.t = t;
                this.cachedLight.push( o );
                    t.brightness += b+p;
                }
            }
        
        }
        
        }
        else
        {
            for(var u=0; u < this.cachedLight.length; u++)
            {
                var o = this.cachedLight[u];
                o.t.brightness += o.l;
            }
        }
    }
} 
