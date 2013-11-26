package qahweh.almostdarkness.gamelogic.piece.controller;

import qahweh.almostdarkness.gamelogic.piece.controller.pathfinder.PathFinder;

import java.awt.Point;

class Helper implements Controller
{

    private ControllerCallBack ccb;
    private PathFinderHandler pfh;

    public Helper(ControllerCallBack ccb)
    {
        this.ccb = ccb;
        pfh = new PathFinderHandler(ccb,'@');
    }

    @Override
    public void update()
    {
        pfh.update();
    }

    @Override
    public boolean wantWalkWest()
    {
        return pfh.isNextWest();
    }
    @Override
    public boolean wantWalkEast()
    {
        return pfh.isNextEast();
    }

    @Override
    public boolean wantWalkNorth()
    {
        return pfh.isNextNorth();
    }

    @Override
    public boolean wantWalkSouth()
    {
        return pfh.isNextSouth();
    }
}
