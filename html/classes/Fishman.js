function Fishman(x,y,room)
{
    var r = new Human(x,y,room);
    r.imgx = 1;
    r.imgy = 1;
   r.isFishman = true; 


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


}

r.pieceEvent = function(piece)
{
    if(piece.isHuman)piece.hurt=true;
    return true;
}

r.getImage = function()
{
    if(this.hurt) return new Point(1,4);
    return new Point(1,1);
}


return r;
} 
