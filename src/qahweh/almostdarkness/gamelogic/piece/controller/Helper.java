package qahweh.almostdarkness.gamelogic.piece.controller;

import qahweh.almostdarkness.gamelogic.piece.controller.pathfinder.PathFinder;

import java.awt.Point;

class Helper implements Controller
{
    private PathFinder pf;
    private int x;
    private int y;
    private int ox;
    private int oy;
    private ControllerCallBack ccb;

    public Helper(ControllerCallBack ccb)
    {
        this.ccb = ccb;
        calcPf();
    }

    private void calcPf()
    {
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
                if(matris[x][y]=='@')return new Point(x,y);
            }
        }
        System.out.println("n");
        return null;

    }

    @Override
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
                System.out.println("a2");
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
                System.out.println("a3");
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
        System.out.println(oy+","+y);
        return (y > oy);
    }

    @Override
    public boolean wantWalkSouth()
    {
        System.out.println(oy+","+y);
        return (y < oy);
    }
}
