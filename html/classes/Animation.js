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
}
