package qahweh.almostdarkness;

import qahweh.almostdarkness.ui.UserInterface;
import qahweh.almostdarkness.ui.UI1;
import qahweh.almostdarkness.gamelogic.Game;
import qahweh.almostdarkness.gamelogic.GameCallBack;

public class AlmostDarkness implements GameCallBack
{
    private UserInterface ui;
    private Game game;

    private AlmostDarkness()
    {
        ui = new UI1();
        game = new Game();
        game.setCallBack(this);
    }

    private void run()
    {
        ui.start();
        try
        {
            game.start();
        }
        catch(Exception e)
        {
            e.printStackTrace();
        }
        ui.stop();
    }

    public static void runGame()
    {
        AlmostDarkness ad = new AlmostDarkness();
        ad.run();
    }
    

    public static void main(String[] args)
    {
        runGame();
    }

    @Override
    public void refresh(Game game)
    {
        ui.draw(""+game.loop);
    }

}
