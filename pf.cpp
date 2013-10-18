class PfNode
{
    public:
    int x;
    int y;
    int counter;


    public:
    PfNode(int x, int y, int counter)
    {
        this->x = x;
        this->y = y;
        this->counter = counter;
    }
};

class Pf
{

    public:
    int* dir;


    Pf(int startX, int startY, int endX, int endY)
    {
        //this->path = makeNodes(startX, startY, endX, endY);
        //step = 3;

        //this->dir[1] = 1;
    }

    int* calc(int startX, int startY, int endX, int endY)
    {
        vector<PfNode*> *path = makeNodes(startX, startY, endX, endY);
        int* dir = new int[10];
        for(int s=0; s<12; s++)
        {
            dir[s]=1+rand()%4;
        }
        return dir;
    }

    int getNextDir()
    {
        dir[0] = 1;
        return 1;
//        return dir[1];
    }

    private:
    int startX;
    int startY;
    int step;
    bool foundStart;

    vector<PfNode*>* makeNodes(int startX, int startY, int endX, int endY)
    {
        this->startX = startX;
        this->startY = startY;
        foundStart = false;
        vector<PfNode*> nodes(1,new PfNode(endX,endY,1));

        for(int l=0; l<200; l++)
        {
            int u = nodes.size();

            for(int i=0; i<u; i++)
            {
                buildAround(&nodes, i);
            }
            if(foundStart)break;
        }

        vector<PfNode*> *path = new vector<PfNode*>();


        int lastStep = -1;
        int lastX = -1;
        int lastY = -1;
        for(int i=0; i<nodes.size(); i++)
        {

            if(nodes.at(i)->x == startX && nodes.at(i)->y == startY)
            {
                lastStep = nodes.at(i)->counter;
                path->push_back(nodes.at(i));
                lastX = nodes.at(i)->x;
                lastY = nodes.at(i)->y;
            }
        }
cout << "d" << endl;
        while(lastStep>0)
        {
            cout << lastStep << endl;
            lastStep--;
            for(int i=0; i<nodes.size(); i++)
            {
                if(lastStep == nodes.at(i)->counter && isConnect(nodes.at(i),lastX,lastY))
                {
                    lastX = nodes.at(i)->x;
                    lastY = nodes.at(i)->y;
                    path->push_back(nodes.at(i)); 
                    break;
                }

            }
        }
cout << "e" << endl;
        return path;
    }

    bool isConnect(PfNode *n,int x, int y)
    {
        if(x==n->x-1 && y==n->y)return true;
        if(x==n->x+1 && y==n->y)return true;
        if(x==n->x && y==n->y-1)return true;
        if(x==n->x && y==n->y+1)return true;
        return false;
    }

    bool cordTaken(vector<PfNode*> *nodes, int x, int y, int counter)
    {
        for(int i=0; i<nodes->size(); i++)
        {
            if(nodes->at(i)->x == x && nodes->at(i)->y == y )return true;
        }
        return false;
    }

    void move(vector<PfNode*> *nodes, int i, int x, int y)
    {

        if(!cordTaken(nodes, nodes->at(i)->x+x,nodes->at(i)->y+y,nodes->at(i)->counter+1))
        {
            nodes->push_back(new PfNode(nodes->at(i)->x+x,nodes->at(i)->y+y,nodes->at(i)->counter+1));        
            if(nodes->at(i)->x+x == startX && nodes->at(i)->y+y == startY)foundStart = true;
        }
    }

    void buildAround(vector<PfNode*> *nodes, int i)
    {
        move(nodes,i,0,1);
        move(nodes,i,0,-1);
        move(nodes,i,1,0);
        move(nodes,i,-1,0);
    }

};

