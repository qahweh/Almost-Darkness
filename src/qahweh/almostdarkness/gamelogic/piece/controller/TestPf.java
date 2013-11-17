package qahweh.almostdarkness.gamelogic.piece.controller;

import qahweh.almostdarkness.gamelogic.piece.controller.pathfinder.PathFinder;

import java.awt.Point;

class TestPf implements Controller
{
    private PathFinder pf;
    private int x;
    private int y;
    private int ox;
    private int oy;

    public TestPf(char[][] matris, int x, int y)
    {
        this.x = x;
        this.y = y;

        try
        {
            pf = new PathFinder(x,y,3,3,matris);
        }
        catch(Exception e)
        {
            e.printStackTrace();
        }
    }

    @Override
    public void update()
    {
        ox = x;
        oy = y;
        Point p = pf.getPoint();
        if(p!=null)
        {
            x = p.x;
            y = p.y;
        }
    }

    @Override
    public boolean wantWalkWest()
    {
        return (x < ox);
    }
    @Override
    public boolean wantWalkEast()
    {
        return (x > ox);
    }

    @Override
    public boolean wantWalkNorth()
    {
        return (y > oy);
    }

    @Override
    public boolean wantWalkSouth()
    {
        return (y < oy);
    }
}
