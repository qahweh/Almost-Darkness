package qahweh.almostdarkness.gamelogic.piece.controller;

import java.awt.Point;
import qahweh.almostdarkness.gamelogic.piece.controller.pathfinder.PathFinder;
class PathFinderHandler
{
    private int x;
    private int y;
    private int ox;
    private int oy;
    private PathFinder pf;
    private ControllerCallBack ccb;
    private char c;

    public PathFinderHandler(ControllerCallBack ccb, char c)
    {
        this.ccb = ccb;
        this.c = c;
        calcPf();
    }


    public boolean cannotFindGoto()
    {
        return ( findWhereToGo(ccb.getMatris(10,10))==null );
    }

    private void calcPf()
    {
        ox = 10;
        oy = 10;
        x=10;
        y=10;


        char[][] matris = ccb.getMatris(10,10);
        Point p = findWhereToGo(matris);
        if(p==null){oy = 10; x = 10; return;}
        if(p.x==x && p.y==y){ox = 10; x = 10; return;}

        if(p!=null)
        {
            try
            {
                pf = new PathFinder(10,10,p.x,p.y,matris);
                ox = 10;
                oy = 10;

            }
            catch(Exception e)
            {
                e.printStackTrace();
            }
        }
    }

    private Point findWhereToGo(char[][] matris)
    {
        int width = matris.length;
        int height = matris[0].length;

        for(int x=0; x<width; x++)
        {
            for(int y=0; y<height; y++)
            {
                if(matris[x][y]==c)
                {
                    return new Point(x,y);
                }
            }
        }
        return null;

    }

    public void update()
    {
       // if(true)return;
        if(pf!=null)
        {
            Point p = pf.getPoint();
            if(p!=null)
            {
                ox = x;
                oy = y;
                x = p.x;
                y = p.y;
            }
            else
            {
                calcPf();
                if(true)return;
                p = pf.getPoint();
                if(p==null)return;
                //TODO: when recalc make next walk at once. do not stop.
                x = p.x;
                y = p.y;
                ox = x;
                oy = y;
            }
        }
        else
        {
            calcPf();
            if(true)return;
            Point p = pf.getPoint();
            if(p==null)return;
            //TODO: when recalc make next walk at once. do not stop.
            x = p.x;
            y = p.y;
            ox = x;
            oy = y;
        }
    }

    public boolean isNextWest()
    {
        return (x < ox);
    }

    public boolean isNextEast()
    {
        return (x > ox);
    }


    public boolean isNextSouth()
    {
        return (y > oy);
    }


    public boolean isNextNorth()
    {
        return (y < oy);
    }
}
