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

    this.getImage = function()
    {
        return new Point(1,1);
    }
    this.remove = pieceFactory.remove;
    this.update = function()
    {
        this.u = pieceFactory.move;
        if(this.dir==0) this.u(7,0)
        else if(this.dir==1) this.u(-7,0);
        else if(this.dir==2) this.u(0,-7);
        else this.u(0,7);
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