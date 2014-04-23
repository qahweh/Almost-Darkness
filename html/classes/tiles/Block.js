function Block()
{

    this.getDarkness = tileFactory.getDarkness;

    this.skipDraw = tileFactory.skipDraw;
    this.canWalkOn = true;
     
    this.getImage = function()
    {
        return new Point(8,9);
    }
}
