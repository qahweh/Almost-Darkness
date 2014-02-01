function Fishman(x,y,room)
{
    var r = new Human(x,y,room);
    r.imgx = 1;
    r.imgy = 1;
    r.isFishman = true; 
    r.health = 2;
    r.update = function()
    {
        var dim = ( Math.random() < 0.5 );
        if(this.x == human.x)dim=false;
        if(this.y == human.y)dim=true;
     
        if(dim)
        {
            if(this.x > human.x)this.moveLeft();
            else if(this.x < human.x)this.moveRight();
        }
        else
        {
            if(this.y > human.y)this.moveUp();
            else if(this.y < human.y)this.moveDown();
        }
        if(Math.random()<0.2)this.update();
    }

    r.pieceEvent = function(piece)
    {
        if(piece.isHuman)piece.getHit();
        return true;
    }

    r.getImage = function()
    {
        if(this.hurt) return new Point(1,4);
        if(!this.hurtAnimation)return new Point(1,1);
        
        var r = new Point(1,1);
        r.o = new Point(2,4);
        return r;

    }

    return r;
} 
