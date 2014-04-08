function Bullet(x,y,room, shooter)
{
    this.currentRoom = room;
    this.x2 = x;
    this.y2 = y;
    this.offsetImg = new Point(14,25);
    this.frame = 0;
    this.dir = shooter.dir;
    this.shooter = shooter;
    this.ignoreTileCollision = function(t){ return t.canWalkOn }
    this.ignorePieceCollision = function(p) { return (p.hurt)  }
    this.getImage = function()
    {
        return new Point(1,1);
    }
    this.remove = pieceFactory.remove;
    this.update = function()
    {
        this.frame++;
        this.u = pieceFactory.move;
        if(this.dir==0) this.u(7,0)
        else if(this.dir==1) this.u(-7,0);
        else if(this.dir==2) this.u(0,-7);
        else this.u(0,7);

        for(var i=0; i<2; i++)
        {
            var t = this.currentRoom.getTile( parseInt(  ((this.x2)/28)-i) ,parseInt((this.y2)/38) );
            if(t instanceof Object)
            {
                t.brightness += (4+(this.frame%2)*2)-i*3;
            }
        }

    }
    this.collisionEvent = function(){}
    for(i=0; i<2; i++)this.update(); //run once to do not make it start in shooter. call this before make "real" collisionEVent
    this.collisionEvent = function(p)
    {
        if(p==shooter)return;
        if(p.getHit) { p.getHit(); }
        this.remove();
    }
} 
