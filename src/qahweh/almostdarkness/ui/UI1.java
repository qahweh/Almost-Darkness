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
import java.awt.image.BufferedImage;
import javax.imageio.ImageIO;
import java.awt.*;
import javax.swing.*;
import java.io.File;

public class UI1 implements UserInterface
{
    private JFrame f;
    private JLabel out;
    private UserInterfaceCallBack cb;
    String output = "@";
    MyLabel gameCanvas;

    public void setCallBack(UserInterfaceCallBack cb)
    {
        this.cb = cb;
    }

	private class MyLabel extends JPanel
	{
		BufferedImage[] img =null;
        public String output;
		public MyLabel(BufferedImage img[], String output)
		{	
			this.img = img;
            this.output = "@";
		    setBackground(new Color(30,30,30));
		}
		
		public void paintComponent(Graphics g)		
        {
            super.paintComponent(g);
            Random r = new Random();
            Graphics2D g2d = (Graphics2D) g;
            int x=0;
            int y=0;
            for(char c : output.toCharArray())
            {
                if(c!='\n')
                {
                    if(c!=' ')g2d.drawImage(img[(int)c],x,y,null);
                    x=x+14;
                } else {x=0; y=y+19;}
            }
        }
    }

    private void setImage(BufferedImage img, BufferedImage[] n, int x, int y, char c)
    {
        n[(int)c] = new BufferedImage(14,19,img.getType());
		Graphics2D gr = n[(int)c].createGraphics();
		gr.drawImage(img,0,0,14,19,x*14,y*19,x*14+14,y*19+19,null);
        gr.dispose();
    }

    public void start()
    {
        BufferedImage img	=null;
        try
        {
            img = ImageIO.read(this.getClass().getResource("output.png"));
        }
        catch(Exception e)
        {
            e.printStackTrace();
        }

        BufferedImage[] n = new BufferedImage[256];
        n[(int)'@'] = new BufferedImage(14,19,img.getType());
        n[(int)','] = new BufferedImage(14,19,img.getType());
        n[(int)'#'] = new BufferedImage(14,19,img.getType());

        setImage(img, n,1,2,'d');
        setImage(img, n,2,1,'-');
        setImage(img, n,1,1,'|');
        setImage(img, n,2,2,'+');
        setImage(img, n,0,2,'t');
        setImage(img, n,0,1,'F');
        setImage(img, n,3,0,'.');
        setImage(img, n,0,0,'@');
        setImage(img, n,1,0,',');
        setImage(img, n,2,0,'#');

        f = new JFrame("Almost Darkness");
        f.setSize(600-38,500-35);
        f.addKeyListener(new KeyListener()
        {
            public void keyPressed(KeyEvent e){ cb.keyPressed(e.getKeyCode()); }
            public void keyReleased(KeyEvent e){}
            public void keyTyped(KeyEvent e){}
        });
        f.setVisible(true);

		gameCanvas = new MyLabel(n,output);
        f.add(gameCanvas);
        f.repaint(); 
    }

    public void draw(String string)
    {
        gameCanvas.output = string;
        gameCanvas.repaint();
        f.repaint();
    }

    public void stop()
    {
        f.dispose();
    }

}
