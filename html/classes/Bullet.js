function Bullet(x,y,room, shooter)
{
    this.currentRoom = room;
    this.x2 = x;
    this.y2 = y;
    this.offsetImg = new Point(14,25);
    this.frame = 0;
    this.dir = shooter.dir;
    this.shooter = shooter;
    this.ignoreTileCollision = function(t){ return (t.canWalkOn || t.canThrowOver); }
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
        if(this.currentRoom==null)return;
        for(var i=0; i<2; i++)
        {
			var dx=0;
			var dy=0;
			if(i==1)
			{
				if(this.dir==0)dx=-1;
				if(this.dir==1)dx=1;
				if(this.dir==2)dy=1;
				if(this.dir==3)dy=-1;
			}
            var t = this.currentRoom.getTile( parseInt(  ((this.x2)/28)+dx) ,parseInt((this.y2)/38)+dy );
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
        if(p instanceof Lamp)return;
        if(p instanceof Ammobox)return;
        if(p instanceof Health)return;
        if(p instanceof Axe){ p.speedX = -p.speedX; p.speedY = -p.speedY; }
        if(p instanceof StoneBlock){p.health--;};
        if(p instanceof Chest){p.health--;};
        if(p.getHit)
        {
			if(this.shooter.magicFreeze) p.freeze = 200; 
			if(this.shooter.magicPoison) p.isPoison = true; 
			p.getHit();
		}
        this.remove();
    }

    // values are unrealistic but will make bullet more easy hit for example hit axes i air and that makes game better
    this.getTall = function(){ return 20; }    
    this.getHeight = function(){ return 13; }
    // ----------
} 
