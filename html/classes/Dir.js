DirType = {

LEFT: 1,
RIGHT: 2,
UP: 3,
DOWN: 4

}

function DirMirror(dir)
{
    if(dir==DirType.LEFT)return DirType.RIGHT;
    if(dir==DirType.RIGHT)return DirType.LEFT;
    if(dir==DirType.UP)return DirType.DOWN;
    if(dir==DirType.DOWN)return DirType.UP;
}
