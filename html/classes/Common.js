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

    this.getDistanceByPoints = function(a,b)
    {
        var dx = a.x - b.x;
        var dy = a.y - b.y;
        return Math.sqrt(dx*dx + dy*dy);
    }
    
    this.pointsMerge = function(a1,a2,b1,b2)
    {
		if(a1<=b2 && a1>=b1) return true;
		if(a2<=b2 && a2>=b1) return true;
		if(b1<=a2 && b1>=a1) return true;
		if(b2<=a2 && b2>=a1) return true;
		return false;
	}
} 
