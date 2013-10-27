package qahweh.almostdarkness.ui;

public interface UserInterface
{
    public void start();
    public void stop();
    public void setCallBack(UserInterfaceCallBack cb);
    public void draw(String string);
}
