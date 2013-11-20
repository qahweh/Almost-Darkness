package qahweh.almostdarkness.gamelogic.piece;

import qahweh.almostdarkness.gamelogic.piece.controller.Controller;
import qahweh.almostdarkness.gamelogic.piece.component.Component;
import qahweh.almostdarkness.gamelogic.piece.component.Eye;

import java.util.ArrayList;

public class Piece implements PieceI
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
        if(controller!=null)
        {
            controller.update();
            if(controller.wantWalkWest())pieceCallBack.walkWest(this);
            if(controller.wantWalkEast())pieceCallBack.walkEast(this);
            if(controller.wantWalkNorth())pieceCallBack.walkNorth(this);
            if(controller.wantWalkSouth())pieceCallBack.walkSouth(this);
        }
        Eye e = getEye();
        if(e!=null)e.updateView();
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
        boolean[][] s = new boolean[11][11];
        Eye e = getEye();
        if(e==null)return s;
        if(e.sight==null)return s;
        return e.sight;
    }

}

