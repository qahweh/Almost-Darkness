package qahweh.almostdarkness.gamelogic.piece.component;

public class Eye implements Component
{
    public boolean[][] sight = new boolean[10][10];
    public boolean[][] block;
    public int x;
    public int y;

    protected int viewLength = 10;

    public void updateView()
    {
        int fa = 0;
        int ta = 240;



        int width = block.length;
        int height = block[0].length;


        sight = new boolean[width][height];
        //for(int x=0; x<10; x++)
        //for(int y=0; y<10; y++)
        //sight[x][y]=true;
        for(int i=fa; i<ta; i++)
        {
            double l = (Math.PI/80)*i;
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
