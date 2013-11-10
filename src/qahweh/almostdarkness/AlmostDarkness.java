package qahweh.almostdarkness;

import qahweh.almostdarkness.ui.UserInterface;
import qahweh.almostdarkness.ui.UI1;
import qahweh.almostdarkness.ui.UserInterfaceCallBack;
import qahweh.almostdarkness.gamelogic.Game;
import qahweh.almostdarkness.gamelogic.GameCallBack;
import qahweh.almostdarkness.gamelogic.piece.PieceI;

import java.util.List;
import java.awt.Point;
import java.util.ArrayList;
import java.io.InputStreamReader;
import java.io.BufferedReader;


public class AlmostDarkness implements GameCallBack, UserInterfaceCallBack
{
    private UserInterface ui;
    private Game game;

    private AlmostDarkness()
    {
        ui = new UI1();
        ui.setCallBack(this);
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
        if(false)return;
        char[][] draw = new char[124][64];

        for(int x=0; x<game.world.width; x++)
        {
            for(int y=0; y<game.world.height; y++)
            {
                draw[x][y] = ( game.canSee(x,y) ? game.world.matris[x][y] : ' ');
            }
        }

        List keys = new ArrayList(game.piecePositions.keySet());
        for(int i=0; i<keys.size(); i++)
        {
            PieceI o = (PieceI)keys.get(i);
            Point p = game.piecePositions.get(o);
            if(p.x>-1 && p.y>-1)
                draw[p.x][p.y] = 'e';
        }
/*
        for(int i=0; i<game.piecePositions.size(); i++)
        {
            Point pos = game.piecePositions.get(i)
        }
*/
        String output = "";
        for(int y=0; y<26; y++)
        {
            for(int x=0; x<85; x++)
            {
                output += draw[x][y]; 
            }
            output += "\n";
        }
        ui.draw(output);



/*        

        }*/
    }

    @Override
    public void keyPressed(int k)
    {
        game.input(k);
    }

}
