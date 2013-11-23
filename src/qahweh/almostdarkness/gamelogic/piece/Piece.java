package qahweh.almostdarkness.gamelogic.piece;

import qahweh.almostdarkness.gamelogic.piece.controller.Controller;
import qahweh.almostdarkness.gamelogic.piece.controller.ControllerCallBack;
import qahweh.almostdarkness.gamelogic.piece.component.Component;
import qahweh.almostdarkness.gamelogic.piece.component.Eye;

import java.util.ArrayList;

public class Piece implements PieceI, ControllerCallBack
{

    protected Controller controller;
    protected PieceCallBack pieceCallBack;
    ArrayList<Component> components = new ArrayList<Component>();

    public void setController(Controller controller)
    {
        this.controller = controller;
    }

    public void setCallBack(PieceCallBack pieceCallBack)
    {
        this.pieceCallBack = pieceCallBack;
    }

    public void update()
    {
        Eye e = getEye();
        if(e!=null)e.updateView();
        if(controller!=null)
        {
            controller.update();
            if(controller.wantWalkWest())pieceCallBack.walkWest(this);
            if(controller.wantWalkEast())pieceCallBack.walkEast(this);
            if(controller.wantWalkNorth())pieceCallBack.walkNorth(this);
            if(controller.wantWalkSouth())pieceCallBack.walkSouth(this);
        }
    }

    private Eye getEye()
    {
        Eye e = null;
        for(Component c : components)
        {
            if(c instanceof Eye)return e = (Eye)c;
        }
        return null;
    }

    public void add(Component component)
    {
        components.add(component);
    }
    
    public boolean[][] getSight()
    {
        boolean[][] s = new boolean[150][150];
        Eye e = getEye();
        if(e==null){ return s;}
        if(e.sight==null){ return s;}
        return e.sight;
    }

    public char[][] getCharSight()
    {
        char[][] s = new char[21][21];
        Eye e = getEye();
        if(e==null)return s;
        if(e.charSight==null)return s;

        char[][] r = new char[21][21];
        boolean[][] b = getSight();
        if(b==null)return s; //necer null? remove

        for(int x=0; x<21; x++)
        {
            for(int y=0; y<21; y++)
            {


                r[x][y] = 
                            e.charSight[x][y] ;
                            
            }
        }
        return r;
    }

    @Override
    public char[][] getMatris(int x, int y)
    {
        return getCharSight();
    }

}

