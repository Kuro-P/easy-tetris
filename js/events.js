var leftBtn = document.getElementById("left"),
    rightBtn = document.getElementById("right"),
    downBtn = document.getElementById('down');

var dropBtn = document.getElementById('drop'),
    rotateBtn = document.getElementById('rotate');

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
    translateY(curBlock, rows - curBlock.curArr.length - curBlock.y);
}, false);

rotateBtn.addEventListener('click', function () {
    rotate(curBlock);
}, false);