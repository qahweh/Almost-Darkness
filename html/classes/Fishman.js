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

        if(!t.feel)return;
        
        this.cooldown = 30;
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
        var rightFeel = this.currentRoom.getTile(   parseInt(this.x2/28)+1,   parseInt(this.y2/38)   ).feel;
        var leftFeel = this.currentRoom.getTile(    parseInt(this.x2/28)-1,   parseInt(this.y2/38)  ).feel;
        var upFeel = this.currentRoom.getTile(   parseInt(this.x2/28),   parseInt(this.y2/38)-1   ).feel;
        var downFeel = this.currentRoom.getTile(    parseInt(this.x2/28),   parseInt(this.y2/38)+1  ).feel;


        //console.log(t.feel);

        
        if(leftFeel>=rightFeel && leftFeel>=downFeel && leftFeel>=upFeel) this.action[65]=true;
        if(rightFeel>=leftFeel && rightFeel>=downFeel && rightFeel>=upFeel) this.action[68]=true;
        if(upFeel>=leftFeel && upFeel>=downFeel && upFeel>=rightFeel) this.action[87]=true;
        if(downFeel>=leftFeel && downFeel>=upFeel && downFeel>=rightFeel) this.action[83]=true;
        t.feel = 0;
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
