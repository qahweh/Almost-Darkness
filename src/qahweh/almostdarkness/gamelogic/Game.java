package qahweh.almostdarkness.gamelogic;

import qahweh.almostdarkness.gamelogic.piece.*;
import qahweh.almostdarkness.gamelogic.piece.controller.*;
import qahweh.almostdarkness.gamelogic.piece.component.*;
import qahweh.almostdarkness.gamelogic.world.*;

import java.awt.Point;
import java.util.Hashtable;
import java.util.ArrayList;
import java.util.Random;


public class Game implements PieceCallBack
{
    private GameCallBack cb;
    public int loop;
    public Hashtable<PieceI, Point> piecePositions;
    private ArrayList<PieceI> pieces;
    int k;
    private PieceI human;
    public World world;

    public Game()
    {
        piecePositions = new Hashtable<PieceI, Point>();
        pieces = new ArrayList<PieceI>();
        world = new World();
    }

    public void setCallBack(GameCallBack cb)
    {
        this.cb = cb;
    }

    public void start() throws Exception
    {
        int f = 0;
        human = PieceFactory.getHuman();
        pieces.add(human);
        piecePositions.put(human,new Point(8,9));

        human.setCallBack(this);
        Controller c = ControllerFactory.getSpinController();
        human.setController(
            new Controller()
                    {
                        public void update(){}
                        public boolean wantWalkWest()  { if(k==1){k=0; return true;} return false; }
                        public boolean wantWalkEast()  { if(k==2){k=0; return true;} return false; }
                        public boolean wantWalkNorth() { if(k==3){k=0; return true;} return false; }
                        public boolean wantWalkSouth() { if(k==4){k=0; return true;} return false; }
                    });
        human.add(
            new Eye()
            {
                @Override
                public void updateView()
                {
                    Random r = new Random();
                    Point p = piecePositions.get(human);
                    block = new boolean[world.width][world.height];
                    for(int x=0; x<world.width; x++)
                        for(int y=0; y<world.height; y++)
                        {
                            this.x = p.x;
                            this.y = p.y;
                            block[x][y] = world.isSolid(x,y);
                        }
                        super.updateView();
                }
            }
        );

        while(true)
        {
            Thread.sleep(1000);
            //update();
        }

    }

    private void update()
    {
        human.update();
        cb.refresh(this);
    }


    @Override
    public void walkWest(PieceI p)
    {
        Point pos = piecePositions.get(p);
        if(pos==null)pos = new Point(0,0);
        if(!world.isSolid(pos.x-1,pos.y))pos.translate(-1,0);
        piecePositions.put(p,pos);
    }

    @Override
    public void walkEast(PieceI p)
    {
        Point pos = piecePositions.get(p);
        if(pos==null)pos = new Point(0,0);
        if(!world.isSolid(pos.x+1,pos.y))pos.translate(1,0);
        piecePositions.put(p,pos);
    }

    @Override
    public void walkSouth(PieceI p)
    {
        Point pos = piecePositions.get(p);
        if(pos==null)pos = new Point(0,0);
        if(!world.isSolid(pos.x,pos.y-1))pos.translate(0,-1);
        piecePositions.put(p,pos);
    }

    @Override
    public void walkNorth(PieceI p)
    {
        Point pos = piecePositions.get(p);
        if(pos==null)pos = new Point(0,0);
        if(!world.isSolid(pos.x,pos.y+1))pos.translate(0,1);
        piecePositions.put(p,pos);
    }

    public void input(int c)
    {
        if(c==65) k=1;
        if(c==83) k=3;
        if(c==68) k=2;
        if(c==87) k=4;
        update();
    }

    public boolean canSee(int x,int y)
    {
        if(x>world.width)return false;
        if(y>world.height)return false;
        boolean[][] s = human.getSight();
        
        return s[x][y];
    }

}
