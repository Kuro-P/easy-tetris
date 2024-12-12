# easy-tetris 简易版俄罗斯方块
学校课设作业：写一个微信小程序的游戏。
因为没有用到微信权限相关的 api，所以相当于一个全前端的 html/css/js 项目了。想在小程序中运行的话只需要加载这些代码到小程序环境中即可。

## 整体思路

* 在canvas画布中画出格子背景
* 实现不同形状的俄罗斯方块
    以L型方块为例（以下都是）：![](/preview/L_block.jpg "L型")
    ````javascript
    var Lblock = [[1,0,0],[1,1,1]];
* 实现不同（顺时针旋转）状态的俄罗斯方块
    每个形状的俄罗斯方块都有四个状态，通过旋转更改状态
    `````javascript
    var LblockArr = [
    [[1, 0, 0],[1, 1, 1]],
    [[1, 1],[1, 0],[1, 0]],
    [[1, 1, 1],[0, 0, 1]],
    [[0, 1],[0, 1],[1, 1]]
    ];
* 当前移动的方块的状态的记录
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

* 增加事件监听、按键行为
* 规则判定函数的编写
* 不再下降的方块的位置记录
    用一个与canvas画布背景格数相同的数组来存储状态，每个格子存储1/0（有无方块）及颜色信息。方块下方有方块/碰底时触发数据存储。
* 界面优化
 
## 预览
预览地址：https://kuro-p.github.io/easy-tetris/index.html

<img src="/preview/inWX.gif" alt="首页" width="300"><br/>


    
 
    
  
