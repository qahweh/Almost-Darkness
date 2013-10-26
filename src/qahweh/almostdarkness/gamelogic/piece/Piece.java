package qahweh.almostdarkness.gamelogic.piece;

import qahweh.almostdarkness.gamelogic.piece.controller.Controller;

public class Piece implements PieceI
{

    protected Controller controller;
    private PieceCallBack pieceCallBack;

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
        controller.update();
        if(controller.wantWalkWest())pieceCallBack.walkWest(this);
        if(controller.wantWalkEast())pieceCallBack.walkEast(this);
        if(controller.wantWalkNorth())pieceCallBack.walkNorth(this);
        if(controller.wantWalkSouth())pieceCallBack.walkSouth(this);
    }

}

