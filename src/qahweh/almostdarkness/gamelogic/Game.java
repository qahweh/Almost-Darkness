package qahweh.almostdarkness.gamelogic;

import qahweh.almostdarkness.gamelogic.piece.*;
import qahweh.almostdarkness.gamelogic.piece.controller.*;
import qahweh.almostdarkness.gamelogic.piece.component.*;
import qahweh.almostdarkness.gamelogic.world.*;

import java.awt.Point;
import java.util.Hashtable;
import java.util.ArrayList;
import java.util.Random;
import java.io.InputStreamReader;
import java.io.BufferedReader;

public class Game implements PieceCallBack
{
    private GameCallBack cb;
    public int loop;
    public Hashtable<PieceI, Point> piecePositions;
    public Hashtable<PieceI, Character> pieceCharacters;
    private ArrayList<PieceI> pieces;
    int k;
    private PieceI human;
    public World world;
    public int cameraX;
    public int cameraY;

    public Game()
    {
        piecePositions = new Hashtable<PieceI, Point>();
        pieceCharacters = new Hashtable<PieceI, Character>();
        pieces = new ArrayList<PieceI>();


        PieceI d = PieceFactory.createDog();
        pieces.add( d );
        piecePositions.put(d,new Point(20,19));
        pieceCharacters.put(d,new Character('d'));


        Random r = new Random();
        for(int i=0; i<100; i++)
        {
            PieceI f = PieceFactory.createFishman();
            pieces.add( f );

            int x = r.nextInt(130)+10;
            int y = r.nextInt(130)+10;

            piecePositions.put(f,new Point(x,y));
            pieceCharacters.put(f,new Character('F'));
        Controller cc = ControllerFactory.getSpinController();
        f.setController(cc);
            f.setCallBack(this);
        }
        world = new World();

        Controller c = ControllerFactory.getTestPfController(world.matris,20,19);
        d.setController(c);
        d.setCallBack(this);

    }

    public void setCallBack(GameCallBack cb)
    {
        this.cb = cb;
    }

    private void printHelp()
    {
        System.out.println("Help:");
        System.out.println("Here is a list of commands and what they are doing");
        System.out.println("QUEST - gives you a list of what are left to do. If this turns empty you won the game.");
        System.out.println("LOOK - gives you a list of objects you see and what character that are being on screen.");
        System.out.println("GOTO <obj> - You will automaticly going to object.");
        System.out.println("USE <obj> - You will use object.");
        System.out.println("OPEN <obj> - You will open object. ");
    }

    public void start() throws Exception
    {
        int f = 0;
        human = PieceFactory.createHuman();
        pieces.add(human);
        piecePositions.put(human,new Point(18,19));
        System.out.println("Story:");
        System.out.println("You are on an assigment from the local police to investigate the disappearens of Dr. Anthony Lindsey. You have arrive at his summer house by the lake. You are about to see if he is here and if not break in and take all clues from the house and then leave");
        System.out.println("");
        System.out.println("Hint:");
        System.out.println("Type HELP");
        human.setCallBack(this);
        pieceCharacters.put(human,new Character('@'));
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
            try
            {
                BufferedReader br = new BufferedReader(  new InputStreamReader(System.in)  );
                input(br.readLine());
            }
            catch(Exception e)
            {
                e.printStackTrace();
            }
        }

    }

    private void update()
    {
        for(PieceI p : pieces)
        {
            p.update();
        }
        cameraX = piecePositions.get(human).x-11;
        cameraY = piecePositions.get(human).y-11;
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

    public void input(String command)
    {
        if(command.equals("HELP"))printHelp();
    }

    public boolean canSee(int x,int y)
    {
        if(x>=world.width)return false;
        if(y>=world.height)return false;
        if(x<0)return false;
        if(y<0)return false;
        boolean[][] s = human.getSight();
        
        return s[x][y];
    }

}
