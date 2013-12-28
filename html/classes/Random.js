
function Random(random)
{
    this.random = random;
    this.c = 1;
};

Random.prototype.nextInt = function(x)
{
//    this.random = (parseInt( Math.abs( (Math.sin(  (((this.random) )+1))*10000)))+234)%5000; 
    this.random = Math.abs(Math.sin(this.random)*12314);
    this.c++;
    return parseInt((this.random+this.c)%x);
}
