package qahweh.almostdarkness.gamelogic.piece.controller;

class Spin implements Controller
{
    private int t = 0;
    private ControllerCallBack ccb;
    private PathFinderHandler pfh;

    public Spin(ControllerCallBack ccb)
    {
        this.ccb = ccb;
        pfh = new PathFinderHandler(ccb,'@');   
    }

    @Override
    public void update()
    {
        if(!pfh.cannotFindGoto())t=-3;  
        pfh.update();

        t++;
        if(t>7)t=0;
    }

    @Override
    public boolean wantWalkWest()
    {
        if(t==0 || t==1)return true;
        return pfh.isNextWest();
    }
    @Override
    public boolean wantWalkEast()
    {
        if(t==4 || t==5)return true;
        return pfh.isNextEast();
    }

    @Override
    public boolean wantWalkNorth()
    {
        if(t==2 || t==3)return true;
        return pfh.isNextNorth();
    }

    @Override
    public boolean wantWalkSouth()
    {
        if(t==6 || t==7)return true;
        return pfh.isNextSouth();
    }
}
