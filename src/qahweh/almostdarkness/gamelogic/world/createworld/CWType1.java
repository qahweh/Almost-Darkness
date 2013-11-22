package qahweh.almostdarkness.gamelogic.world.createworld;

import java.util.Random;
import java.util.ArrayList;
import java.awt.Point;

public class CWType1 implements CreateWorld
{
    private class CanNotCompleteBuildWorldException extends Exception
    {
    }

    private char[][] matris;
    private int width;
    private int height;
    private Random random;

    public void setRandom(int r)
    {
        random = new Random(r);
    }

    public void setSize(int width, int height)
    {
        this.width = width;
        this.height = height;
    }

    public char[][] createAndReturnMatris()
    {
        matris = new char[width][height];
        boolean worldComplete =false;
        while(!worldComplete)
        {
            try
            {
                Thread.sleep(100);
                for(int x=0; x<width; x++)
                {
                    for(int y=0; y<height; y++)
                    {
                        matris[x][y] = ' ';
                    }
                }

                for(int i=0; i<3; i++)
                    makeSquare();

                for(int i=0; i<7; i++)
                    makeRoad();

                
                for(int i=0; i<30; i++)
                {
                    makeRoom(false);
                    makeRoom(true);
                    makeRoom(true);
                    plantTree();
                }

                while(howMuchIsSpace()>0.6)
                {
                    plantTree();
                }

                for(int x=0; x<width; x++)
                {
                    for(int y=0; y<height; y++)
                    {
                        if(x%2==0 && y%2==0 && matris[x][y] == ' ')matris[x][y] = ',';
                    }
                }
               worldComplete = true;
            }
            catch(CanNotCompleteBuildWorldException e)
            {
                //keep on going. try build world again. this might end of different because of new valus from random object
            }
            catch(Exception e)
            {
                e.printStackTrace();
            }
        }

        matris[20][23]= '-';
        matris[19][23]= '-';
        matris[21][23]= '-';
//        matris[20][25]= '@';

        return matris;
    }

    private float howMuchIsSpace()
    {
        int all = width*height;
        int c = 0;
        for(int x=0; x<width; x++)
        {
            for(int y=0; y<height; y++)
            {
                if(matris[x][y]==' ')c++;
            }
        }
        return (float)c/(float)all;
    }

    private void makeSquare()
    {
        int margin = 20;
        int width = 12;
        int height = 12;

        int randomx = this.width-width-margin*2;
        int randomy = this.height-height-margin*2;
        int x = 0;
        int y = 0;
        boolean f = true;
        while(f)
        {
            x = random.nextInt(randomx)+margin;
            y = random.nextInt(randomy)+margin;
            f=false;
            for(int x2=x-margin; x2<width+x+margin; x2++)
            {
                for(int y2=y-margin; y2<y+height+margin; y2++)
                {
                   if(matris[x2][y2]!=' ')f = true;
                }
            }
        }
        for(int x2=x; x2<width+x; x2++)
        {
            for(int y2=y; y2<y+height; y2++)
            {
                matris[x2][y2]='#';
            }
        }

        makeRoom2(x,y-6,5,5,3);
        makeRoom2(x+7,y-6,5,5,3);
        makeRoom2(x,y+13,5,5,2);
        makeRoom2(x+7,y+13,5,5,2);
        makeRoom2(x-6,y,5,5,7);
        makeRoom2(x-6,y+7,5,5,7);
        makeRoom2(x+13,y,5,5,4);
        makeRoom2(x+13,y+7,5,5,4);
    }

    private void makeRoom2(int startX, int startY, int width, int height, int door)
    {
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
        Point p = getAllConnects(startX,startY,width,height).get(door);
        matris[p.x][p.y] = '+';
    }

    private void makeRoad() throws CanNotCompleteBuildWorldException
    {
        boolean foundGoodRoad = false;
        int lastR = random.nextInt();
        int c =0;
        while(!foundGoodRoad)
        {
            c++;
            if(c>10000)throw new CanNotCompleteBuildWorldException();
            Random r = new Random(lastR);
            foundGoodRoad = true;
            if(r.nextInt(2)==0)
            {
                int x = r.nextInt(width-2)+1;
                for(int y=0; y<height; y++)
                {
                    if(!(matris[x][y]==' ' || matris[x][y]=='#'))foundGoodRoad = false;

                }
            }
            else
            {
                int y = r.nextInt(height-2)+1;
                for(int x=0; x<width; x++)
                {
                    if(!(matris[x][y]==' ' || matris[x][y]=='#'))foundGoodRoad = false;

                }
            }
        }
        Random r = new Random(lastR);
        if(r.nextInt(2)==0)
        {
            int x = r.nextInt(width-2)+1;
            for(int y=0; y<height; y++)
            {
                matris[x][y]='#';
            }
        }
        else
        {
            int y = r.nextInt(height-2)+1;
            for(int x=0; x<width; x++)
            {
                matris[x][y]='#';
            }
        }
    }

    private void plantTree() throws Exception
    {
        int x = random.nextInt(width);
        int y = random.nextInt(height);
        int c =0;
        while(!(matris[x][y]==' '))
        {
            x = random.nextInt(width);
            y = random.nextInt(height);
            c++;
            if(c==100)throw new Exception();
        }
        plantTree(x,y,1);
    }

    private void plantTree(int x, int y, int c) throws Exception
    {
        if(random.nextInt(7)<c)return;
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
        int x = random.nextInt(width);
        int y = random.nextInt(height);
        int c = 0;
        while(!(matris[x][y]=='-' || matris[x][y]=='|') || !(matris[x-1][y] == '.' || matris[x+1][y] == '.' || matris[x][y-1] == '.' || matris[x][y+1] == '.'))
        {
            x = random.nextInt(width);
            y = random.nextInt(height);
            c++;
            if(c==100)throw new Exception();
        }
        matris[x][y]='+';
    }

    private boolean canBuildRoomHere(int startX, int startY, int width, int height)
    {
                for(int x=startX; x<width+startX; x++)
                {
                    for(int y=startY; y<startY+height; y++)
                    {
                        if(matris[x][y]=='.' || matris[x][y]=='+' || matris[x][y]=='#')return false;
                    }
                }    
        return true;
    }

    private boolean goodspot(int startX, int startY, int width, int height)
    {
        if(!canBuildRoomHere(startX,startY,width,height))return false;
        int noC = 0;
        for(Point p : getAllConnects(startX,startY,width,height))
        {
            if(matris[p.x][p.y]=='|' || matris[p.x][p.y]=='-')
            {
                noC++;
            }
        }
        return (noC > 1);
    }

    private void makeRoom(boolean findConnect) throws Exception
    {
        int width = random.nextInt(7)+4;
        int height = random.nextInt(7)+4;
        int startX = random.nextInt(this.width-width);
        int startY = random.nextInt(this.height-height);

        int c = 0;
        while(!canBuildRoomHere(startX,startY,width,height))
        {
            c++;
            if(c>100)throw new Exception();
            width = random.nextInt(7)+4;
            height = random.nextInt(7)+4;
            startX = random.nextInt(this.width-width);
            startY = random.nextInt(this.height-height);
        }

        while(findConnect)
        {
            if(goodspot(startX,startY,width,height))
            {
                int cc = 0;
                while(true)
                {
            cc++;
            if(cc>100)throw new Exception();
                    
                    Point p = getAllConnects(startX,startY,width,height).get(random.nextInt(getAllConnects(startX,startY,width,height).size()));
                    if(matris[p.x-1][p.y] == '.' || matris[p.x+1][p.y] == '.' || matris[p.x][p.y-1] == '.' || matris[p.x][p.y+1] == '.'){ matris[p.x][p.y] = '+'; break;}
                    
                }
                break;   
            }
            startX = random.nextInt(this.width-width);
            startY = random.nextInt(this.height-height);
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
                int ccc = 0;
        while(true)
        {
            ccc++;
            if(ccc>100)throw new Exception();
            Point p = getAllConnects(startX,startY,width,height).get(random.nextInt(getAllConnects(startX,startY,width,height).size()));
            if(matris[p.x-1][p.y] == '.' || matris[p.x+1][p.y] == '.' || matris[p.x][p.y-1] == '.' || matris[p.x][p.y+1] == '.'){ matris[p.x][p.y] = '+'; break;}
        }
    }

    private ArrayList<Point> getAllConnects(int startX, int startY, int width, int height)
    {
        ArrayList<Point> list = new ArrayList<Point>();
        for(int x=startX+1; x<width+startX-2; x++) { list.add(new Point(x,startY)); list.add(new Point(x,startY+height-1)); }
        for(int y=startY+1; y<height+startY-2; y++) { list.add(new Point(startX,y)); list.add(new Point(startX+width-1,y)); }
        return list;
    }


}
