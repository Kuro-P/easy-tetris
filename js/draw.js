/**
 * Created by wanghe on 18/1/9.
 */

var Iblock = [[0, 0, 0, 0], [1, 1, 1, 1]],
    Lblock = [[1, 0, 0, 0], [1, 1, 1, 0]],
    Tblock = [[0, 1, 0, 0], [1, 1, 1, 0]],
    Zblock = [[1, 1, 0, 0], [0, 1, 1, 0]],
    Sblock = [[0, 1, 1, 0], [1, 1, 0, 0]],
    Oblock = [[1, 1, 0, 0], [1, 1, 0, 0]];

//class block { TypeArr: arr, x: 0, y: -2*blockW, vy: 10px/200ms }

var lastTime = Date.now();
var gridBlocks = [];
init();
//loop();


function init() {
    //ctx.beginPath();

    //初始化背景数组
    for (var i = 0; i < rows; i++) {
        gridBlocks.push([]);
        for (var j = 0; j < cols; j++) {
            gridBlocks[i].push(new gridBlock());
        }
    }

    drawGrid();
    //drawBlock(Tb);
    //ctx.closePath();
}


/*function drawBg() {
    ctx.fillStyle = "#06c";
    ctx.fillRect(0, 0, cvs.width, cvs.height);
}*/

function drawBlock(block) {
    var typeArr = block.typeArr;

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

    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            ctx.moveTo(0, 0);
            ctx.fillStyle = "#06c";
            ctx.fillRect(j * blockW, i * blockW, blockW, blockW); //填充
            ctx.strokeStyle = gridBlocks[i][j].borderColor;
            ctx.lineWidth = 1;
            ctx.strokeRect(j * blockW, i * blockW, blockW, blockW); //描边
        }
    }

}

function translateY(block, val) {
    if (!val) console.error('translateY 参数错误');

    block.y = Math.min(block.y + Math.abs(val), cols - block.typeArr.length +1);
}

function translateX(block, val) {
    if (!val) console.error('translateX 参数错误');

    var val = parseInt(val);
    block.x = Math.min(Math.max(block.x + val, 0), cols - block.wblocks);
}

function loop() {
    window.requestAnimationFrame(function () {
        var curTime = Date.now();
        drawBg();
        drawGrid();

        if (curTime - lastTime >= 600) {
            translateY(Tb, 1);
            lastTime = curTime;
        }

        drawBlock(Tb);

        loop();
    })
}
