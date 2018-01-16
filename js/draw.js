/**
 * Created by wanghe on 18/1/9.
 */

//class block { TypeArr: arr, x: 0, y: -2*blockW, vy: 10px/200ms }

var lastTime = Date.now();
var timer = null;
var gridBlocks = [];
var dead = false,
    paused = false;

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
    dead = false;
    paused = false;
    pause();
    init();
}

function pause() {

    if(paused){
        window.cancelAnimationFrame(timer);
        document.getElementById('pause').innerHTML = '继续';
    }else{
        loop();
        document.getElementById('pause').innerHTML = '暂停';
    }

}

function gameover() {
    console.log('游戏结束');
    pause();
    paused = true;

}

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

    if(judgeX(val)) {
        block.x = Math.min(Math.max(block.x + parseInt(val), 0), cols - block.wblocks);
    }

}

//顺时针旋转
function rotate(block) {
    if (!block) console.error('rotate 参数错误');
    if (curBlock.y + 1 == cols -1) return;
    var blockCache = curBlock;

    // 补丁：当前方块右边若有其他方块 不可以旋转
    if(!judgeX(1)) {
        return ;
    }

    (block.status == 3)?(block.status = 0):(++block.status);
    block.curArr = block.renderArr[block.status];
    block.wblocks = block.curArr[0].length;

    if(curBlock.x + curBlock.wblocks > cols) {
        curBlock.x = cols - curBlock.wblocks;
    }

    if(curBlock.y + curBlock.curArr.length > rows -1) {
        curBlock.y = rows - 1 - curBlock.curArr.length;
    }

    //旋转后的方块 如果[左,右]存在方块 则不旋转
    if(!judgeX(1) || !judgeX(-1)) {
        curBlock = blockCache;
    }


}

function loop() {
    timer = window.requestAnimationFrame(function () {
        var curTime = Date.now();
        drawGrid();

        if (curTime - lastTime >= 500) { //600
            translateY(curBlock, 1);
            clearRow();
            lastTime = curTime;
        }

        drawBlock(curBlock);
        if(dead == false){
            loop();
        }else{
            gameover();
        }

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
        dead = false;

    if(curBlock.y + typeArr.length >= 0) { //当方块距离画布格数为0时开始判断

        for (let i = typeArr.length - 1; i >=0 ; i--) {

            for (let j = 0; j < typeArr[i].length; j++) {
                if (typeArr[i][j] == 0) continue;
                var row = Math.max(0,curBlock.y + i + 1);
                if (gridBlocks[row][curBlock.x + j].value == 1) {

                    //若果有一列方块堆满 游戏结束
                    if(gameoverCheck()){
                        loop = false;
                        judgeY_loop = loop;
                        dead = true;
                        gameover();
                        break;
                    }

                   //触底写入记录数据
                    saveData();

                    curBlock = generate();
                    loop = false;
                    judgeY_loop = loop;
                    break;
                }

            }
            if(loop == false) break;
        }
    }
    return loop;
}

function judgeX(drec){
    var curArr = curBlock.curArr;
    var canMove = true;

    //判断左边是否有方块
    if(drec == -1){
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
                    //console.log(err);
                }
            }
        }
    }

    //判断右边是否有方块
    if(drec == 1){
        for(let i = curArr.length - 1; i>=0; i--){

            for(let j = curArr[i].length -1; j>=0; j--){
                if(curArr[i][j] == 0) continue;
                try{
                    if(gridBlocks[curBlock.y + i][curBlock.x + j +1].value == 1){

                        canMove = false;
                        break;

                    }
                }catch (err){
                    //console.log(err);
                }

            }

        }
    }


    return canMove;

}

function gameoverCheck() {
    var curArr = curBlock.curArr;
    var loop = true;
    //存储typeblock每列高度
    var maxH = new Array(curBlock.wblocks);
    for(let i=0; i<curArr.length; i++){
        for(let j=0; j<curArr[i].length; j++){
            if(!maxH[j]) maxH[j] = 0;
            if(curArr[i][j] == 1){
                maxH[j] += 1;
            }
        }
    }

    for(let i=0; i<gridBlocks.length; i++){
        for(let j=0; j<maxH.length; j++){
            if(gridBlocks[i][curBlock.x + j].value == 1){

                if(i < maxH[j]){
                    loop = false;
                    break;
                }

            }
        }
        if(loop == false) break;
    }
    //console.log(loop);
    return !loop;
}

function saveData() {
    var typeArr = curBlock.curArr;

    //触底写入记录数据
    for(let i=0; i<typeArr.length; i++) {
        for(let j=0; j<typeArr[i].length; j++){
            if (typeArr[i][j] == 0) continue;
            if(curBlock.y + i >= 0){ //防止为负超出数组索引
                gridBlocks[curBlock.y + i][curBlock.x + j] = new dataBlock(curBlock.color, curBlock.borderColor, 1);
            }
        }
    }

}

function clearRow() {
    var rowBlocks = 0;
    var needClearRows = [];

    for(let i=0; i<rows; i++){
        rowBlocks = 0;
        for(let j=0; j<cols; j++){

            if(gridBlocks[i][j].value == 0) {
                break;
            }else{
                rowBlocks++;
            }

            if(rowBlocks == cols){
                needClearRows.push(i);
                rowBlocks = 0;
            }
        }
    }
    //console.log(needClearRows);
    //清空满格行
    for(rowIdx of needClearRows){
        refresh(rowIdx);
    }

}

//刷新存储数据
function refresh(freshIdx){

    for(let i=freshIdx; i>0; i--){
        for(let j=0; j<cols; j++){
            if(i == 0){
                gridBlocks[i][j] = new dataBlock();
                break;
            }else{
                gridBlocks[i][j] = gridBlocks[i-1][j];
            }

        }
    }
}