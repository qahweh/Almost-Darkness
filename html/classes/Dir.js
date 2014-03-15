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

function DirGetDirByRandom(random)
{
    random = typeof random !=='undefined' ? random : false;
    if(random===false)
    {
        return parseInt(Math.random()*4)+1;
    }
    else
    {
        return random.nextInt(4)+1;
    }
}
