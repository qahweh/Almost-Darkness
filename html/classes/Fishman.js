function Fishman(x,y,room)
{
    var r = new Human(x,y,room);
    r.imgx = 1;
    r.imgy = 1;
    r.isFishman = true; 
    r.health = 2;
    r.cooldown = 10;
    r.offsetImg = new Point(0,0);

    r.update = function()
    {
        this.updateLight(6);
        if(this.cooldown>0){this.cooldown--; return;}
        this.cooldown = 30;
        var dim = ( Math.random() < 0.5 );


        var f = new Point( parseInt(human.x2/28), parseInt(human.y2/38));
        var a = new Point( parseInt(this.x2/28), parseInt(this.y2/38));


        if(f.x == a.x) dim = false;
        if(f.y == a.y) dim = true;
     
        if(dim)
        {
            if(a.x > f.x)this.moveLeft(28);
            else if(a.x < f.x)this.moveRight(28);
        }
        else
        {
            if(a.y > f.y)this.moveUp(38);
            else if(a.y < f.y)this.moveDown(38);
        }
        if(Math.random()<0.2)this.cooldown = 10;

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
