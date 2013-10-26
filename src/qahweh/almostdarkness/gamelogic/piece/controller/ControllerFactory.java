package qahweh.almostdarkness.gamelogic.piece.controller;

public class ControllerFactory
{
    public static Controller getSpinController()
    {
        return new Spin();
    }
}
