function PieceFactory()
{
    this.move = function(dx,dy)
    {
        var t = this.currentRoom.getTile( parseInt(  ((this.x2+dx)/28)) ,parseInt((this.y2+dy)/38), this.ignoreTileCollision );
        var p = this.currentRoom.getPiece2( this.x2+dx, this.y2+dy, this, this.ignorePieceCollision, ( this.getHeight ? this.getHeight() : 0), ( this.getTall ? this.getTall() : 0) );
        var b = false;
        if(p != null) b = this.collisionEvent(p);
        if(t != null) this.collisionEvent(t);
        if(!b){ this.x2 += dx; this.y2 += dy; }
    }

    this.remove = function()
    {
       this.currentRoom = null;
       //TODO: remove from piece list as well
    }

}
