# GIT相关操作

## 拉取部分文件

```bash
git init  // 初始化
git remote add -f origin https://xxx.com/xxx.git  // 关联远程地址
git config core.sparsecheckout true  // 开启Sparse Checkout(稀疏检出)模式
echo "example/xxx" >> .git/info/sparse-checkout // 设置过滤规则，也就是设置要检出的文件
git pull origin master  // 检出分支
```