function CharacterFactory()
{
    this.update2 = function()
    {
        if(this.hurt)
        {
            this.hurtUpdate();
            return;
        }

        if(this.canBeFreezed)
        {
			if(this.freeze>0)
			{
				this.freeze--;
				if(this.freeze>100)
				{
				    this.animation = new Animation(5);
				}
				else this.animation = ( parseInt(this.freeze/7)%2==0 ? new Animation(5) : this.normalanimation);
				return;
		    }
			else this.animation = this.normalanimation;
	    }
       if(this.startrunningCooldown>0){ this.startrunningCooldown--; } else this.steplength = this.walklength;

        var k = -1;
        var j=0;
        if(this.action[68]==true) { k=0; j++; }
        if(this.action[65]==true) { k=1; j++; }
        if(this.action[87]==true) { k=2; j++; }
        if(this.action[83]==true) { k=3; j++; }
        if(k>-1 && j==1)this.walkDir = k;
        else this.walkDir = -1;

        this.moved = 0;
        var odir = this.dir;
        if(this.action[68] == true && this.action[65] == false)
        {
            if(this.startrunningCooldown>0 && this.startrunningCooldown<14) this.steplength=this.runlength;
            if(this.jump==0)this.moveRight(this.steplength); this.startrunningCooldown = 15; this.moved++; this.dir = 0;
            this.lastXdir=1;
        }
        if(this.action[68] == false && this.action[65] == true)
        {
            if(this.startrunningCooldown>0 && this.startrunningCooldown<14) this.steplength=this.runlength;
            if(this.jump==0)this.moveLeft(this.steplength); this.startrunningCooldown = 15; this.moved++; this.dir = 1;
            this.lastXdir=-1;
        }
        if(this.action[87] == true && this.action[83] == false)
        {
            if(this.startrunningCooldown>0 && this.startrunningCooldown<14) this.steplength=this.runlength;
            if(this.jump==0)this.moveUp(this.steplength); this.startrunningCooldown = 15; this.moved++; this.dir = 2;
            this.lastYdir=-1;
        }
        if(this.action[87] == false && this.action[83] == true)
        {
            if(this.startrunningCooldown>0 && this.startrunningCooldown<14) this.steplength=this.runlength;
            if(this.jump==0) this.moveDown(this.steplength); this.startrunningCooldown = 15; this.moved++; this.dir = 3;
            this.lastYdir=1;
        }
        if(this.dir != odir)this.startrunningCooldown=0; //force cooldown down to make player walk

               if(this.moved>1){ this.dir = odir; this.startrunningCooldown=0;} //if diagonal then do not change dir. and force cooldown down to make player walk
       // if(this.moved==0)this.anim=23;

        if( !(this.forceToCenter(false) || this.moved>0))
        {
            this.anim=23;
        }
        else
        {
            this.anim += this.steplength; if(this.anim%26==13){mixer.play(2);}
           //this.anim=0;
        }
        this.updateLight(10);

        if(this.health<=0)
        {
			this.hurt = true;  
			if(!this.currentRoom.hasEnemy()) this.currentRoom.unForceCloseAllDoors();
		}
    }

    this.forceToCenter = function(close)
    {

        if(this.jump>0)return false;
        var t = false;
        if(this.action[68]==false && this.action[65]==false)
        {
            var x = parseInt(this.x2/28)*28+14;
            if(x-this.x2!=0)
            {
                if(!close)
                {
                    if(this.lastXdir==1) this.moveRight(1,true);
                    else if(this.lastXdir==-1) this.moveLeft(1,true);
         //           this.anim += this.steplength; if(this.anim%26==13){mixer.play(2);}
                    t= true;
                }
                else
                {
                    if(this.x2>x) this.moveLeft(1,true);
                    if(this.x2<x) this.moveRight(1,true); 
                }

                /*
                if(this.dir==0) this.moveRight(1,true);
                else if(this.dir==1) this.moveLeft(1,true);
                else
                {
                    if(this.x2>x) this.moveLeft(1,true);
                    if(this.x2<x) this.moveRight(1,true);
                }
                */
            }
        }

        if(this.action[87]==false && this.action[83]==false)
        {
            var y = parseInt(this.y2/38)*38+19;
            if(y-this.y2!=0)
            {
                if(!close)
                {
                    if(this.lastYdir==-1) this.moveUp(1,true);
                    else if(this.lastYdir==1) this.moveDown(1,true);
           //         this.anim += this.steplength; if(this.anim%26==13){mixer.play(2);}
                    t= true;
                }
                else
                {
                    if(this.y2>y) this.moveUp(1,true);
                    if(this.y2<y) this.moveDown(1,true); 
                }
                /*
                if(this.dir==2) this.moveUp(1,true);
                else if(this.dir==3) this.moveDown(1,true);
                else
                {
                    if(this.y2>y) this.moveUp(1,true);
                    if(this.y2<y) this.moveDown(1,true);
                }
                */
                
            }
            return t;
       }
    }
    this.hurtUpdate = function()
    {
        this.hasGun = false;
        this.action[83]=false;
        this.action[87]=false;
        this.action[65]=false;
        this.action[68]=false;
        this.offsetImg = new Point(14,19);
        this.forceToCenter(true);
    }

    this.getImage = function()
    {
    //    return this.animation.images[0];
        var x = 1;
        var y = 5;
        var p = new Point(0,0);

      //  return this.animation.images[this.anim];

        if(this.dir==1)p = this.animation.images[9];
        if(this.dir==0)p = this.animation.images[0];
       
        if(this.anim%28<13)
        {
            if(this.dir==1)p = this.animation.images[2];
            if(this.dir==0)p = this.animation.images[1];
        }

        if(this.dir==3)
        {
            p = this.animation.images[3];
            if(this.anim%56<42){p = this.animation.images[7];}
            if(this.anim%56<28){p = this.animation.images[3];}
            if(this.anim%56<14){p = this.animation.images[8];}

        }
        if(this.dir==2)
        {
            p = this.animation.images[10];
            if(this.anim%56<42){p = this.animation.images[5];}
            if(this.anim%56<28){p = this.animation.images[10];}
            if(this.anim%56<14){p = this.animation.images[6];}

        }

        if(this.hurt) return this.animation.images[4];
        if(!this.hurtAnimation)return p;

        var r = new Point(p.x,p.y);
        r.o = new Point(2,4);
        return r;
    }


}
