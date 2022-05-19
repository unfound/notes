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

### Vue初始化流程

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

### Vue diff原理

Vue2.x版本的diff原理 -- 双端比较
- 新旧列表前后各一个指针进行相互对比
- newStart分别与oldStart和oldEnd进行对比，同理newEnd分别与oldStart和oldEnd进行对比
- 以newStart为例
  - 如果与oldStart相同，则直接patch并且两个指针都后移
  - 如果与oldEnd相同，则patch后要进行节点的移动，将该节点移到oldStart前，newStart++，oldEnd--
- 如果全部不同的话
  - 创建旧节点的map，key是节点的key，未定义的话则是index，value是下标
  - 从map中寻找newStart所对应的节点
    - 找到了，就patch后，将节点移动到oldStart前，并且把旧节点位置的值置为undefined
    - 没找到，就创建新节点插入到oldStart前
    - newStart++
- 剩下新队列，创建所有节点插入newEnd + 1节点之前
- 剩下旧队列，直接删除

Vue3版本的diff原理 -- 最长递增子序列
- 比较新旧队列的起始节点
  - 相同则 patch 后 i++
  - 不同则break
- 比较新旧队列的结束节点
  - 相同则 patch 后 e1-- e2--
  - 不同则break
- 如果就旧队列遍历完且新队列还有的话（i > e1 && i <= e2），插入新节点
- 如果就新队列遍历完且就队列还有的话（i > e2 && i <= e1），删除旧节点
- 如果两个队列都未遍历完的话
  - 创建新节点map，key是节点的key，value是i
  - 记录新队列剩余节点toBePatched，初始化已patch节点数patched = 0，最大下标maxNewIndexSoFar，以及一个长度为newIndexToOldIndexMap的数组值为0
  - 遍历旧队列
    - 如果新队列节点已经全部patch的话（patched >= toBePatched）,则删除所有剩余节点
    - 获取对应的新节点下标（有key的话直接map里取，没有的话遍历新队列）
      - 取不到就删除
      - 取到的话
        - 记录新节点对应旧节点位置newIndexToOldIndexMap[newIndex - s2] = i + 1
        - 如果大于maxNewIndexSoFar，则记录，否则标记该次patch需要移动操作
        - 最后patch
        - patched++
  - 如果需要移动的话，则求出最长递增子序列
  - 从后向前遍历新队列
    - 如果对应的旧节点不存在（newIndexToOldIndexMap[i] === 0），则创建节点
    - 需要移动的话，判断下标是否在最长递增子序列中
      - 在则不动
      - 不在则移动，如果后面没有节点则移动到末尾，有节点则移动到该节点前

## HTTP(S)

### HTTP头

请求头
- Cookie
- User-Agent
- Accept
- Accept-Language
- Accept-Encoding
- Connection
- Referer
- If-Modify-Since
- If-None-Match

响应头
- Set-Cookie
- Content-Type
- Connection
- Date
- Expire
- Cache-Control
- Last-Modified
- Etag

### 状态码

- 2xx 成功
  - 200 成功
  - 204 无返回实体
  - 206 返回部分实体
- 3xx 重定向
  - 301 永久性重定向
  - 302 临时性重定向
  - 303 和302类似，当需要使用GET获取资源
  - 304 资源未变更，使用缓存
- 4xx 客户端错误
  - 400 请求报文有语法错误，一般参数错误会报400
  - 401 未认证，未登录或者cookie过期返回
  - 403 无权限访问
  - 404 服务器没有找到该资源
- 5xx 服务端错误
  - 500 服务器出错
  - 503 服务器超负荷或维护中

### HTTPS连接过程

- 客户端发起请求（包含客户端支持的TLS，支持的加解密算法等）
- 服务端接受请求并返回证书（包含证书颁发机构、使用机构、公钥、有效期、签名算法、签名hash算法、指纹算法、指纹）
- 客户端验证证书
  - 验证合法，则生成随机数，用随机数加密握手信息，并计算握手信息的hash值，然后公钥加密随机数
  - 传输加密后的随机数、握手信息、握手信息hash值
- 服务端用私钥解密随机数，再用随机数解密握手信息，验证信息并用随机数加密数据返回给客户端
- 客户端解密数据
- SSL加密建立

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

### HTTP2.0

- 二进制分帧
  - 将传输信息分割为更小的消息和帧，并采用二进制编码进行封装
  - header封装在Headers帧中，request body封装在Data帧中
- 多路复用/连接共享
  - 因为有了分帧机制后，就可以乱序，或者按照优先级来发送，最后在另一端将其组合起来
- 头部压缩
  - 双端缓存头部字段表，下次发送只要发送key就行了
  - HPACK算法压缩，值会用霍夫曼编码
- 服务端推送
- 请求优先级

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

### 其他跨端方案

- Weex （感觉已经无了）
- React Native
  - 通过js core来运行js，通过brige来进行通讯（json），将虚拟dom映射成移动端UI
  - 还是需要双端的知识
- Flutter （已经成为新星，甚至已经支持开发windows应用）
  - 自己实现渲染引擎（skia）
  - 使用Dart开发，编译成机器码
- Kotlin （好像偏向编译器？有兴趣再看看吧）

## 性能优化

- 图片优化
  - 使用更小的图片格式如webp，svg等
  - 小图片转base64或者雪碧图
  - 懒加载
- 代码分割、按需加载
- 使用缓存、CDN等优化加载速度
- 节流防抖等优化性能
- requestAnimationFrame来优化动画效果
- web workers优化计算
- 开启gzip压缩

## Webpack

### loader和plugin的区别

loader主要是用来处理特定类型的文件，进行转换的功能模块。
plugin则可以通过webpack提供的各种钩子实现更多样化的功能，如，注入环境变量，打包优化，资源管理等。

常用loader
- babel-loader
- ts-loader
- vue-loader
- css-loader
- style-loader
- less-loader

常用的plugin
- eslint相关
- 生成HTML的
- 压缩代码
- 移动文件
- 分割代码
- 缓存

## Vite

### Vite为什么快

- 得益于浏览器原生支持ES模块，所以vite无需遍历全部依赖模块，只需要处理url
- 区分依赖和源码
  - 使用esbuild对依赖进行预构建，并强缓存（依赖版本变化会刷新，如果更改依赖则需要清除浏览器缓存）
  - 以原生esm方式提供源码，让浏览器接管打包的部分工作，并动态导入代码
- 更快的HMR
- 为什么仍然需要打包？为了更优的性能
  - 合并模块
  - 代码分割和懒加载
  - tree-shaking

### 迁移vite主要做了哪些工作

- 调研可行性和难度
- 渐进式升级：开发环境使用vite；生成环境仍然使用webpack
- commonjs模块的引入方式更改为ES模块标准
- 设置vite的入口文件（vite的入口是HTML）
- 批量导入冲突，自己编写vite插件解决
- 对于绝对路径的图片处理（webpack不处理，vite会处理，通过设置alias来兼容）
- .vue扩展不支持省略（升级版本就解决了）