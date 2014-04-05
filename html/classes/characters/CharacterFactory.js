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


}
