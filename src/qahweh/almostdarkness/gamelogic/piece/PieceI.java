package qahweh.almostdarkness.gamelogic.piece;

import qahweh.almostdarkness.gamelogic.piece.controller.Controller;
import qahweh.almostdarkness.gamelogic.piece.component.Component;

public interface PieceI
{
    public void update();
    public void setController(Controller controller);
    public void setCallBack(PieceCallBack pieceCallBack);
    public void add(Component component);
    public boolean[][] getSight();
}
