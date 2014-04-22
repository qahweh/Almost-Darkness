function TileFactory()
{

    this.init = function()
    {
    }

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

    this.setFeel = function(f)
    {
        if(f<1)return; 
        console.log(f);
        this.feel = f;

        for(var dx=-1; dx<3; dx+=2)
        {
        var t = this.currentRoom.getTile( this.x+dx, this.y);        
        if(t && t!=-1 && t.feel<f*0.25 && t.setFeel)
        {
            t.setFeel(f*0.25);
        }
 
        }

        for(var dy=-1; dy<3; dy+=2)
        {
        var t = this.currentRoom.getTile( this.x, this.y+dy);        
        if(t && t!=-1 && t.feel<f*0.25 && t.setFeel)
        {
            t.setFeel(f*0.25);
        }
        }
    }

    this.getNextToTile = function(dir)
    {
        if(!this.nextToTiles)
        {
            this.nextToTiles = new Array();
            this.nextToTiles[DirType.LEFT] = this.currentRoom.getTile( this.x-1,this.y);
            this.nextToTiles[DirType.RIGHT] = this.currentRoom.getTile( this.x+1,this.y);
            this.nextToTiles[DirType.UP] = this.currentRoom.getTile( this.x,this.y-1);
            this.nextToTiles[DirType.DOWN] = this.currentRoom.getTile(this.x,this.y+1);
        }
        return this.nextToTiles[dir];
    }


}
