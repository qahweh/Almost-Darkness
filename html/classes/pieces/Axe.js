function Axe(x,y,room, thrower,aim)
{
    this.thrower = thrower;
    this.currentRoom = room;
    this.x2 = x*28;
    this.y2 = y*38;

    this.speedX = 1
    this.speedY = 1;
    this.topHeight = 120;
    if(aim)
    {
        aim.x += parseInt(Math.random()*3)-1; //do not spread this much if hard to hit
        aim.y += parseInt(Math.random()*3)-1; //

        var dx = aim.x - x;
        var dy = aim.y - y;
        var f = dx / dy;
        var a = Math.atan( f );

        var l = common.getDistanceByPoints(aim,new Point(x,y))/1.9;
        if(l<5)this.topHeight = 70;

        this.speedX = Math.sin(a)*l;
        this.speedY = Math.cos(a)*l;
        if(aim.y<y)
        {
            this.speedX = -this.speedX;
            this.speedY = -this.speedY;
        }
    }

    this.offsetImg = new Point(12,14);
    this.frame = 0; 
    this.getImage = function() { return new Point(10,8 + (parseInt(this.frame/6)%2)); }
    this.update = function()
    {
        this.frame++;
        if(this.getHeight()<=0)
        {
            this.currentRoom = null;
            return
        }
        this.x2+=this.speedX;
        this.y2+=this.speedY;
       
        //TODO: get by height
        var t= this.currentRoom.getPiece2(this.x2,this.y2,this.thrower,function(){},this.getHeight());
       
        if(t && t!=this && t.getHit) //TODO: make sure that axe never hit other axe if from same thrower
        {
            this.currentRoom = null;
            t.getHit();
        }
        
        for(var u=1; u<2; u++)
        {
        for(var i=0; i<5; i++)
        {
            var t = this.currentRoom.getTile( parseInt(  ((this.x2)/28)+u) ,parseInt((this.y2)/38)-i );
            if(t instanceof Object)
            {
                t.brightness += (4+(this.frame%2)*2);
            }
        }
	    }
    }
    this.getHeight = function()
    {
        return 3+Math.sin(this.frame/20)*this.topHeight;
    }
}
