function Human()
{
    this.x = 15;
    this.y = 10;
};

Human.prototype.moveRight = function()
{
    this.x++;
}

Human.prototype.moveLeft = function()
{
    this.x--;
}

Human.prototype.moveUp = function()
{
    this.y--;
}

Human.prototype.moveDown = function()
{
    this.y++;
}
