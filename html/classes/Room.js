function Room()
{
    this.width = 40; //TODO: use 'const' if always is this width/height is one every room
    this.height = 19;
};

Room.prototype.getTile = function(x,y)
{
    if(x>10 && x<30 && y>3 && y<15)
    {
        if(y==4 || y==14) { if( ((x+y*3)%7) ==0)return 3; return 2; }
        if(x==11 || x==29) {if( ((x+y*3)%7) ==0)return 3; return 1; }
        return 0;
    }
    return -1;
}
