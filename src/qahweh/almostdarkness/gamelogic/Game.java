package qahweh.almostdarkness.gamelogic;


public class Game
{
    private GameCallBack cb;
    public int loop;

    public void setCallBack(GameCallBack cb)
    {
        this.cb = cb;
    }

    public void start() throws Exception
    {
        int f = 0;
        while(true)
        {
            f++;
            loop = f;
            Thread.sleep(100);
            cb.refresh(this);
        }

    }
}
