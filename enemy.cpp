class Enemy
{
    private:
    Pf *pf; 
    int step;

    public:
    int x;
    int y;
    int* walkList;

    Enemy()
    {
       // Pf *pf = new Pf(1,1,10,10);
        x = 7;
        y = 7;
        step = 0;
    }

    void update()
    {
        if(walkList[step]==1) this->x++;
        if(walkList[step]==2) this->x--;
        if(walkList[step]==3) this->y++;
        if(walkList[step]==4) this->y--;
        step++;
    }

};
