function Block()
{

    this.getDarkness = tileFactory.getDarkness;

    this.skipDraw = tileFactory.skipDraw;
 
    this.getImage = function()
    {
        return new Point(8,9);
    }
}
