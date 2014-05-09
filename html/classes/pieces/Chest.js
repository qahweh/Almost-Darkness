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
    this.tall=20;
    this.getHeight = function(){ return 0;}
    this.getTall = function(){ return 20;}

    this.openFunction = function()
    {
        if(this.open)return;
        this.open = true;

        var g = parseInt(Math.random()*100);
        game.human.pickupEffect = 20;
		if(g==0) this.getItem(0);
		else if(g==1) this.getItem(0);
		else if(g==2) this.getItem(0);
		else if(g==3) this.getItem(0);
		else if(g==4) this.getItem(0);
		else if(g==5) this.getItem(0);
		else if(g==6) this.getItem(0);
		else if(g==7) this.getItem(0);
		else if(g==8) this.getItem(0);
		else if(g==9) this.getItem(0);
		else if(g==10) this.getItem(0);
		else if(g==11) this.getItem(0);
		else if(g==12) this.getItem(0);
		else if(g==13) this.getItem(0);
		else if(g==14) this.getItem(0);
		else if(g==15) this.getItem(0);
		else if(g==16) this.getItem(1);
		else if(g==17) this.getItem(2);
		else if(g==18) this.getItem(3);
		else if(g==19) this.getItem(3);
		else if(g==20) this.getItem(3);
		else if(g==21) this.getItem(3);
		else if(g==22) this.getItem(3);
		else if(g==23) this.getItem(3);
		else if(g==24) this.getItem(3);
		else if(g==25) this.getItem(4);
		else if(g==26) this.getItem(4);
		else if(g==27) this.getItem(4);
		else if(g==28) this.getItem(4);
		else if(g==29) this.getItem(4);
		else if(g==30) this.getItem(4);
		else if(g==31) this.getItem(4);
		else if(g==32) this.getItem(5);
		else if(g==33) this.getItem(5);
		else if(g==34) this.getItem(5);
		else if(g==35) this.getItem(5);
		else if(g==36) this.getItem(5);
		else if(g==37) this.getItem(5);
		else if(g==38) this.getItem(5);
		else if(g==39) this.getItem(6);
		else if(g==40) this.getItem(6);
		else if(g==41) this.getItem(6);
		else if(g==42) this.getItem(6);
		else if(g==43) this.getItem(6);
		else if(g==44) this.getItem(6);
		else if(g==45) this.getItem(6);
		else if(g==46) this.getItem(6);
		else if(g==47) this.getItem(6);
		else if(g==48) this.getItem(6);
		else if(g==49) this.getItem(6);
		else if(g==50) this.getItem(6);
		else if(g==51) this.getItem(6);
		else if(g==52) this.getItem(6);
		else if(g==53) this.getItem(6);
		else if(g==54) this.getItem(6);
		else if(g==55) this.getItem(6);
		else if(g==56) this.getItem(6);
		else if(g==57) this.getItem(6);
		else if(g==58) this.getItem(6);
		else if(g==59) this.getItem(6);
		else if(g==60) this.getItem(6);
		else if(g==61) this.getItem(6);
		else if(g==62) this.getItem(6);
		else if(g==63) this.getItem(6);
		else if(g==64) this.getItem(6);
		else if(g==65) this.getItem(6);
		else if(g==66) this.getItem(6);
		else if(g==67) this.getItem(6);
		else if(g==68) this.getItem(6);
		else if(g==69) this.getItem(6);
		else if(g==70) this.getItem(6);
		else if(g==71) this.getItem(6);
		else if(g==72) this.getItem(6);
		else if(g==73) this.getItem(6);
		else if(g==74) this.getItem(6);
		else if(g==75) this.getItem(6);
		else if(g==76) this.getItem(6);
		else if(g==77) this.getItem(6);
		else if(g==78) this.getItem(6);
		else if(g==79) this.getItem(6);
		else if(g==80) this.getItem(6);
		else if(g==81) this.getItem(6);
		else if(g==82) this.getItem(6);
		else if(g==83) this.getItem(6);
		else if(g==84) this.getItem(6);
		else if(g==85) this.getItem(6);
		else if(g==86) this.getItem(6);
		else if(g==87) this.getItem(6);
		else if(g==88) this.getItem(6);
		else if(g==89) this.getItem(6);
		else if(g==90) this.getItem(6);
		else if(g==91) this.getItem(6);
		else if(g==92) this.getItem(6);
		else if(g==93) this.getItem(6);
		else if(g==94) this.getItem(6);
		else if(g==95) this.getItem(6);
		else if(g==96) this.getItem(6);
		else if(g==97) this.getItem(6);
		else if(g==98) this.getItem(6);
		else if(g==99) this.getItem(6);
    }
    
    this.getItem = function(i)
    {
		if(i==0)
		{
			game.human.pickupEffect = 0;
            return;
		}
		if(i==1)
		{
			game.human.pickupImg = new Point(10,6);
			game.human.magicFreeze = true;
			return;			
		}
		if(i==2)
		{
			game.human.pickupImg = new Point(11,6);
			game.human.magicPoison = true;
			return;
		}
		if(i==3)
		{
            game.human.pickupImg = new Point(6,1);
            game.human.inventory.push(new Key(0,0,null,1));
            return;
		}
		if(i==4)
		{
            game.human.pickupImg = new Point(9,4);
            game.human.inventory.push(new Key(0,0,null,2));
            return;
		}
		if(i==5)
		{
            game.human.pickupImg = new Point(10,4);
            game.human.inventory.push(new Key(0,0,null,3));
            return;
		}
        if(i==6)
        {
            game.human.pickupImg = new Point(2,1);
            game.ammo += 12;
            return;
        }
        throw "not set value "+i;
	}
} 
