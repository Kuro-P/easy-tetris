/**
 * Created by wanghe on 18/1/9.
 */

//class block { TypeArr: arr, x: 0, y: -2*blockW, vy: 10px/200ms }

var lastTime = Date.now();
var timer = null;
var gridBlocks = [];
init();
loop();


function init() {
    //ctx.beginPath();
    gridBlocks = [];
    //初始化背景数组
    for (var i = 0; i < rows + 1; i++) {
        gridBlocks.push([]);
        for (var j = 0; j < cols; j++) {
            if(i == rows) {
                gridBlocks[i].push(new dataBlock("#06c", '#9cf', 1));
            } else {
                gridBlocks[i].push(new dataBlock("#06c", '#9cf', 0));
            }
        }
    }

    curBlock = generate();
    drawGrid();

    drawBlock(curBlock);
    //ctx.closePath();
}

function restart() {
    init();
}

/*function drawBg() {
    ctx.fillStyle = "#06c";
    ctx.fillRect(0, 0, cvs.width, cvs.height);
}*/

//画typeBlock
function drawBlock(block) {
    var typeArr = block.curArr;

    for (var i = 0; i < typeArr.length; i++) {

        for (var j = 0; j < typeArr[i].length; j++) {

            if (typeArr[i][j] == 0) continue;
            ctx.moveTo(blockW, blockW);
            ctx.fillStyle = block.color; //#c33
            ctx.fillRect((block.x + j) * blockW, (block.y + i) * blockW, blockW, blockW);
            ctx.strokeStyle = block.borderColor; //进行描边 #ffc
            ctx.lineWidth = 2;
            ctx.strokeRect((block.x + j) * blockW, (block.y + i) * blockW, blockW, blockW);

        }
    }
}

function drawGrid() {

    for (var i = 0; i < gridBlocks.length; i++) {
        for (var j = 0; j < gridBlocks[i].length; j++) {
           // ctx.moveTo(0, 0);
            ctx.fillStyle = gridBlocks[i][j].color;
            ctx.fillRect(j * blockW, i * blockW, blockW, blockW);
            ctx.strokeStyle = gridBlocks[i][j].borderColor;
            ctx.lineWidth = 1;
            ctx.strokeRect(j * blockW, i * blockW, blockW, blockW);
        }
    }

}

function translateY(block, val) {
    if (!block || !val) console.error('translateY 参数错误');
    if(judgeY()){
        block.y = block.y + parseInt(val);
    }

}

function translateX(block, val) {
    if (!block || !val) console.error('translateX 参数错误');

    if(judgeX()) {
        block.x = Math.min(Math.max(block.x + parseInt(val), 0), cols - block.wblocks);
    }

}

//顺时针旋转
function rotate(block) {
    if (!block) console.error('rotate 参数错误');

    (block.status == 3)?(block.status = 0):(++block.status);
    block.curArr = block.renderArr[block.status];
    block.wblocks = block.curArr[0].length;

    if(curBlock.x + block.wblocks > cols) {
        curBlock.x = cols - block.wblocks;
    }
}

function loop() {
    timer = window.requestAnimationFrame(function () {
        var curTime = Date.now();
        drawGrid();

        if (curTime - lastTime >= 500) { //600
            translateY(curBlock, 1);
            //judgeY();
            lastTime = curTime;
        }

        drawBlock(curBlock);

        loop();
    })
}

function generate(){
    var keys = Object.keys(typeConfig);
    var idx = Math.floor(Math.random() * keys.length);
    var { renderArr, color, borderColor } = typeConfig[keys[idx]]; //获取到随机生成的block的型号参数配置
    return new TypeBlock(renderArr, color, borderColor); //返回新随机生成的block对象

}

var judgeY_loop = true;
//触底判断
function judgeY(){
    var typeArr = curBlock.curArr;

    var loop = true;

    if(curBlock.y>=0) {

        for (let i = typeArr.length - 1; i >=0 ; i--) {
            if(loop == false) break;
            for (let j = 0; j < typeArr[i].length; j++) {
                if (typeArr[i][j] == 0) continue;
                //console.log(curBlock.y + i);
                //console.log('value:',gridBlocks[curBlock.y + i+1][curBlock.x + j].value);
                if (gridBlocks[curBlock.y + i + 1][curBlock.x + j].value == 1) {

                    for(let i=0; i<typeArr.length; i++) {
                        for(let j=0; j<typeArr[i].length; j++){
                            if (typeArr[i][j] == 0) continue;
                            //console.log(curBlock.y + i);
                            gridBlocks[curBlock.y + i][curBlock.x + j] = new dataBlock(curBlock.color, curBlock.borderColor, 1);
                        }
                    }

                    curBlock = generate();
                    loop = false;
                    judgeY_loop = loop;
                    break;
                }

            }
        }
    }

    return loop;
}

function judgeX(){
    var curArr = curBlock.curArr;
    var canMove = true;
    //判断左边是否有方块
    for(let i = curArr.length - 1; i>=0; i--){

        if(!canMove) break;

        for(let j = 0; j<curArr[i].length; j++){
            if(curArr[i][j] == 0) continue;
            try{
                if(gridBlocks[curBlock.y + i][curBlock.x + j -1].value == 1){

                    canMove = false;
                    break;

                }
            }catch (err){
                console.log(err);
            }

        }
    }

    return canMove;

}