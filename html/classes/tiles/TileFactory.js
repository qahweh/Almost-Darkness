function TileFactory()
{
    this.getDarkness = function()
    {
        var darkness = 1-this.brightness/100;
        if(darkness<0)return 0;
        if(darkness>1)return 1;
        return darkness;
    }

    this.skipDraw = function()
    {
        if(game.config.light==0)return true;
        return (this.obrightness == this.brightness); 
    }

}
