package qahweh.almostdarkness.gamelogic.piece;

public class PieceFactory
{
    public static PieceI getHuman()
    {
        return new Human();
    }
}
