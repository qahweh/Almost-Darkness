#include <ncurses.h>
#include <iostream>
#include <string.h>
#include <cstdlib>
#include <time.h>
using namespace std;

    string matris[40][20];


void makeRandomRoom()
{
    int width = rand()%10+7;
    int height = rand()%10+7;
    int startx=2;
    int starty=2;

    for(int x=startx; x<width+startx; x++)
    {
        for(int y=starty; y<height+starty; y++)
        {

            if(x==width-1+startx && y==height-1+starty)matris[x][y] = " ";
            else if(x==2 && y==2)matris[x][y] = " ";
            else if(x==width-1+startx && y==2)matris[x][y] = " ";
            else if(x==2 && y==height-1+startx)matris[x][y] = " ";
            else if(x==2)matris[x][y] = "|";
            else if(x==width-1+startx)matris[x][y] = "|";
            else if(y==2)matris[x][y] = "=";
            else if(y==height-1+starty)matris[x][y] = "=";
            else matris[x][y] = ".";
        }
    }


}
string player;
int main()
{


    for(int y=0; y<20; y++)
    {
        for(int x=0; x<40; x++)
        {
            matris[x][y] = " ";
        }
    }

    initscr();
    srand(time(NULL));


    makeRandomRoom();

matris[5][5] = "b";
matris[7][7] = "z";
matris[6][8] = "M";
player="e";
    int cx = 4;
    int cy = 4;
    bool firstFrame = true;
	while(int f = ( firstFrame ? -1 : getch()))
	{
		if(f==100 && matris[cx+1][cy]==".")cx++;
		if(f==97 && matris[cx-1][cy]==".")cx--;
		if(f==119 && matris[cx][cy-1]==".")cy--;
		if(f==115 && matris[cx][cy+1]==".")cy++;
        

        for(int y=0; y<20; y++)
        {
            for(int x=0; x<40; x++)
            {
                move(y,x);
                printw(matris[x][y].c_str());
            }
        }

        move(cy,cx);
        printw(player.c_str());
        move(0,0);
        firstFrame = false;
        refresh();
    }
    endwin();
}
