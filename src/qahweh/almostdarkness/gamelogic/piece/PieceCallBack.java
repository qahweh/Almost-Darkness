package qahweh.almostdarkness.gamelogic.piece;

import qahweh.almostdarkness.gamelogic.piece.controller.Controller;
import qahweh.almostdarkness.gamelogic.piece.component.Eye;

public interface PieceCallBack
{
    public void walkWest(PieceI p);
    public void walkEast(PieceI p);
    public void walkSouth(PieceI p);
    public void walkNorth(PieceI p);
    public void updateView(PieceI p, Eye e);
    public void updateCharSight(PieceI p, Eye e);
}
