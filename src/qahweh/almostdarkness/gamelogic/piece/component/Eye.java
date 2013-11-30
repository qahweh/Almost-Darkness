package qahweh.almostdarkness.gamelogic.piece.component;

public class Eye implements Component
{
    public boolean[][] sight;
    public char[][] charSight = new char[21][21];
    public boolean[][] block;
    public int x;
    public int y;

    protected int viewLength = 9;
    protected int fa = 0;
    protected int ta = 80;
    protected int inter = 40;

    public void updateView()
    {
    }

    public void updateView2()
    {
       // if(sight!=null)return;

        //System.out.println(",");

        int width = block.length;
        int height = block[0].length;

        sight = new boolean[width][height];
        //for(int x=0; x<10; x++)
        //for(int y=0; y<10; y++)
        //sight[x][y]=true;
        for(int i=fa; i<ta; i++)
        {
            double l = (Math.PI/inter)*i;
            double c = Math.cos(l);
            double s = Math.sin(l);

            for(int j=0; j<viewLength; j++)
            {
                int u = x+(int)(j*s);
                int t = y+(int)(j*c);
                
                if(u>0 && t>0 && u<width-1 && t<height-1)
                {
                    if(!block[u][t])
                        sight[u][t]=true;
                    else {sight[u][t]=true; break;}
                }
            }
        }
    }
}
