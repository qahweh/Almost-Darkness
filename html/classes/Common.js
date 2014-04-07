function Common()
{
    this.getDirByPoints = function(a,b)
    {
        var dx = Math.abs(a.x - b.x);
        var dy = Math.abs(a.y - b.y);
        if(dy>dx)
        {
            if(a.y > b.y)return 2;
            return 3;
        }
        if(a.x > b.x)return 1;
        return 0; 
    }
} 
