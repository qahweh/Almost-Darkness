function Human(x,y,room) //should be called Piece or Character to be a common class
{
    this.x = x;
    this.y = y;
    this.currentRoom = room;
    this.imgx = 0;
    this.imgy = 0;
    this.hurtAnimation = false;
    this.health = 4;
    this.x2 = x*28+14;
    this.y2 = y*38+19;
    this.anim = 0;
    this.action = new Array();
    this.dir = 0;
    this.action[65] = false;
    this.action[68] = false;
    this.action[87] = false;
    this.action[83] = false;
    this.action[74] = false;
    this.offsetImg = new Point(14,35);
    this.startrunningCooldown = 0;
    this.steplength = 1;
    this.walklength = 1;
    this.runlength = 1; //start as 1. when get shoes then 2
    this.hasKey = false;
    this.animation = new Animation(3);
    this.height = 50;
    this.forceToCenter = characterFactory.forceToCenter;
    this.hurtUpdate = characterFactory.hurtUpdate;
    this.jump = 0;
    this.inWater=0; 
    this.respawnPos = false;
    this.blinkTime=0;
    this.strafeDir = -1;
    this.walkDir = -1;
    this.shootCooldown = 0;
    this.pickupEffect = 0;
    this.pickupImg = new Point(0,0);
    this.whipframe = 0;
    this.currentWeapon = 0;
    this.freeze = 0;
    this.magicFreeze = false;
    this.magicPoison = false;
    this.tall = 30;
    this.getTall = function(){ return 30;}
    this.getHeight = function()
    {
        if(this.jump>0) return ( this.height<0.8 ? 0 : parseInt(this.height));
        return 0;
    }

    this.dropFeel = function()
    {
        this.currentRoom.resetFeel();
        var y = parseInt((this.y2)/38);
        var x = parseInt(((this.x2)/28)); 
        var t = this.currentRoom.getTile(x,y);
        if(typeof t.feel != 'undefined') t.feel = 1000000;
        game.nextFeel = new Array();
        game.nextFeel.push(t);
    }


    this.update2 = function()
    {
        if(this.blinkTime>0) this.blinkTime--;
        if(this.pickupEffect>0) this.pickupEffect--;
        if(this.shootCooldown>0) this.shootCooldown--;
        if(this.whipframe>0) this.whipframe--;
        if(this.whipframe==1)
        {
			var wdx = 0;
			var wdy = 0;
			if(this.dir==0)var wdx = 20;
			if(this.dir==1)var wdx = -20;
			if(this.dir==2)var wdy = 20;
			if(this.dir==3)var wdy = -20;
			 
			var p = this.currentRoom.getPiece2( this.x2, this.y2+0, this );
			console.log(p);
			if(p!=null && p.getHit)
			{
				p.getHit();
				if(this.magicFreeze) p.freeze = 200; 
			}
		}


        if(this.hasGun && game.ammo>0)
        {
			this.currentWeapon = 2;
		}
		else this.currentWeapon = 1;

        if(this.action[76]==true && this.jump==0)
        {
            this.respawnPos = new Point(this.x2,this.y2);
            this.jump = 58; this.jumpdir=-1; 
            if(this.walkDir==1)this.jumpdir=DirType.LEFT; if(this.walkDir==0)this.jumpdir=DirType.RIGHT; 
            if(this.walkDir==2)this.jumpdir=DirType.UP;   if(this.walkDir==3) this.jumpdir=DirType.DOWN;
        }

        if(this.inWater>0)
        {
            this.inWater++;
            if(this.inWater>50) {this.inWater=0; this.x2 = this.respawnPos.x; this.y2 = this.respawnPos.y; this.health--;};
        }

        if(this.jump>0)
        {
            var k = -1;
            if(this.jumpdir==DirType.LEFT) this.moveLeft(1);
            if(this.jumpdir==DirType.RIGHT) this.moveRight(1);
            if(this.jumpdir==DirType.UP) this.moveUp(1);
            if(this.jumpdir==DirType.DOWN) this.moveDown(1);
            this.jump--;
        }

        this.height = Math.sin(this.jump/16)*20;

        if(this.action[75])
        {
           if(this.strafeDir==-1) this.strafeDir = this.dir;
           // this.currentAim = this.nextAim();
          //  this.action[75] = false;
        }
        else this.strafeDir = -1;
        this.u = characterFactory.update2;
        this.u();

        var t = this.currentRoom.getTile( parseInt(  ((this.x2)/28)) ,parseInt((this.y2)/38) );
        if(t.isWater && this.jump==0 && this.inWater==0) this.inWater = 1;

        //var a = this.getAimed();
        //if(a) this.dir = common.getDirByPoints( new Point(this.x2,this.y2), new Point(a.x2,a.y2));
        if(this.strafeDir!=-1)this.dir = this.strafeDir;

    }

    this.getAimed = function()
    {
        if(this.currentAim && !this.currentAim.hurt) return this.currentAim;
        if(this.currentAim && this.currentAim.hurt) this.currentAim = this.nextAim(true);
        return this.currentAim;
    }

    this.nextAim = function(loop)
    {
        for(index = 0; index < game.pieces.length; index++)
        {
            var p = game.pieces[index];
            if(p.currentRoom == game.human.currentRoom && !p.hurt && p.isFishman)
            {
                if(!this.currentAim) return p;
                if(this.currentAim==p) this.currentAim = false;
            }
        }
        if(loop){ this.currentAim = false; return this.nextAim(false); }
        return false; 
    }

    this.updateLight = function(effect)
    {
		var starty = ( this.jump>0 || this.pickupEffect>0 ? -1 : -2);
        var p = parseInt(Math.random()*7);
        for(var x=-1; x<2; x++)
        {
            for(var y=-2; y<2; y++)
            {
				var b = 1;
				if(y!=-2)
				{
                var r = Math.abs(x)+Math.abs(y);
                b = 8*effect;
                if(r==1)b = 4*effect;
                if(r==2)b = 1*effect;
			     }
			     

                var t = this.currentRoom.getTile( parseInt(  ((this.x2)/28)+x) ,parseInt((this.y2)/38)+y );
                if(t instanceof Object)
                {
                    t.brightness += b+p;
                }
            }
        }
    }

    this.releaseAction = function(c)
    {
        this.action[c]=false;
    }

    this.doAction = function(c)
    {
        this.action[c]=true;
        if(c==74)
        {
            if(this.currentWeapon==1)
            {
				this.whipframe = 30;
				return;
			}
			else if(this.currentWeapon==2)
			{
				if(game.ammo>0 && !this.hurt) this.shoot();
			}
	    }
    }

    this.getTilePos = function()
    {
        var c = parseInt(this.x2/28)+( parseInt(this.y2/38)*this.currentRoom.width);
        return c;
    }

    this.canWalkOn = function(t)
    {
        if(t instanceof Object)
        {
            return t.canWalkOn;
        }
        return (t==0 || t==4 || t==5 || t==14 || t==15 || t==24 || t==25);
    }

    this.move = function(dx,dy,force)
    {

        var dx2 = 0;
        var dy2 = 0;
        if(dx<0) dx2=-14;
        if(dx>0) dx2=14;
        if(dy<0) dy2=-19;
        if(dy>0) dy2=19;




        if(this.hurt && !force)return;
        var t = this.currentRoom.getTile( parseInt(  ((this.x2+dx)/28)) ,parseInt((this.y2+dy)/38) );
        var p = this.currentRoom.getPiece2( this.x2+dx, this.y2+dy, this,false,this.getHeight(),this.getTall() );
        var t = this.currentRoom.getTile(  parseInt((this.x2+dx2)/28) ,parseInt((this.y2+dy2)/38)  );

        var b = false;
        if(p != null) b = this.pieceEvent(p);

        if(!b && (this.canWalkOn(t) || this.jump>0)  )
        {
            var t2 = this.currentRoom.getTile( parseInt(  ((this.x2)/28)) ,parseInt((this.y2)/38) );
            var dropFeel = false;
            if(t2!=t && !this.isFishman) dropFeel = true; 
            this.x2 += dx; this.y2 += dy;
            if(dropFeel)this.dropFeel();
            return;
        }

        if(this.collideTileEvent && t!=null) this.collideTileEvent(t);

        if(t instanceof Door && this == game.human)
        {
            var door = t;
            var room = door.openDoor(game.human);
            if(room!==false)
            {
                gamecanvasC.clearRect(0,0,1120,722);
                game.forceDrawAll = true;
                game.doors = game.doors + door.counter;
                door.counter =  0;  
                game.camera = room.getCameraOnCenter();
                game.human.x2 = door.startx*28+14;
                game.human.y2 = door.starty*38+30;
                game.human.currentRoom = room;
                drawRoom(true);
                game.reh.handleRoom(room, function(x,y){ return (  (Math.abs(x-parseInt(game.human.x2/28)) + Math.abs(y-parseInt(game.human.y2/38)))<4   ||    room.nextToDoor(x,y)  ) });
            }
        }
    }

    this.moveLeft = function(d,force){ this.move(-d,0,force);}
    this.moveRight = function(d,force){ this.move(d,0,force);}
    this.moveUp = function(d,force){ this.move(0,-d,force);}
    this.moveDown = function(d,force){ this.move(0,d,force);}

    this.getImage = function()
    {
        var x = 1;
        var y = 5;
        if(this.anim%28<13)x=0;
        if(this.dir==0)x=x;
        if(this.dir==1){  if(x==0)x=3; if(x==1)x=2; }
        if(this.dir==3)
        {
            x=0; y=0;
            if(this.anim%56<42){y=6; x=3;}
            if(this.anim%56<28){y=0; x=0;}
            if(this.anim%56<14){y=6; x=2;}

        }
        if(this.dir==2)
        {
            x=4;
            if(this.anim%56<42){y=6; x=0;}
            if(this.anim%56<28){y=5; x=4;}
            if(this.anim%56<14){y=6; x=1;}

        }

        if(this.hurt) return new Point(0,4);
        if(!this.hurtAnimation)return new Point(x,y);

        var r = new Point(0,0);
        r.o = new Point(2,4);
        return r;
    }

    this.getImage = function()
    {
        this.u = characterFactory.getImage;
        if( parseInt(this.blinkTime/4)%2==1)return false;
        if(this.inWater && this.jump==0)return new Point(9,8);

        var f = this.u();
        
        if(this.currentWeapon==1)
        {
			
        if(this.whipframe>0)
        {
			this.animation = new Animation(2);
			var h = parseInt((29-this.whipframe)/10);
			
			if(this.dir==0)
			{
			    if(h%3==0)
			    {
			    f.o = new Point(11,7);
                f.of = new Point(-8,0);
		        }
			    if(h%3==1)
			    {
			    f.o = new Point(11,8);
                f.of = new Point(-2,0);
                }
			    if(h%3==2)
			    {
			    f.o = new Point(11,9);
                f.of = new Point(18,6);
                }
		    }
		    else if(this.dir==1)
		    {
			    if(h%3==0)
			    {
			    f.o = new Point(11,10);
                f.of = new Point(8,0);
		        }
			    if(h%3==1)
			    {
			    f.o = new Point(11,11);
                f.of = new Point(2,0);
                }
			    if(h%3==2)
			    {
			    f.o = new Point(11,12);
                f.of = new Point(-18,6);
                }
			}
		    else if(this.dir==2)
		    {
			    if(h%3==0)
			    {
			    f.o = new Point(11,7);
                f.of = new Point(-8,0);
		        }
			    if(h%3==1)
			    {
			    f.o = new Point(11,8);
                f.of = new Point(-2,0);
                }
			    if(h%3==2)
			    {
			    f.o = new Point(11,9);
                f.of = new Point(18,6);
                }
			}
		    else if(this.dir==3)
		    {
			    if(h%3==0)
			    {
			    f.o = new Point(11,7);
                f.of = new Point(-8,0);
		        }
			    if(h%3==1)
			    {
			    f.o = new Point(11,8);
                f.of = new Point(-2,0);
                }
			    if(h%3==2)
			    {
			    f.o = new Point(11,9);
                f.of = new Point(18,6);
                }
			}
		}
		else
		{
			this.animation = new Animation(3);
			f.o=false;
		}
		
		}
        
        if(this.currentWeapon==2)
        {
			this.animation = new Animation(2); //code should goes faster if not re-create this object all the time. TODO. THat gpes for every new Animation i getImage
            if(this.dir==0)
            {
                f.o = new Point(0,9);
                f.of = new Point(2,0);
            }
            if(this.dir==1)
            {
                f.o = new Point(4,9);
                f.of = new Point(-2,0);
            }
            if(this.dir==2){}
            if(this.dir==3)
            {
                f.o = new Point(5,9);
                f.of = new Point(-2,6);
            }
        }

        if(this.pickupEffect>0)
        {
            f.o2 = this.pickupImg;
            f.o2f = new Point(0,-35-Math.sin(this.pickupEffect/5)*6);       
        }
        else
        {
            f.o2 = null;
            f.o2f = null;
        }

        return f;
    }

this.getHit = function(setBlinkTime)
{
    if(this.blinkTime>0) return;
    this.hurtAnimation = true;
    this.health--;
    this.blinkTime = setBlinkTime; 
}

this.update = function()
{
    this.hurtAnimation = false;
}

this.shoot = function()
{
    if(!this.hasGun)return;
    if(this.shootCooldown>0)return;
    this.shootCooldown=8;
    game.ammo--;
    mixer.play(1);
    game.pieces.push( new Bullet(this.x2,this.y2,this.currentRoom, this) );
}

};



Human.prototype.pieceEvent = function(piece)
{
    if(piece instanceof Ammobox){this.pickupEffect = 20; this.pickupImg = new Point(2,1); piece.currentRoom = null; game.ammo=game.ammo+3; return false;} //todo: remove from piece list. fishman should not pickup ammobox.
    if(piece instanceof Key){piece.currentRoom = null; game.human.hasKey=true; return false;} //todo: remove from piece list. fishman should not pickup ammobox.
    if(piece instanceof RunningShoes){piece.currentRoom = null; game.human.runlength=2; return false;} //todo: remove from piece list. fishman should not pickup ammobox.
    if(piece instanceof Health){this.pickupEffect = 20; this.pickupImg = new Point(6,0); piece.currentRoom = null; game.human.health++; return false;} //todo: remove from piece list. fishman should not pickup ammobox.
    if(piece instanceof Gun){ piece.currentRoom = null; game.human.hasGun = true; }
    if(piece instanceof Chest) { if(this.dir == 2 && piece.open == false) { piece.openFunction(); } return true; }
    if(piece instanceof StoneBlock)return true;
    return false;
}


