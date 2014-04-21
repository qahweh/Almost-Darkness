function Fishman(x,y,room)
{
    var r = new Human(x,y,room);
    r.imgx = 1;
    r.imgy = 1;
    r.isFishman = true; 
    r.health = 2;
    r.cooldown = 10;
    r.offsetImg = new Point(14,35);
    r.animation = new Animation(1);

    r.update = function()
    {
        this.update2 = characterFactory.update2;
        this.update2();

        this.updateLight(6);
        if(this.cooldown>0){this.cooldown--; return;}
        
        var t = this.currentRoom.getTile( parseInt(this.x2/28), parseInt(this.y2/38));
        
        //console.log("-------");
        //console.log(t);

        //t.getImage = function() { return new Point(0,0) };

       // if(!t.feel)return;
        
        this.cooldown = 10;
/*
        var dim = ( Math.random() < 0.5 );

        var f = new Point( parseInt(game.human.x2/28), parseInt(game.human.y2/38));
        var a = new Point( parseInt(this.x2/28), parseInt(this.y2/38));

        if(f.x == a.x) dim = false;
        if(f.y == a.y) dim = true;
  */   
        this.action[65] = false;
        this.action[68] = false;
        this.action[87] = false;
        this.action[83] = false;

        var currentFeel = t.feel;
        var dir = new Array();
        dir[0] = this.currentRoom.getTile(   parseInt(this.x2/28)+1,   parseInt(this.y2/38)   ).feel;
        dir[1] = this.currentRoom.getTile(    parseInt(this.x2/28)-1,   parseInt(this.y2/38)  ).feel;
        dir[2] = this.currentRoom.getTile(   parseInt(this.x2/28),   parseInt(this.y2/38)-1   ).feel;
        dir[3] = this.currentRoom.getTile(    parseInt(this.x2/28),   parseInt(this.y2/38)+1  ).feel;

        if(!dir[0]) dir[0]=0;
        if(!dir[1]) dir[1]=0;
        if(!dir[2]) dir[2]=0;
        if(!dir[3]) dir[3]=0;

        dir[this.dir] += 1; //make current dir be the dir if top feel exist twice or more.

        //console.log(t.feel);

        var j = 0;
        var b = -1;
        for(var u=0; u<4; u++)
        {
            if(j<dir[u])
            {
                j=dir[u];
                b=u;
            }
        }
        
        if(b==1) this.action[65]=true;
        if(b==0) this.action[68]=true;
        if(b==2) this.action[87]=true;
        if(b==3) this.action[83]=true;
        t.feel = t.feel*0.5; //TODO: make feel drop around
/*
        if(dim)
        {
            if(a.x > f.x)this.action[65] = true;
            else if(a.x < f.x)this.action[68] = true;
        }
        else
        {
            if(a.y > f.y)this.action[87] = true;
            else if(a.y < f.y)this.action[83] = true;
        }
        //TODO: This cooldown do make fishman rush do not work in the way code been changed. skip rush logic or alter code to make it work 
        if(Math.random()<0.2)this.cooldown = 10;
*/


    }

    r.pieceEvent = function(piece)
    {
        if(piece.isHuman)piece.getHit();
        return true;
    }

    r.getImage = characterFactory.getImage;
    return r;
} 
