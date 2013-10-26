package qahweh.almostdarkness.gamelogic.piece;

import qahweh.almostdarkness.gamelogic.piece.controller.Controller;

public interface PieceCallBack
{
    public void walkWest(PieceI p);
    public void walkEast(PieceI p);
    public void walkSouth(PieceI p);
    public void walkNorth(PieceI p);
}
