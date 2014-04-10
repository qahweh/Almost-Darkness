function Water()
{

    this.getDarkness = tileFactory.getDarkness;

    this.skipDraw = tileFactory.skipDraw;
 

    this.getImage = function()
    {
        return new Point(7,9);
    }
}
