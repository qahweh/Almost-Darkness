package qahweh.almostdarkness.gamelogic.piece.controller.pathfinder;

import java.util.ArrayList;
import java.util.Random;
import java.awt.Point;

class PfNode
{
    public int x;
    public int y;
    public int counter;
    
    public PfNode(int x, int y, int counter)
    {
        this.x = x;
        this.y = y;
        this.counter = counter;
    }

}

public class PathFinder
{
    private int step;
    private int startX;
    private int startY;
    private int endX;
    private int endY;
    private boolean foundStart = false;
    ArrayList<PfNode> path;
    char[][] matris;

    public PathFinder(int startX, int startY, int endX, int endY,char[][] matris) throws Exception
    {
        this.matris = matris;
        this.path = makeNodes(startX, startY, endX, endY);
        step = 0;
    }

    private ArrayList<PfNode> makeNodes(int startX, int startY, int endX, int endY) throws Exception
    {
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        ArrayList<PfNode> nodes = new ArrayList<PfNode>();
        nodes.add(new PfNode(endX,endY,1));

        for(int l=0; l<200; l++)
        {
            int u = nodes.size();
            for(int i=0; i<u; i++)
            {
                buildAround(nodes, i);
            }
            if(foundStart)break;
            if(l==199){ throw new Exception("Path to long or can not find goal"); }
        }

        ArrayList<PfNode> path = new ArrayList<PfNode>();


        int lastStep = -1;
        int lastX = -1;
        int lastY = -1;
        for(int i=0; i<nodes.size(); i++)
        {
            if(nodes.get(i).x == startX && nodes.get(i).y == startY)
            {
                lastStep = nodes.get(i).counter;
                path.add(nodes.get(i));
                lastX = nodes.get(i).x;
                lastY = nodes.get(i).y;
            }
        }

        while(lastStep>0)
        {
            lastStep--;
            for(int i=0; i<nodes.size(); i++)
            {
                if(lastStep == nodes.get(i).counter && isConnect(nodes.get(i),lastX,lastY))
                {
                    lastX = nodes.get(i).x;
                    lastY = nodes.get(i).y;
                    path.add(nodes.get(i)); 
                    break;
                }

            }
        }

        return path;
    }

    boolean isConnect(PfNode n,int x, int y)
    {
        if(x==n.x-1 && y==n.y)return true;
        if(x==n.x+1 && y==n.y)return true;
        if(x==n.x && y==n.y-1)return true;
        if(x==n.x && y==n.y+1)return true;
        return false;
    }

    boolean cordTaken(ArrayList<PfNode> nodes, int x, int y, int counter)
    {
        if(x<0)return true;
        if(y<0)return true;
        if(x>=21)return true;
        if(y>=21)return true;
        if(matris[x][y]=='-')return true;
        if(matris[x][y]=='|')return true;
        if(matris[x][y]=='t')return true;
        for(int i=0; i<nodes.size(); i++)
        {
            if(nodes.get(i).x == x && nodes.get(i).y == y )return true;
        }
        return false;
    }

    void move(ArrayList<PfNode> nodes, int i, int x, int y)
    {

        if(!cordTaken(nodes, nodes.get(i).x+x,nodes.get(i).y+y,nodes.get(i).counter+1))
        {
            nodes.add(new PfNode(nodes.get(i).x+x,nodes.get(i).y+y,nodes.get(i).counter+1));        
            if(nodes.get(i).x+x == startX && nodes.get(i).y+y == startY) foundStart = true;
        }
    }

    void buildAround(ArrayList<PfNode> nodes, int i)
    {

        move(nodes,i,0,1);
        move(nodes,i,0,-1);
        move(nodes,i,1,0);
        move(nodes,i,-1,0);
    }

    public Point getPoint()
    {
        if(!atGoal())
        {
            step++;
            return new Point(path.get(step).x,path.get(step).y);
        }
        return null;
    }

    public boolean atGoal()
    {
        return (path.get(step).x==endX && path.get(step).y==endY);
    }

}

