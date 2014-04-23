function Water()
{

    this.getDarkness = tileFactory.getDarkness;
    this.canThrowOver = true;
    this.skipDraw = tileFactory.skipDraw;
    this.isWater = true; 

    this.getImage = function()
    {
        return new Point(7,9);
    }
}
