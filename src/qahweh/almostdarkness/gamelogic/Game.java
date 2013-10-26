package qahweh.almostdarkness.gamelogic;

import qahweh.almostdarkness.gamelogic.piece.*;
import qahweh.almostdarkness.gamelogic.piece.controller.*;

import java.awt.Point;
import java.util.Hashtable;


public class Game implements PieceCallBack
{
    private GameCallBack cb;
    public int loop;
    private Hashtable<Piece, Point> piecePositions;

    public Game()
    {
        piecePositions = new Hashtable<Piece, Point>();
    }

    public void setCallBack(GameCallBack cb)
    {
        this.cb = cb;
    }

    public void start() throws Exception
    {
        int f = 0;
        PieceI human = PieceFactory.getHuman();
        human.setCallBack(this);
        Controller c = ControllerFactory.getSpinController();
        human.setController(c);

        while(true)
        {
            f++;
            human.update();
            loop = f;
            Thread.sleep(100);
            cb.refresh(this);
        }

    }

    @Override
    public void walkWest(PieceI p)
    {
        System.out.println("1");
    }

    @Override
    public void walkEast(PieceI p)
    {
        System.out.println("2");

    }

    @Override
    public void walkSouth(PieceI p)
    {
        System.out.println("3");

    }

    @Override
    public void walkNorth(PieceI p)
    {
        System.out.println("4");

    }

}
