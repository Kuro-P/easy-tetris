Tetirs-JS简易版俄罗斯方块
==========
前言：这版俄罗斯方块的实现思路没有参照其他大神的代码，所以难免有纰漏和不完美的地方。若好的建议，还请多多提出，感激不尽。

基本实现过程
----------
* __在canvas画布中画出格子背景__
* __实现不同形状的俄罗斯方块__<br/>
    以L型方块为例（以下都是）：![](/preview/L_block.jpg "L型")
    ````javascript
    var Lblock = [[1,0,0],[1,1,1]];
* __实现不同（顺时针旋转）状态的俄罗斯方块__<br/>
    每个形状的俄罗斯方块都有四个状态，通过旋转更改状态
    `````javascript
    var LblockArr = [
    [[1, 0, 0],[1, 1, 1]],
    [[1, 1],[1, 0],[1, 0]],
    [[1, 1, 1],[0, 0, 1]],
    [[0, 1],[0, 1],[1, 1]]
    ];
* __当前移动的方块的状态的记录__<br/>
    俄罗斯方块类的基本参数
  <table>
  <thead>
    <tr><th>key</th><th>comment</th></tr>
  </thead> 
  <tbody>
    <tr><td>x</td><td>x轴偏移格子个数</td></tr>
    <tr><td>y</td><td>y轴偏移格子个数</td></tr>
    <tr><td>renderArr</td><td>渲染数组(包含四种状态)</td></tr>
    <tr><td>color</td><td>方块填充色</td></tr>
    <tr><td>borderColor</td><td>方块瞄边色</td></tr>
    <tr><td>curArr</td><td>当前绘制使用的数组</td></tr>
    <tr><td>wblocks</td><td>方块横向占格数</td></tr>
    <tr><td>status</td><td>当前旋转状态</td></tr>
  </tbody>
  </table>

* __增加事件监听、按键行为__
* __规则判定函数的编写__
* __不再下降的方块的位置记录__<br/>
    用一个与canvas画布背景格数相同的数组来存储状态，每个格子存储1/0（有无方块）及颜色信息。方块下方有方块/碰底时触发数据存储。
* __界面优化__
    当前文件中预览状态如下：<br/>
    <img src="/preview/basic.jpg" alt="基本状态" width="300"><br/><br/>
    预览地址：
    后来在<del>初学微信小程序</del>（交作业）时，顺便优化了下样式：<br/>
    <img src="/preview/inWX.gif" alt="微信小程序" width="300"><br/>
 
    
  
