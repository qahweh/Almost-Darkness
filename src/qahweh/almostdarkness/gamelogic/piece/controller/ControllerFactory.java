package qahweh.almostdarkness.gamelogic.piece.controller;

public class ControllerFactory
{
    public static Controller getSpinController(ControllerCallBack ccb)
    {
        return new Spin(ccb);
    }

    public static Controller getTestPfController(char[][] matris,int x, int y)
    {
        return new TestPf(matris,x,y);
    }

    public static Controller getHelperController(ControllerCallBack ccb)
    {
      //  return null;
        return new Helper(ccb);
    }

}
