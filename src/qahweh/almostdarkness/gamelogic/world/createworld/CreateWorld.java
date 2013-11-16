package qahweh.almostdarkness.gamelogic.world.createworld;

public interface CreateWorld
{
    public void setRandom(int r);
    public void setSize(int width, int height);
    public char[][] createAndReturnMatris();
}
