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
