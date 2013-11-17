package qahweh.almostdarkness.gamelogic.piece.controller;

public class ControllerFactory
{
    public static Controller getSpinController()
    {
        return new Spin();
    }

    public static Controller getTestPfController(char[][] matris,int x, int y)
    {
        return new TestPf(matris,x,y);
    }

}
