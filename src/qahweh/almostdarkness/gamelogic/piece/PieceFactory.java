package qahweh.almostdarkness.gamelogic.piece;

public class PieceFactory
{
    public static PieceI createHuman()
    {
        return new Human();
    }

    public static PieceI createFishman()
    {
        return new FishMan();
    }

    public static PieceI createDog()
    {
        return new Dog();
    }
}
