package qahweh.almostdarkness.gamelogic.world;

import java.util.Random;
import java.util.ArrayList;
import java.awt.Point;

import qahweh.almostdarkness.gamelogic.world.createworld.CreateWorld;
import qahweh.almostdarkness.gamelogic.world.createworld.CWType1;

public class World
{
    public char[][] matris;
    public int width;
    public int height;

    public World()
    {
        width = 150;
        height = 150;
        CreateWorld cw = new CWType1();
        cw.setRandom(15279);
        cw.setSize(width,height);
        matris = cw.createAndReturnMatris();
    }

    public boolean isSolid(int x, int y)
    {
        if(matris[x][y]=='|')return true;
        if(matris[x][y]=='-')return true;
        if(matris[x][y]=='t')return true;
        return false;
    }
}
