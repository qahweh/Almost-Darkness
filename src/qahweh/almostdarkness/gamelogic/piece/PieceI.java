package qahweh.almostdarkness.gamelogic.piece;

import qahweh.almostdarkness.gamelogic.piece.controller.Controller;

public interface PieceI
{
    public void update();
    public void setController(Controller controller);
    public void setCallBack(PieceCallBack pieceCallBack);
}
