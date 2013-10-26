package qahweh.almostdarkness.gamelogic.piece.controller;

public interface Controller
{
    public void update();
    public boolean wantWalkWest();
    public boolean wantWalkEast();
    public boolean wantWalkNorth();
    public boolean wantWalkSouth();
}
