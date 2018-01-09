/**
 * Class block
 * x: x轴偏移格子个数
 * y: y轴偏移格子个数
 * */

class block{
    constructor(typeArr, color, borderColor, wblocks){
        this.x = Math.floor( Math.random() * cvs.width / blockW ); //[0,1,2 ... ,cols]
        this.y = -2;
        this.typeArr = typeArr;
        this.color = color;
        this.borderColor = borderColor;
        this.wblocks = wblocks || 3;
    }
    init(){
        this.x = Math.min(this.x, cols - this.wblocks );
    }
}


class typeBlock extends block{
    constructor(typeArr, color, borderColor, wblocks){
        super(typeArr, color, borderColor, wblocks);
        super.init();
    }
}
var Tb = new typeBlock([[0,1,0,0],[1,1,1,0]],'green','yellow',3);

