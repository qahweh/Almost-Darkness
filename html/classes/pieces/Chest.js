function Chest(x,y,room)
{
    this.currentRoom = room;
    this.x2 = x*28;
    this.y2 = y*38;
    this.offsetImg = new Point(0,0);
    this.open = false;
    this.health = 4;
    this.getImage = function() { if(this.open) return new Point(10,7);  return new Point(9,7); }
    this.update = function() { if(this.health<=0)this.currentRoom = null } 



    this.openFunction = function()
    {
        if(this.open)return;
        this.open = true;

        var g = parseInt(Math.random()*100);
        game.human.pickupEffect = 20;
        g = 2;
        if(g<5)
        {
			game.human.pickupImg = new Point(10,6);
			game.human.magicFreeze = true;
			return;
		}
        if(g<10)
        {
			game.human.pickupImg = new Point(11,6);
			return;
		}
        if(g<15)
        {
            game.human.pickupImg = new Point(6,1);
            return;
        }
        if(g<18)
        {
            game.human.pickupImg = new Point(9,4);
            return;
        }
        if(g<24)
        {
            game.human.pickupImg = new Point(10,4);
            return;
        }
        if(g<80)
        {
            game.human.pickupImg = new Point(2,1);
            game.ammo += 12;
            return;
        }
        game.human.pickupEffect = 0;
    }
} 
