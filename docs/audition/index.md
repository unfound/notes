# 面试相关

## 需要复习的知识点

- 缓存
- vue相关的
  - 双向绑定原理
  - 编译过程
  - diff算法
- 设计模式
- Promise实现原理
  - 请求队列的实现
- 流行技术或者技术趋势
  - 微前端
  - PWA
- SPA如何实现

## 设计模式

### 设计模式原则

- 单一职责：一个类只负责一项职责
- 里氏替换：子类可以扩展父类的方法，但不能改变父类原有的功能
- 依赖倒置：面向接口编程，模块应该依赖于抽象而不依赖其具体实现
- 接口隔离：保持接口的单一独立，而不是臃肿的接口
- 迪米特：一个对象应该对其他对象保持最少的了解，也就是低耦合
- 开闭原则：对扩展开放，对修改封闭

### 设计模式三大类

- 创建型：工厂模式、抽象工厂模式、建造者模式、单例模式、原型模式
- 结构型：适配器模式、装饰器模式、代理模式、外观模式、桥接模式、组合模式、享元模式
- 行为型：策略模式、模板方法模式、发布订阅模式、迭代器模式、职责链模式、命令模式、备忘录模式、状态模式、访问者模式、中介者模式、解释器模式

> 先记住 工厂模式、抽象工厂模式、单例模式、适配器模式、装饰器模式、代理模式、发布订阅者模式

## Vue

### vue初始化流程

初始化vue的环境，然后编译模板，执行setup，获取组件update函数，然后放入ReactiveEffect中执行以收集依赖，最后渲染dom。
当组件状态变更时，会将对应的Dep中的更新函数（包括update函数）放入一个异步更新队列中（会有去重和重排等操作）并在nextTick后执行。（所以也就不会出现重复更新的问题）得到虚拟dom后进行diff操作，再patch到真实dom上

### Vue3性能提升

- 响应式系统升级，由原本的defineProperty换成Proxy
  - 性能更好？好像不是，但作为新标准会不断优化
  - 更多更细粒度的控制
  - 不需要遍历每个属性，有“懒加载”的特性，读取到的时候才会进行处理
  - 可以动态监听新增删除属性等，数组的索引修改和length修改也可以监听到
- 编译优化
  - fragment片段可以减少dom的嵌套深度
  - 静态节点的标记和声明提升（对于静态节点来说，会在render函数之外提前创建实例，后续更新用的都是同一个dom实例）
  - 动态节点使用patch_flag来标记节点，更快的patch
  - 事件优化，简单来说就是缓存事件，避免重复创建
  - block优化，配合patch_flag将动态节点收集到dynamicChildren上提供更快的patch
- 源码体积优化
  - 移除部分不常用API
  - 对Tree-shaking更友好

## 网络协议优化

### HTTP1.1的性能问题

![HTTP1.1性能问题](../assets/images/HTTP1.1%E6%80%A7%E8%83%BD%E9%97%AE%E9%A2%98.jpg)

- 单链路串行
  - 效率低下
- 头部未压缩
  - 冗余
  - 上下行带宽不对称
  - 头部平均大小超过1500B
- ASCII明文
  - 解析慢

![HTTP1.1优化](../assets/images/HTTP1.1%E4%BC%98%E5%8C%96.jpg)

- 增加并发连接数量
  - 单域名多TCP连接
  - 域名分片
- 减少请求数量
  - 缓存、CSS Sprite、 data uri、图片内联、合并资源等

## 浏览器缓存

浏览器缓存分为强缓存和协商缓存

- Expires 是HTTP/1.0的产物，受限于本地时间
- Cache-Control 是HTTP/1.1最主要的缓存控制规则
- Last-Modified（响应） 和 If-Modified-Since（请求）根据文件修改时间来判断是否使用缓存
  - 保存时间以s为单位，1s内多次修改无法捕捉到
  - 各机器读取到的时间不一致，可能会有误差（？无法理解
- Etag（响应）和 If-None-Match（请求）Etag使用资源的唯一识别码（MD5码等）来判断是否使用缓存

Cache-Control的字段含义
|指令|作用|
|--|--|
|public|表示响应可以被客户端和代理服务器缓存|
|private|表示响应只能被客户端缓存|
|no-store|不缓存|
|no-cache|缓存资源，但立即失效，直接走协商缓存|
|max-age=30|缓存30秒后就过期，需要重新请求|
|s-maxage=30|覆盖max-age，作用一样， 只在代理服务器中生效|
|max-stale=30|30秒内，即使缓存过期，也使用该缓存|
|min-fresh=30|30秒内，获取最新的响应|


## JSBridge

native -> web
- 相当于webview充当js解释器，可直接执行js代码拼接的字符串 -> 只要全局（window）挂上对应方法就可调用

web -> native
- 拦截弹窗
- 拦截schema，自定义类URL请求，格式如```<protocol>://<host>/<path>?<qeury>#fragment```, 比如，jsbridge://showToast?text=hello
  - a便签 （需要用户操作？click执行下不就行了）
  - location.href （可能会引起跳转）
  - iframe.src （常用）
  - ajax  （安卓无拦截方法）
- API注入
  - window.jsbridge.call() 安卓可以直接注入一个对象然后直接调用方法
  - window.webkit.messageHandlers.call.postMessage() WKWebview使用这种形式，UIWebview可以使用JavaScriptCore来注入全局自定义对象

## 其他跨端方案

- Weex （感觉已经无了）
- React Native
  - 通过js core来运行js，通过brige来进行通讯（json），将虚拟dom映射成移动端UI
  - 还是需要双端的知识
- Flutter （已经成为新星，甚至已经支持开发windows应用）
  - 自己实现渲染引擎（skia）
  - 使用Dart开发，编译成机器码
- Kotlin （好像偏向编译器？有兴趣再看看吧）