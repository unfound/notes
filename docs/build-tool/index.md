# 前端构建工具

记录一些前端构建工具如webpack和vite相关的知识

## Webpack 5 配置步骤

1. npm init -y
2. npm install webpack webpack-cli webpack-merge --save-dev
3. npm install html-webpack-plugin --save-dev 创建html
4. 通过output.clean来设置清空dist
5. npm install webpack-dev-server --save-dev
6. pnpm add style-loader css-loader less less-loader -D 处理less
7. 处理图片，使用自带的loader，Asset Module
8. 字体还有其他的静态资源都是如此
9. 代码分离
    - 通过dependOn来设置
    - splitChunks来提取分离重复模块
    - 动态导入: import和require.ensure
10. 缓存
    - 使用contenthash
    - 设置optimization.runtimeChunk来提取webpack的运行时代码，以及使用splitChunks来提取node_modules下的依赖
    - 设置optimization.moduleIds为deterministic以保证模块的hash不变
11. npm install postcss postcss-loader postcss-preset-env --save-dev 配置postcss，postcss-preset-env包含一些最新css特性，也包含autofixer，不用再安装，然后配置browserslist
12. npm install @babel/core @babel/preset-env --save-dev来设置babel，npm install @babel/plugin-transform-runtime @babel/runtime --save-dev来设置分离babel运行时代码，减少包体积
13. npm install copy-webpack-plugin --save-dev 使用该插件复制public目录到生成目录下
14. npm install mini-css-extract-plugin css-minimizer-webpack-plugin --save-dev来配置分离并压缩css

> loader会逆序执行
> 
> 多入口代码分割会可能会包含重复模块（在公用模块不被使用的情况下），也就是说每个入口各会打包一份公用模块
> 可以设置 ```usedExports: false``` 来关闭或者，保证公用模块被使用

> 与 prefetch 指令相比，preload 指令有许多不同之处：
> - preload chunk 会在父 chunk 加载时，以并行方式开始加载。prefetch chunk 会在父 chunk 加载结束后开始加载。
> - preload chunk 具有中等优先级，并立即下载。prefetch chunk 在浏览器闲置时下载。
> - preload chunk 会在父 chunk 中立即请求，用于当下时刻。prefetch chunk 会用于未来的某个时刻。
> - 浏览器支持程度不同。

## Vue-cli 3.x 迁移vite 2.x 指北

1. npm i vite vite-plugin-vue2 -D
2. 创建vite.config.js配置文件
3. 在目录根文件夹创建index.html，并将入口js用script以模块形式引入
4. 配置resolve.extensions: ['.vue' + vue原本支持的那些] 最新版才支持
5. vuedraggable插件报错
6. crypto-js报错，替换成crypto-es
7. URI malformed报错，把<%= BASE_URL %>占位符去掉
8. require不存在的报错，都改为import引入，require.context也改成import.meta.globEager
9. webpack中import.meta.globEager会报错，写一个vite插件在编译的时候进行替换
10. public下的文件可以通过设置alias来兼容
11. 动态reqire使用import来解决
12. 打包不明报错在最新版版本解决
