function Mixer()
{
    this.sound1 = new Audio("sfx/sound1.ogg");
    this.sound1b = new Audio("sfx/sound1.ogg");
    this.sound1c = new Audio("sfx/sound1.ogg");
    this.sound1d = new Audio("sfx/sound1.ogg");
    this.t = 0;

    this.play = function()
    {
        if(this.t==0)this.sound1.play();
        else if(this.t==1)this.sound1b.play();
        else if(this.t==2)this.sound1c.play();
        else if(this.t==3)this.sound1d.play();
        this.t++;
        if(this.t>3) this.t=0;
    }
}
