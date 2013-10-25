
import java.util.ArrayList;
import java.util.Random;
import java.awt.Point;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.JLabel;
import java.awt.event.KeyListener;
import java.awt.event.KeyEvent;
import java.awt.Font;
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

class Pf
{
    private int step;
    private int startX;
    private int startY;
    private int endX;
    private int endY;
    private boolean foundStart = false;
    ArrayList<PfNode> path;
    char[][] matris;

    public Pf(int startX, int startY, int endX, int endY,char[][] matris) throws Exception
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
        if(x>=60)return true;
        if(y>=30)return true;
        if(matris[x][y]=='#')return true;
        if(matris[x][y]=='+')return true;
        if(matris[x][y]=='-')return true;
        if(matris[x][y]=='|')return true;
        if(matris[x][y]=='B')return true;
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

    Point getPoint()
    {
        step++;
        return new Point(path.get(step).x,path.get(step).y);
    }

    public boolean atGoal()
    {
        return (path.get(step).x==endX && path.get(step).y==endY);
    }

}

class Piece
{
    public int x;
    public int y;
    public Pf pf;
    private char[][] matris;
    public boolean[][] canSee;
    private World w;
    public int ai = 0;
    public Piece hero = null;
    int dir =0;
    public int diff = 0;
    public Piece(int x, int y, char[][] matris, World w) throws Exception
    {
        this.w = w;
        if(matris==null)throw new Exception("Matris can not be null");
        this.x = x;
        this.y = y;
        this.matris = matris;
        canSee = new boolean[w.width][w.height];
    }

    public void goToRandomSpot() throws Exception
    {
        Point p = w.findRandomSpotOf('.');
        gotoPoint(p.x,p.y);
    }

    public void gotoPoint(int x, int y) throws Exception
    {
        if(!  (  matris[x][y]=='.'  || matris[x][y]==';' || matris[x][y]=='1' || matris[x][y]=='2' || matris[x][y]=='3' || matris[x][y]=='4' || matris[x][y]=='5' || matris[x][y]=='6' || matris[x][y]=='7' || matris[x][y]=='8' ))return;
        pf = new Pf(this.x,this.y,x,y,matris);
    }

    private void castRay()
    {
        int width = w.width;
        int height = w.height;
        Random r = new Random();

        for(int x=0; x<width; x++)
        {
            for(int y=0; y<height; y++)
            {
               canSee[x][y]=false;
            }
        }

        int fa=0;
        int ta=160;

        if(dir==0)
        {
            fa=10-diff;
            ta=70+diff;
        }
        else if(dir==1)
        {
            fa=90-diff;
            ta=150+diff;
        }
        else if(dir==2)
        {
            fa=-35-diff;
            ta=35+diff;
        }
        else if(dir==3)
        {
            fa=-35+80-diff;
            ta=35+80+diff;
        }


        for(int i=fa; i<ta; i++)
        {
            double l = (Math.PI/80)*i;
            double c = Math.cos(l);
            double s = Math.sin(l);

            for(int j=0; j<100; j++)
            {
                if(matris[x+(int)(j*s)][y+(int)(j*c)]=='.')
                    canSee[x+(int)(j*s)][y+(int)(j*c)]=true;
                else {canSee[x+(int)(j*s)][y+(int)(j*c)]=true; break;}
            }

        }        

    }

    public Point seeHero()
    {
        if(hero==null)return null;
        if(canSee[hero.x][hero.y]) return new Point(hero.x,hero.y);
        return null;
    }

    public void update() throws Exception
    {
        if(ai==1 && seeHero()!=null)
        {
            Point p = seeHero();
            gotoPoint(p.x,p.y);
        }

        if(matris[this.x][this.y]=='1')
        {
            Game.foundSpot[1]=true;
            matris[this.x][this.y]='.';
         //   System.out.println("1");
            Point p = Game.findChar('2');
            gotoPoint(p.x,p.y);
        }

        if(matris[this.x][this.y]=='2')
        {
            Game.foundSpot[2]=true;
            matris[this.x][this.y]='.';
          //  System.out.println("2");
            Point p = Game.findChar('3');
            gotoPoint(p.x,p.y);
        }

        if(matris[this.x][this.y]=='3')
        {
            Game.foundSpot[3]=true;
            matris[this.x][this.y]='.';
         //   System.out.println("3");
            Point p = Game.findChar('4');
            gotoPoint(p.x,p.y);
        }

        if(matris[this.x][this.y]=='4')
        {
            Game.foundSpot[4]=true;
            matris[this.x][this.y]='.';
        //    System.out.println("4");
            Point p = Game.findChar('5');
            gotoPoint(p.x,p.y);
        }

        if(matris[this.x][this.y]=='5')
        {
            Game.foundSpot[5]=true;
            matris[this.x][this.y]='.';
         //   System.out.println("5");
            Point p = Game.findChar('6');
            gotoPoint(p.x,p.y);
        }

        if(matris[this.x][this.y]=='6')
        {
            Game.foundSpot[6]=true;
            matris[this.x][this.y]='.';
         //   System.out.println("6");
            Point p = Game.findChar('7');
            gotoPoint(p.x,p.y);
        }


        if(matris[this.x][this.y]=='7')
        {
            Game.foundSpot[7]=true;
            matris[this.x][this.y]='.';
          //  System.out.println("7");
            Point p = Game.findChar('8');
            gotoPoint(p.x,p.y);
        }

        if(matris[this.x][this.y]=='8')
        {
            Game.foundSpot[8]=true;
            matris[this.x][this.y]='.';
        //    System.out.println("8");
            ai=1;
        }

        if(pf!=null)
        {

        Point p = pf.getPoint();

        if(this.x<p.x)dir = 0;
        if(this.x>p.x)dir = 1;
        if(this.y<p.y)dir = 2;
        if(this.y>p.y)dir = 3;

        this.x = p.x;
        this.y = p.y;
        castRay();

        if(pf.atGoal())
        {
            pf=null;
        }
        }
    }
}

class World
{
    char[][] matris;
    int width;
    int height;
    int currentRoomNumber = 1;

    public Point findRandomSpotOf(char c)
    {
        Random r = new Random();

        int x = r.nextInt(width);
        int y = r.nextInt(height);
        while(matris[x][y]!='.')
        {
            x = r.nextInt(width);
            y = r.nextInt(height);
        }

        return new Point(x,y);
    }

    public World(int width, int height, int random)
    {
        Random r = new Random(random);
        matris = new char[width][height];
        this.width = width;
        this.height = height;

        for(int x=0; x<width; x++) 
        for(int y=0; y<height; y++) 
        matris[x][y] = ' ';

        makeRandomRoom(false,r);
        for(int i=0; i<8; i++) makeRandomRoom(true,r);
        for(int i=0; i<10; i++) makedoor(r);
        for(int i=0; i<10; i++) putBox(r);
    }

    private void putBox(Random r)
    {
        while(true)
        {
            int x = r.nextInt(width);
            int y = r.nextInt(height);

            if(matris[x][y]=='.')
            {
                matris[x][y] = 'B';
                if(r.nextInt(2)==0 && matris[x-1][y]=='.')matris[x-1][y] = 'B';
                if(r.nextInt(2)==0 && matris[x][y-1]=='.')matris[x][y-1] = 'B';
                return;
            }
        }
    }

    

    boolean noDoorNear(int x, int y, Random r)
    {
        for(int x2=x-3; x2<x+3; x2++)
            for(int y2=y-3; y2<y+3; y2++)
            {
                if(x2<0 && y2<0 && x2>=width && y2>=height)
                if(matris[x2][y2]==';') return false;
            }
        return true;
    }

    void makedoor(Random r)
    {
        while(true)
        {
            int x = 1+r.nextInt(width-2);
            int y = 1+r.nextInt(height-2);
            if(matris[x][y]=='-')
            {
                if(matris[x][y-1]=='.' && matris[x][y+1]=='.' && noDoorNear(x,y,r))
                {
                    matris[x][y]=';';
                    return;
                }
            }

            if(matris[x][y]=='|')
            {
                if(matris[x-1][y]=='.' && matris[x+1][y]=='.' && noDoorNear(x,y,r))
                {
                    matris[x][y]=';';
                    return;
                }
            }
        }
    }

    void makeRandomRoom(boolean mustConnectButNoOverlapp, Random r)
    {
        int beenConnected = 0;
        boolean overlapp = false;
        int width = 2;
        int height = 2;
        int startx = 1;
        int starty = 1;
        while(beenConnected<3 || overlapp)
        {    
            beenConnected = 0;
            overlapp = false;
            width = r.nextInt(20)+5;
            height = r.nextInt(10)+5;
            startx=r.nextInt(this.width-width);
            starty=r.nextInt(this.height-height);
            for(int x=startx; x<width+startx; x++)
            {
                for(int y=starty; y<height+starty; y++)
                {
                    if(matris[x][y]=='-' || matris[x][y]=='|')beenConnected++;
                    if(matris[x][y]=='.')overlapp = true;
                }
            }
            if(!mustConnectButNoOverlapp)break;
        }

        for(int x=startx; x<width+startx; x++)
        {
            for(int y=starty; y<height+starty; y++)
            {

                if(x==width-1+startx && y==height-1+starty)matris[x][y] = '+';
                else if(x==startx && y==starty)matris[x][y] = '+';
                else if(x==width-1+startx && y==starty)matris[x][y] = '+';
                else if(x==startx && y==height-1+starty)matris[x][y] = '+';
                else if(x==startx)matris[x][y] = '|';
                else if(x==width-1+startx)matris[x][y] = '|';
                else if(y==starty)matris[x][y] = '-';
                else if(y==height-1+starty)matris[x][y] = '-';
                else matris[x][y] = '.';
            }
        }
        matris[startx+3][starty+3] = Character.forDigit(currentRoomNumber,10);
        currentRoomNumber++;
    }
}

class Game
{
    static char[][] matris;
    static Piece player;
    static Piece zombie;
    public static boolean[] foundSpot;
    static JLabel out;
    public static void main(String[] args) throws Exception
    {



        //if(true)return;

        foundSpot = new boolean[9];
        World w = findWorld(14);

        Point p = w.findRandomSpotOf('.');
        player = new Piece(p.x,p.y,matris,w);
        zombie.hero = player;
        zombie.diff = -25;
        player.diff = +20;
        JFrame f = new JFrame("Almost Darkness");
        f.setSize(600,400);
        f.addKeyListener(new KeyListener()
        {
            public void keyPressed(KeyEvent e){   try{update(e,true);}catch(Exception ex){ex.printStackTrace();}   }
            public void keyReleased(KeyEvent e){}
            public void keyTyped(KeyEvent e){}
        });
        f.setVisible(true);
        out = new JLabel();
        out.setFont(new Font("Courier New",Font.PLAIN,12));
        f.add(new JPanel().add(out));
    }

    private static World findWorld(int r4)
    { 
        World w = new World(60,25,6228);
        Point p = new Point(0,0);
        Random r2 = new Random(r4);
        while(true)
        {
            try
            {
                Thread.sleep(100);
                System.out.print(".");
                foundSpot = new boolean[9];
                int r3 = r2.nextInt();
                w = new World(60,25,r3);
                matris = w.matris;
                p = findChar('1');
                zombie = new Piece(8,15,matris,w);
                zombie.gotoPoint(p.x,p.y);

                for(int i=0; i<2000; i++)
                {
                    update(null,false);
                    int lll=0;
                    for(int i2=1; i2<9; i2++) if(foundSpot[i2])lll++;

                    if(lll==8)
                    {
                        return w;
                    }
                }        
            }
            catch(Exception e)
            {
//                e.printStackTrace();

            }
        }
    }   

    public static Point findChar(char c)
    {
        if(matris==null)return null;
        for(int x=0; x<60; x++)
            for(int y=0; y<25; y++)
                if(matris[x][y]==c) return new Point(x,y);

        return null;
    }

    private static boolean gameEnd = false;

    private static void update(KeyEvent e, boolean draw) throws Exception
    {
        if(gameEnd){ out.setText("GAME OVER"); return;}
       // Thread.sleep(500);
        if(e!=null && player!=null)
        {
        if(e.getKeyCode()==68 )player.gotoPoint(player.x+1,player.y);
        if(e.getKeyCode()==65 )player.gotoPoint(player.x-1,player.y);
        if(e.getKeyCode()==83 )player.gotoPoint(player.x,player.y+1);
        if(e.getKeyCode()==87 )player.gotoPoint(player.x,player.y-1);
        }
            if(player!=null)player.update();
            if(zombie!=null)
            {
                if(zombie.ai==1 && ( zombie.pf==null || zombie.pf.atGoal() ) )zombie.goToRandomSpot();
                zombie.update();
            }

            if(player!=null && zombie.x == player.x && zombie.y == player.y){gameEnd = true; return; }

            if(player!=null)if(matris[player.x][player.y]==';')matris[player.x][player.y]='.';

            if(draw)
            {/*
            for(int y=0; y<25; y++)
            {
                for(int x=0; x<60; x++)
                {
                    if(!player.canSee[x][y])System.out.print(' ');
                    else if(player!=null && player.x==x && player.y==y)System.out.print('d');
                    else if(zombie!=null && zombie.x==x && zombie.y==y)System.out.print('z');
                   // else if(matris[x][y]==null)System.out.print(' ');                    
                    else System.out.print(matris[x][y]);
                    
//                    System.out.print(matris[x][y]);

                }
                System.out.println("");
            }*/

            String toOut = "<html>";
            for(int y=0; y<25; y++)
            {
                for(int x=0; x<60; x++)
                {
                    if(!player.canSee[x][y])toOut += " ";
                    else if(player!=null && player.x==x && player.y==y)toOut += "d";
                    else if(zombie!=null && zombie.x==x && zombie.y==y)toOut += "z";
                   // else if(matris[x][y]==null)System.out.print(' ');                    
                    else toOut += matris[x][y];
                    
//                    System.out.print(matris[x][y]);

                }
                toOut +="<br>";
            }
            out.setText(toOut.replace(" ","&nbsp;")+"</html>");
        




            System.out.println();
            }
        

    }

}
