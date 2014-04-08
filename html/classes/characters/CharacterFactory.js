function CharacterFactory()
{
    this.update2 = function()
    {
        if(this.startrunningCooldown>0){ this.startrunningCooldown--; } else this.steplength = this.walklength;

        this.moved = 0;
        var odir = this.dir;
        if(this.action[68] == true && this.action[65] == false) { if(this.startrunningCooldown>0 && this.startrunningCooldown<14)this.steplength=this.runlength; this.moveRight(this.steplength); this.startrunningCooldown = 15; this.moved++; this.dir = 0;}
        if(this.action[68] == false && this.action[65] == true) { if(this.startrunningCooldown>0 && this.startrunningCooldown<14)this.steplength=this.runlength; this.moveLeft(this.steplength); this.startrunningCooldown = 15; this.moved++; this.dir = 1;}
        if(this.action[87] == true && this.action[83] == false) { if(this.startrunningCooldown>0 && this.startrunningCooldown<14)this.steplength=this.runlength; this.moveUp(this.steplength); this.startrunningCooldown = 15; this.moved++; this.dir = 2;}
        if(this.action[87] == false && this.action[83] == true) { if(this.startrunningCooldown>0 && this.startrunningCooldown<14)this.steplength=this.runlength; this.moveDown(this.steplength); this.startrunningCooldown = 15; this.moved++; this.dir = 3;}

        if(this.dir != odir)this.startrunningCooldown=0; //force cooldown down to make player walk

        if(this.moved>0){this.anim += this.steplength; if(this.anim%26==13){mixer.play(2);}}
        if(this.moved>1){ this.dir = odir; this.startrunningCooldown=0;} //if diagonal then do not change dir. and force cooldown down to make player walk
        if(this.moved==0)this.anim=23;

        this.updateLight(10);
    }

    this.getImage = function()
    {
    //    return this.animation.images[0];
        var x = 1;
        var y = 5;
        var p = new Point(0,0);

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
