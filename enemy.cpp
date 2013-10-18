class Enemy
{
    private:
    Pf *pf; 

    public:
    int x;
    int y;

    Enemy()
    {
        Pf *pf = new Pf(1,1,10,10);
        x = 7;
        y = 7;
    }

    void update()
    {
        Point *p = pf->getStep();
      //  x = p->x;
      //  y = p->y;
    }

};
