var leftBtn = document.getElementById("left"),
    rightBtn = document.getElementById("right"),
    downBtn = document.getElementById('down');

var dropBtn = document.getElementById('drop')

leftBtn.addEventListener('click', function () {
    translateX(Tb, -1);
}, false);

rightBtn.addEventListener('click', function () {
    translateX(Tb, 1);
}, false);

downBtn.addEventListener('click', function () {
    translateY(Tb, 1);
}, false);

dropBtn.addEventListener('click', function () {
    translateY(Tb, cols);
}, false);