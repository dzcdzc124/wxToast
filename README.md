# wxToast
## 介绍
可以生成100\*100px的全屏幕居中的提示框（若提示内容过多，提示框也会相应拉长），默认提图案有：勾号（成功）、感叹号（警告）、花瓣（加载中）。
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
  
  * `title`：提示内容，字符串，选填，默认`""`，超过5个中文字符长度会换行，拉长提示框长度；
  * `icon`：


## 注意事项
 
 
>
