#include <ncurses.h>
#include <iostream>
#include <string.h>
#include <cstdlib>
#include <time.h>
using namespace std;

    string matris[60][30];
    int cx = 5;
    int cy = 5;
void makedoor()
{
    while(true)
    {
        int x = 1+rand()%58;
        int y = 1+rand()%28;
        if(matris[x][y]=="-")
        {
            if(matris[x][y-1]=="." && matris[x][y+1]==".")
            {
                matris[x][y]=";";
                return;
            }
        }

        if(matris[x][y]=="|")
        {
            if(matris[x-1][y]=="." && matris[x+1][y]==".")
            {
                matris[x][y]=";";
                return;
            }
        }
    }
}

void findplayerfloorspot()
{
    while(true)
    {
        int x = 1+rand()%58;
        int y = 1+rand()%28;
        if(matris[x][y]==".")
        {
            cx=x;
            cy=y;
            return;
        }
    }
}

void makeRandomRoom(bool mustConnectButNoOverlapp)
{
    bool beenConnected = false;
    bool overlapp = false;
    int width;
    int height;
    int startx;
    int starty;
    while(!beenConnected || overlapp)
    {    
        beenConnected = false;
        overlapp = false;
        width = rand()%20+5;
        height = rand()%10+5;
        startx=rand()%(60-width);
        starty=rand()%(30-height);
        for(int x=startx; x<width+startx; x++)
        {
            for(int y=starty; y<height+starty; y++)
            {
                if(matris[x][y]=="-" || matris[x][y]=="|")beenConnected = true;
                if(matris[x][y]==".")overlapp = true;
            }
        }
        if(!mustConnectButNoOverlapp)break;
    }

    for(int x=startx; x<width+startx; x++)
    {
        for(int y=starty; y<height+starty; y++)
        {

            if(x==width-1+startx && y==height-1+starty)matris[x][y] = "+";
            else if(x==startx && y==starty)matris[x][y] = "+";
            else if(x==width-1+startx && y==starty)matris[x][y] = "+";
            else if(x==startx && y==height-1+starty)matris[x][y] = "+";
            else if(x==startx)matris[x][y] = "|";
            else if(x==width-1+startx)matris[x][y] = "|";
            else if(y==starty)matris[x][y] = "-";
            else if(y==height-1+starty)matris[x][y] = "-";
            else matris[x][y] = ".";
        }
    }


}
string player;
int main()
{
    for(int y=0; y<30; y++)
    {
        for(int x=0; x<60; x++)
        {
            matris[x][y] = " ";
        }
    }

    initscr();
    srand(time(NULL));


    makeRandomRoom(false);
    makeRandomRoom(true);
    makeRandomRoom(true);
    makeRandomRoom(true);
    makeRandomRoom(true);
    makeRandomRoom(true);
    makeRandomRoom(true);
    makeRandomRoom(true);
    makedoor();
    makedoor();
    makedoor();
    makedoor();
    makedoor();
    makedoor();
    findplayerfloorspot();

matris[5][5] = "b";
matris[7][7] = "z";
matris[6][8] = "M";
player="e";




    bool firstFrame = true;
	while(int f = ( firstFrame ? -1 : getch()))
	{
		if(f==100 && matris[cx+1][cy]==";"){matris[cx+1][cy]="."; f=-1;}
		if(f==97 && matris[cx-1][cy]==";"){matris[cx-1][cy]="."; f=-1;}
		if(f==119 && matris[cx][cy-1]==";"){matris[cx][cy-1]="."; f=-1;}
		if(f==115 && matris[cx][cy+1]==";"){matris[cx][cy+1]="."; f=-1;}       

		if(f==100 && matris[cx+1][cy]==".")cx++;
		if(f==97 && matris[cx-1][cy]==".")cx--;
		if(f==119 && matris[cx][cy-1]==".")cy--;
		if(f==115 && matris[cx][cy+1]==".")cy++;


        for(int y=0; y<20; y++)
        {
            for(int x=0; x<40; x++)
            {
                move(y,x);
                if(x+cx-20>=0 && y+cy-10>=0 && y+cy-10<30  && x+cx-20<60)
                printw(matris[x+cx-20][y+cy-10].c_str());
                else
                printw(" ");
            }
        }

        move(10,20);
        printw(player.c_str());
        move(0,0);
        firstFrame = false;
        refresh();
    }
    endwin();
}
