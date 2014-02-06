function Mixer()
{
    this.sound1 = new Audio("sfx/sound1.ogg");
    this.sound1b = new Audio("sfx/sound1.ogg");
    this.sound1c = new Audio("sfx/sound1.ogg");
    this.sound1d = new Audio("sfx/sound1.ogg");

    this.sound2 = new Audio("sfx/step3.ogg");
    this.sound2b = new Audio("sfx/step3.ogg");
    this.sound2c = new Audio("sfx/step3.ogg");
    this.sound2d = new Audio("sfx/step3.ogg");

    this.t = 0;
    this.t2 = 0;

    this.play = function(x)
    {
        if(x==1)
        {
            if(this.t==0)this.sound1.play();
            else if(this.t==1)this.sound1b.play();
            else if(this.t==2)this.sound1c.play();
            else if(this.t==3)this.sound1d.play();
            this.t++;
            if(this.t>3) this.t=0;
        }
        else if(x==2)
        {
            if(this.t2==0)this.sound2.play();
            else if(this.t2==1)this.sound2b.play();
            else if(this.t2==2)this.sound2c.play();
            else if(this.t2==3)this.sound2d.play();
            this.t2++;
            if(this.t2>3) this.t2=0;
        }
    }
}
