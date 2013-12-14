function Human()
{
    this.x = 0;
    this.y = 0;
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
