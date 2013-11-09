package qahweh.almostdarkness.gamelogic.world;

import java.util.Random;
import java.util.ArrayList;
import java.awt.Point;

public class World
{
    public char[][] matris;
    public int width;
    public int height;

    public World()
    {
        width = 85;
        height = 26;
        matris = new char[width][height];

        boolean worldComplete =false;
        while(!worldComplete)
        {
            try
            {

                for(int x=0; x<width; x++)
                {
                    for(int y=0; y<height; y++)
                    {
                        matris[x][y] = ' ';
                    }
                }

                makeRoom(false);
                makeDoor();
                makeRoom(true);
                makeRoom(true);
                makeRoom(true);
                makeRoom(true);
                makeRoom(true);

                plantTree();
                plantTree();
                plantTree();
                plantTree();
                plantTree();
                plantTree();
                plantTree();
                plantTree();
                plantTree();
                plantTree();
                plantTree();
                plantTree();
                plantTree();
                plantTree();
                plantTree();
                plantTree();
                plantTree();
                plantTree();
                plantTree();
                plantTree();
                plantTree();
                plantTree();
                plantTree();
                plantTree();

                for(int x=0; x<width; x++)
                {
                    for(int y=0; y<height; y++)
                    {
                        if(x%2==0 && y%2==0 && matris[x][y] == ' ')matris[x][y] = ',';
                    }
                }


                worldComplete = true;
            }
            catch(Exception e)
            {
                e.printStackTrace();
            }
        }

    }

    private void plantTree() throws Exception
    {
        Random r = new Random();
        int x = r.nextInt(width);
        int y = r.nextInt(height);
int c =0;
                while(!(matris[x][y]==' '))
                {
                    x = r.nextInt(width);
                    y = r.nextInt(height);
                    c++;
                    if(c==100)throw new Exception();
                }

        plantTree(x,y,1);
    }

    private void plantTree(int x, int y, int c) throws Exception
    {
        Random r = new Random();
        if(r.nextInt(7)<c)return;
        if(x<0)return;
        if(y<0)return;
        if(x>width-1)return;
        if(y>height-1)return;

                if(!(matris[x][y]==' '))return;

                matris[x][y]='t';


                plantTree(x+1,y,c+1);
                plantTree(x-1,y,c+1);
                plantTree(x,y+1,c+1);
                plantTree(x,y-1,c+1);
    }

    private void makeDoor() throws Exception
    {
        Random r = new Random();
        int x = r.nextInt(width);
        int y = r.nextInt(height);
        int c = 0;
        while(!(matris[x][y]=='-' || matris[x][y]=='|') || !(matris[x-1][y] == '.' || matris[x+1][y] == '.' || matris[x][y-1] == '.' || matris[x][y+1] == '.'))
        {
            x = r.nextInt(width);
            y = r.nextInt(height);
            c++;
            if(c==100)throw new Exception();
        }
        matris[x][y]='+';
    }

    private boolean goodspot(int startX, int startY, int width, int height)
    {
        int noC = 0;
        for(Point p : getAllConnects(startX,startY,width,height))
        {
            if(matris[p.x][p.y]=='|' || matris[p.x][p.y]=='-')
            {
                noC++;
                for(int x=startX; x<width+startX; x++)
                {
                    for(int y=startY; y<startY+height; y++)
                    {
                        if(matris[x][y]=='.' || matris[x][y]=='+')return false;
                    }
                }
            }
        }
        return (noC > 1);
    }

    private void makeRoom(boolean findConnect)
    {
        Random r = new Random();
        int width = r.nextInt(7)+4;
        int height = r.nextInt(7)+4;
        int startX = r.nextInt(this.width-width);
        int startY = r.nextInt(this.height-height);

        while(findConnect)
        {
            if(goodspot(startX,startY,width,height))
            {
                while(true)
                {
                    Point p = getAllConnects(startX,startY,width,height).get(r.nextInt(getAllConnects(startX,startY,width,height).size()));
                    if(matris[p.x-1][p.y] == '.' || matris[p.x+1][p.y] == '.' || matris[p.x][p.y-1] == '.' || matris[p.x][p.y+1] == '.'){ matris[p.x][p.y] = '+'; break;}
                    
                }
                break;   
            }
            startX = r.nextInt(this.width-width);
            startY = r.nextInt(this.height-height);
        }

        for(int x=startX; x<width+startX; x++)
        {
            for(int y=startY; y<startY+height; y++)
            {
                if(matris[x][y] != '+')
                {
                    if(y==startY)matris[x][y] = '-';
                    else if(y==startY+height-1)matris[x][y] = '-';
                    else if(x==startX)matris[x][y] = '|';
                    else if(x==width+startX-1)matris[x][y] = '|';
                    else matris[x][y] = '.';
                }
            }
        }
    }

    public boolean isSolid(int x, int y)
    {
        if(matris[x][y]=='|')return true;
        if(matris[x][y]=='-')return true;
        if(matris[x][y]=='t')return true;
        return false;
    }


    private ArrayList<Point> getAllConnects(int startX, int startY, int width, int height)
    {
        ArrayList<Point> list = new ArrayList<Point>();
        for(int x=startX+1; x<width+startX-2; x++) { list.add(new Point(x,startY)); list.add(new Point(x,startY+height-1)); }
        for(int y=startY+1; y<height+startY-2; y++) { list.add(new Point(startX,y)); list.add(new Point(startX+width-1,y)); }
        return list;
    }


}
