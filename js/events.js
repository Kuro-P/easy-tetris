var leftBtn = document.getElementById("left"),
    rightBtn = document.getElementById("right"),
    downBtn = document.getElementById('down');

var dropBtn = document.getElementById('drop'),
    rotateBtn = document.getElementById('rotate');

var restartBtn = document.getElementById('restart'),
    pauseBtn = document.getElementById('pause');

leftBtn.addEventListener('click', function () {
    translateX(curBlock, -1);
}, false);

rightBtn.addEventListener('click', function () {
    translateX(curBlock, 1);
}, false);

downBtn.addEventListener('click', function () {
    translateY(curBlock, 1);
}, false);

dropBtn.addEventListener('click', function () {

    for(let i=0; i<rows - curBlock.curArr.length; i++) {
        if(judgeY_loop == false){
            judgeY_loop = true;
            break;
        }
        translateY(curBlock, 1);
    }

}, false);

rotateBtn.addEventListener('click', function () {
    rotate(curBlock);
}, false);

pauseBtn.addEventListener('click', function () {
    pause();
}, false);

//增加方向键事件
window.addEventListener('keydown', function (e) {

    if(e.keyCode == 37) { //left
        leftBtn.click();
    }

    if(e.keyCode == 38) { // up
        return ;
    }

    if(e.keyCode == 39) { //right
        rightBtn.click();
    }

    if(e.keyCode == 40) { //down
        downBtn.click();
    }

    if(e.keyCode == 13) { //drop(enter)
        dropBtn.click();
    }

    if(e.keyCode == 32) { //rotate(space)
        rotateBtn.click();
    }
});

restartBtn.addEventListener('click', function (e) {
    var answer = confirm('确定重新开始游戏？');
    if(answer == true){
        restart();
    }
});
