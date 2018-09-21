# wxToast
## 介绍
可以生成100\*100px的全屏幕居中的提示框（若提示内容过多，提示框也会相应拉长），自带提示图案有：勾号（成功）、感叹号（警告）、花瓣（加载中）或无（没有图案只有文字提示）。
## 使用方法
引入js和css文件
```
<link rel="stylesheet" type="text/css" href="../src/wxToast.css" />
<script src="../src/wxToast.js"></script>
```
调用方法
```
//wxToast.js会自动创建全局变量wxToast，使用时不需要new
wxToast.show([options]);
wxToast.showLoading([options]};
wxToast.hideLoading([options]};
```
方法详解：

* `wxToast.show([options]);`
弹出消息提示框，并在一定时间后自动隐藏。

  options:
  
  * `title`：`string`，提示内容，选填，默认`""`，超过5个中文字符长度会换行，拉长提示框长度；
  * `icon`：`string`，显示图标，可选值：`success`、`warning`、`loading`、`none`或`""`（与`none`效果一样），选填，默认`success`;
  * `image`：`string`，自定义图标的本地路径，`image`的优先级高于`icon`，选填；
  * `duration`：`number`，单位`ms`，提示的持续时间，选填，默认`2000`；
  * `mask`：`boolean`，是否创建透明蒙层，防止触摸穿透，选填，默认`false`；
  * `effect`：`string`，提示框隐藏时的动态效果，可选值：`default`、`fade-out`或`zoom-out`，选填，默认`default`；
  * `success`：`function`，接口调用成功的回调函数，选填；
  * `fali`：`function`，接口调用失败的回调函数，选填；
  * `complete`：`function`，接口调用结束的回调函数（调用成功、失败都会执行），选填。

* `wxToast.showLoading([options]);`
弹出loading提示框。

  options:
  
  * `title`：`string`，提示内容，选填，默认`""`，超过5个中文字符长度会换行，拉长提示框长度；
  * `mask`：`boolean`，是否创建透明蒙层，防止触摸穿透，选填，默认`false`；
  * `success`：`function`，接口调用成功的回调函数，选填；
  * `fali`：`function`，接口调用失败的回调函数，选填。
  
* `wxToast.hideLoading([options]);`
隐藏loading提示框。

  options:
  
  * `effect`：`string`，提示框隐藏时的动态效果，可选值：`default`、`fade-out`或`zoom-out`，选填，默认`default`；
  * `fali`：`function`，接口调用失败的回调函数，选填，
  * `complete`：`function`，接口调用结束的回调函数，选填。
  
## 注意事项
  * `wxToast.showLoading` 和 `wxToast.show` 同时只能显示一个
  * `wxToast.showLoading` 应与 `wxToast.hideLoadn` 配对使用
