function HouseBuilder2(level)
{
    this.getStartRoom = function()
    {
        var room = new Room(RoomType.VOID,111,true);

        for(var x=10; x<23; x++)
        {
         for(var y=8; y<17; y++)
        {
            room.matris[x+y*room.width] = 0;
 }       }
 

        for(var i=10; i<24; i++)
        {
            room.matris[i+7*room.width] = 2;
             room.matris[i+16*room.width] = 2;
        }
        for(var i=7; i<16; i++)
        {
            room.matris[23+i*room.width] = 1;
            room.matris[10+i*room.width] = 1;
        }
  
        room.matris[350] = 1;
        room.matris[626] = 1;
        room.matris[339] = 1;
        room.matris[637] = 1;
        room.matris[430+40] = new Water();

        room.matris[430+39] = new Water();
        room.matris[430+36] = new Water();

        room.matris[350+37] = new Table(room,350+37);
        room.matris[350+36] = new Table(room,350+36);


        room.matris[470+40] = new Water();
        room.matris[471+40] = new Block();
        room.matris[472+40] = new Water();
        room.matris[512+40] = new Water();
        room.matris[430+35] = new Water();
        room.matris[470+35] = new Water();
        room.matris[471+35] = new Block();
        room.matris[472+35] = new Water();
        room.matris[512+35] = new Water();
        room.matris[473+35] = new Water();
        room.matris[474+35] = new Water(); 
        return room;
    }
};
