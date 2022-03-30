# 后端知识

后端相关的一些知识整理

## Rust

安装rust的时候被墙可以打开powershell然后输入以下文本
```Powershell
$proxy='http://example.com:port'
$ENV:HTTP_PROXY=$proxy
$ENV:HTTPS_PROXY=$proxy

.\rustup-init.exe
```
来设置代理
然后再安装

安装rls、rust-analysis、rust-src
```Powershell
rustup component add rust-analysis --toolchain stable-x86_64-pc-windows-msvc
rustup component add rust-src --toolchain stable-x86_64-pc-windows-msvc
rustup component add rls --toolchain stable-x86_64-pc-windows-msvc
```
