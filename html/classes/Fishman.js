function Fishman(x,y,room)
{
    var r = new Human(x,y,room);
    r.imgx = 1;
    r.imgy = 1;
    


r.update = function()
{
    
    this.moveLeft();
}

r.pieceEvent = function(piece)
{
    return true;
}


return r;
} 
