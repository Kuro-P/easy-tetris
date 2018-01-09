/**
 * Class block
 * x: x轴偏移格子个数
 * y: y轴偏移格子个数
 * */

class block{
    constructor(renderArr, color, borderColor){
        this.x = Math.floor( Math.random() * cvs.width / blockW ); //[0,1,2 ... ,cols]
        this.y = -2;
        this.renderArr = renderArr;
        this.color = color;
        this.borderColor = borderColor;
        this.curArr = renderArr[0];
        //this.wblocks = wblocks || 3;
    }
    init(){
        this.x = Math.min(this.x, cols - this.wblocks );
        this.curArr = this.renderArr[Math.floor(Math.random() * this.renderArr.length)];
    }
}

//renderArr 里有四个数组，每个数组里存放该类型不同角度的渲染数组
//drop时 或者BLOCK到达底部时 更改gridBlocks中对应列和行的值
class typeBlocks{
    constructor(renderArr, color, borderColor){
        this.color = color;
        this.borderColor = borderColor;
        this.typeArr = renderArr;
        this.x = 0;
        this.y = -2;
        //super.init();
    }
}

class gridBlock{
    constructor(){
        this.color = '#06c';
        this.borderColor = '#9cf';
        this.value = 0;
    }
}

//var Tb = new typeBlock([[1, 1, 1, 1]],'black','pink',4);

