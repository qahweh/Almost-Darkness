
function Random(random)
{
    this.random = random;
    this.c = 1;
};

Random.prototype.nextInt = function(x)
{
    this.random = Math.abs(Math.sin(this.random)*12314);
    this.c++;
    var f = (this.random+this.c);
    var r = parseInt(f%x);
    if(parseInt(r)!==r)throw "None valid random value "+x+" "+f+" "+this.c+" "+this.random;
    return r;
}
