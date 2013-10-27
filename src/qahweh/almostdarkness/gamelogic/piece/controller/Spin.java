package qahweh.almostdarkness.gamelogic.piece.controller;

class Spin implements Controller
{
    private int t = 0;

    @Override
    public void update()
    {
                


        t++;
        if(t>7)t=0;
    }

    @Override
    public boolean wantWalkWest()
    {
        if(t==0 || t==1)return true;
        return false;
    }
    @Override
    public boolean wantWalkEast()
    {
        if(t==4 || t==5)return true;
        return false;
    }

    @Override
    public boolean wantWalkNorth()
    {
        if(t==2 || t==3)return true;
        return false;
    }

    @Override
    public boolean wantWalkSouth()
    {
        if(t==6 || t==7)return true;
        return false;
    }
}
