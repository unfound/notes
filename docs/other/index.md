# 其他

## Cookie

不管是XMLHttpRequest还是axios都无法通过设置请求头来设置cookie，cookie是由浏览器来自动填充的，可以通过以下设置来跨域携带cookie

```js
// xhr
xhr.withCredentials = true
// 或者好像下面这样设置后就可以通过设置请求头来设置cookie
xhr.setDisableHeaderCheck(true)

// axios可以配置
axios.defaults.withCredentials = true

```

> 可以通过[js-cookie](https://github.com/js-cookie/js-cookie)来便捷操作document.cookie

## 设计一个SPA

> 如何来设计一个SPA？或者说设计系统架构？应该是有某种方法论的。目前我还不清楚，后续或许需要详细了解这部分知识。

### 需求分析

首先进行需求分析，我们为什么需要SPA？以及需要实现哪些功能点？如何实现？

首先SPA的好处有：
- 前后端分离
- 减轻服务器压力
- 提升用户体验

那么我们需要实现哪些功能点？如何实现？
- 能在前端进行页面跳转的路由功能
  - 有两种方案：基于 History API 和 Hash 来实现
  - History API 主要是基于 pushState 和 onpopstate事件 来实现
  - Hash 主要是基于 hashchange 来监听 location.hash 变化