
function Random(random)
{
    this.random = random;
};

Random.prototype.nextInt = function(x)
{
    this.random = ((this.random+1) * 62)%5000; 
    return this.random%x;
}
