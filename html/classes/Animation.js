function Animation(type)
{
    this.images = new Array();
    if(type==1) // fish man
    {
        this.images.push(new Point( 1,  10));
        this.images.push(new Point( 0,  10));
        this.images.push(new Point( 9,  10));
        this.images.push(new Point( 3,  10));
        this.images.push(new Point( 4,  10));
        this.images.push(new Point( 5,  10));
        this.images.push(new Point( 6,  10));
        this.images.push(new Point( 7,  10));
        this.images.push(new Point( 8,  10));
        this.images.push(new Point( 2,  10));
        this.images.push(new Point( 10, 10));
    }
    if(type==2) // human
    {
        this.images.push(new Point(1,11));
        this.images.push(new Point(0,11));
        this.images.push(new Point(9,11));
        this.images.push(new Point(3,11));
        this.images.push(new Point(0,4));
        this.images.push(new Point(5,11));
        this.images.push(new Point(6,11));
        this.images.push(new Point(7,11));
        this.images.push(new Point(8,11));
        this.images.push(new Point(2,11));
        this.images.push(new Point(10,11));
    }
    if(type==3) // human not carry item
    {
        this.images.push(new Point(1,5));
        this.images.push(new Point(0,5));
        this.images.push(new Point(3,5));
        this.images.push(new Point(0,0));
        this.images.push(new Point(0,4));
        this.images.push(new Point(0,6));
        this.images.push(new Point(1,6));
        this.images.push(new Point(2,6));
        this.images.push(new Point(3,6));
        this.images.push(new Point(2,5));
        this.images.push(new Point(4,5));
    }
    if(type==4) // fish man lv2
    {
        this.images.push(new Point( 1,  12));
        this.images.push(new Point( 0,  12));
        this.images.push(new Point( 9,  12));
        this.images.push(new Point( 3,  12));
        this.images.push(new Point( 4,  12));
        this.images.push(new Point( 5,  12));
        this.images.push(new Point( 6,  12));
        this.images.push(new Point( 7,  12));
        this.images.push(new Point( 8,  12));
        this.images.push(new Point( 2,  12));
        this.images.push(new Point( 10, 12));
    }
    if(type==5) // fish man frozen
    {
        this.images.push(new Point( 1,  13));
        this.images.push(new Point( 0,  13));
        this.images.push(new Point( 9,  13));
        this.images.push(new Point( 3,  13));
        this.images.push(new Point( 4,  13));
        this.images.push(new Point( 5,  13));
        this.images.push(new Point( 6,  13));
        this.images.push(new Point( 7,  13));
        this.images.push(new Point( 8,  13));
        this.images.push(new Point( 2,  13));
        this.images.push(new Point( 10, 13));
    }
    if(type==6) // fish man poison
    {
        this.images.push(new Point( 1,  14));
        this.images.push(new Point( 0,  14));
        this.images.push(new Point( 9,  14));
        this.images.push(new Point( 3,  14));
        this.images.push(new Point( 4,  14));
        this.images.push(new Point( 5,  14));
        this.images.push(new Point( 6,  14));
        this.images.push(new Point( 7,  14));
        this.images.push(new Point( 8,  14));
        this.images.push(new Point( 2,  14));
        this.images.push(new Point( 10, 14));
    }

}
