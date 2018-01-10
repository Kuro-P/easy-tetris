
/**
 * Class block
 * x: x轴偏移格子个数
 * y: y轴偏移格子个数
 * renderArr: 渲染数组(包含四种状态)
 * color: 方块填充色
 * borderColor: 方块瞄边色
 * curArr: 当前绘制使用的数组
 * wblocks: 方块横向占格数
 * status: 当前旋转状态
 *
 * */


class BaseBlock{
    constructor(renderArr, color, borderColor){
        this.x = Math.floor( Math.random() * cvs.width / blockW ); //[0,1,2 ... ,cols]
        this.y = 0;
        this.renderArr = renderArr;
        this.color = color;
        this.borderColor = borderColor;
        this.curArr = renderArr[0];
        this.wblocks = 0;
        this.status = Math.floor( Math.random() * 4 ); // [0,3]
    }
    init(){
        this.curArr = this.renderArr[this.status]; //初始化方块旋转状态
        this.wblocks = this.curArr[0].length;
        this.x = Math.min(this.x, cols - this.wblocks);
        this.y = -this.curArr.length;
    }
}

//drop时 或者BLOCK到达底部时 更改gridBlocks中对应列和行的值
class TypeBlock extends BaseBlock{
    constructor(renderArr, color, borderColor){
        super(renderArr, color, borderColor);
        super.init();
    }
}


class dataBlock{
    constructor(color, borderColor, value){
        this.color = color;
        this.borderColor = borderColor;
        this.value = value;
    }
}


//var Tb = new TypeBlock(TblockArr,'black','pink');
var curBlock = null;
var typeConfig = {
    typeI: {renderArr: IblockArr, color:'black', borderColor:'pink'},
    typeL: {renderArr: LblockArr, color:'green', borderColor:'yellow'},
    typeO: {renderArr: OblockArr, color:'orange', borderColor:'black'},
    typeT: {renderArr: TblockArr, color:'#c33', borderColor:'#ffc'},
    typeJ: {renderArr: JblockArr, color:'#fff', borderColor:'wheal'},
    typeS: {renderArr: SblockArr, color:'#9ACD32', borderColor:'#98FB98'},
    typeZ: {renderArr: ZblockArr, color:'pink', borderColor:'black'}
};