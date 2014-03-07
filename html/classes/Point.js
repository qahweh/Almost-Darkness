function Point(x,y)
{
    this.x = x;
    this.y = y;
}

PointgetPointByIndex = function(i)
{
        return new Point(i%RoomValue.WIDTH,parseInt(i/RoomValue.WIDTH));        
}

