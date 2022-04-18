# 开发环境相关配置

## nvm设置

nvm 安装路径下找到setting.txt，在后面加上

```
node_mirror: https://npmmirror.com/mirrors/node/
npm_mirror: https://npmmirror.com/mirrors/npm/
```

## npm淘宝镜像设置

```bash
# 获取当前镜像源
npm config get registry

# 设置淘宝镜像源
npm config set registry https://registry.npmmirror.com/

# 修改回原来的镜像源
npm config set registry https://registry.npmjs.org
```

> 淘宝镜像地址已修改

## 安装cnpm

```bash
# 安装cnpm
npm i -g cnpm --registry=https://registry.npm.taobao.org

# 查看镜像源
cnpm config ls
```

## Git的用户名和邮箱地址

```bash
# 查看用户名和邮箱
git config user.name
git config user.email

# 设置用户名和邮箱
git config --global user.name "username"
git config --global user.email "email"
```

##

<Iconify />