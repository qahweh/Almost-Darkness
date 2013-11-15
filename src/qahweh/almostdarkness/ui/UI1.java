package qahweh.almostdarkness.ui;

import java.util.ArrayList;
import java.util.Random;
import java.awt.Point;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.JLabel;
import java.awt.event.KeyListener;
import java.awt.event.KeyEvent;
import java.awt.Font;
import java.awt.Color;

public class UI1 implements UserInterface
{
    private JFrame f;
    private JLabel out;
    private UserInterfaceCallBack cb;

    public UI1()
    {
    }

    public void setCallBack(UserInterfaceCallBack cb)
    {
        this.cb = cb;
    }

    public void start()
    {
        f = new JFrame("Almost Darkness");
        f.setSize(597,390);
        f.addKeyListener(new KeyListener()
        {
            public void keyPressed(KeyEvent e){ cb.keyPressed(e.getKeyCode()); }
            public void keyReleased(KeyEvent e){}
            public void keyTyped(KeyEvent e){}
        });
        f.setVisible(true);
        out = new JLabel();
        out.setFont(new Font("Courier New",Font.PLAIN,12));
        f.add(new JPanel().add(out));
    }

    public void draw(String string)
    {
        string = string.replace(" ","&nbsp;");
        string = string.replace("t","<font color=#573700 bgcolor=BLACK><b>t</b></font>");
        string = string.replace("+","<font color=RED bgcolor=BLACK>+</font>");
        string = string.replace(",","<font color=#6b4400 bgcolor=BLACK>,</font>");
        string = string.replace("@","<font color=#1fc8ba bgcolor=BLACK><b>@</b></font>");

        String html = "<html><font color=WHITE bgcolor=BLACK>"+string+"</font></html>";
        html = html.replace("\n","<br>");
        f.setBackground(Color.BLACK);
        out.setText(html);
        f.repaint();
    }

    public void stop()
    {
        f.dispose();
    }

}
