# 开发环境相关配置

## npm淘宝镜像设置

```bash
# 获取当前镜像源
npm config get registry

# 设置淘宝镜像源
npm config set registry https://registry.npm.taobao.org

# 修改回原来的镜像源
npm config set registry https://registry.npmjs.org
```

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