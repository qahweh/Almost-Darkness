function Fishman(x,y,room,level)
{
    var r = new Human(x,y,room);
    r.imgx = 1;
    r.imgy = 1;
    r.isFishman = true; 
    r.health = 2;
    r.cooldown = 10;
    r.offsetImg = new Point(14,35);
    r.level = level;
    r.canBeFreezed = true;
    r.animation = new Animation(1);
    r.normalanimation = new Animation(1);
    if(r.level==2)
    {
		r.animation = new Animation(4);
		r.normalanimation = new Animation(4);
        r.health = 5;
    }
    r.hurtFrame = 0;
    r.steplength=0.8;
    r.walklength = 0.75;
    r.dir = DirGetDirByRandom()-1;

    // Override to forceToCenter function so it will always use close as true. Fishman moved in a weird way when use close = false. 
    // Works better when true and fishman movement is not in need of that close = false logic
    r.forceToCenter = function(close)
    {
        this.f = characterFactory.forceToCenter;
        this.f(true);
    }

    r.collideTileEvent = function(t)
    {
        if(this.canWalkOn(t)) return;
        this.randomTurn();
    }

    r.randomTurn = function()
    {
		this.action[65] = false;
        this.action[68] = false;
        this.action[87] = false;
        this.action[83] = false;
        var x = DirGetDirByRandom();
        if(x==DirType.RIGHT) this.action[68] = true;
        if(x==DirType.LEFT) this.action[65] = true;
        if(x==DirType.DOWN) this.action[83] = true;
        if(x==DirType.UP) this.action[87] = true;
	}

    r.update = function()
    {
        this.update2 = characterFactory.update2;
        this.update2();
        if(this.hurt)this.hurtFrame++;
        if(this.hurtFrame==100) { this.currentRoom = null;  game.pieces.push ( 
        (Math.random()<0.5 ? new Ammobox( parseInt(this.x2/28), parseInt(this.y2/38), room) 
                           :  new Health( parseInt(this.x2/28), parseInt(this.y2/38), room ))); }
        this.updateLight(6);
        if(this.cooldown>0){this.cooldown--; return;}
       
        if(Math.random()<0.03 && !this.hurt && this.freeze==0 && common.getDistanceByPoints(new Point(this.x2,this.y2),new Point(game.human.x2,game.human.y2))>100)
        {
            game.pieces.push ( new Axe( parseInt(this.x2/28)+0.5, parseInt(this.y2/38)+0.5,room,this,new Point(parseInt(game.human.x2/28),parseInt(game.human.y2/38))) );
        }
        var t = this.currentRoom.getTile( parseInt(this.x2/28), parseInt(this.y2/38));
        
        //console.log("-------");
        //console.log(t);

        //t.getImage = function() { return new Point(0,0) };

       // if(!t.feel)return;
        
        this.cooldown = 10;

        var rush = ( Math.random() < 0.07 );
        if(rush) this.walklength = 2;
        this.walklength-=0.1;
        if(this.walklength<0.75)this.walklength=0.75;
/*
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
        t.feel = t.feel*0.4; //TODO: make feel drop around
        var t3 = t.getNextToTile(DirType.LEFT);
        t3.feel = t3.feel*0.6;
        var t3 = t.getNextToTile(DirType.RIGHT);
        t3.feel = t3.feel*0.6;
        var t3 = t.getNextToTile(DirType.UP);
        t3.feel = t3.feel*0.6;
        var t3 = t.getNextToTile(DirType.DOWN);
        t3.feel = t3.feel*0.6;
    }

    r.pieceEvent = function(piece)
    {
        if(piece.isHuman && !this.hurt) { piece.getHit(60); return false; }
        if(piece instanceof Chest) { this.randomTurn(); return true;}
        if(piece instanceof StoneBlock) { this.randomTurn(); return true;}
        return false;
    }

    r.getImage = characterFactory.getImage;
    return r;
} 
