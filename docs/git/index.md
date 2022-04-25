# GIT相关操作

## 拉取部分文件

```bash
git init  // 初始化
git remote add -f origin https://xxx.com/xxx.git  // 关联远程地址
git config core.sparsecheckout true  // 开启Sparse Checkout(稀疏检出)模式
echo "example/xxx" >> .git/info/sparse-checkout // 设置过滤规则，也就是设置要检出的文件
git pull origin master  // 检出分支
```

## 忽略已提交的文件

如果文件已经提交git仓库，则配置.gitignore不生效。
需要先删除git缓存并提交，再添加忽略文件到.gitignore

```bash
git rm -r --cached /dist
git commit -m "rm /dist"
```

## git stash命令

git stash 命令主要用于暂存一些本地变更

```
git stash list [<options>]
git stash show [<stash>]
git stash drop [-q|--quiet] [<stash>]
git stash ( pop | apply ) [--index] [-q|--quiet] [<stash>]
git stash branch <branchname> [<stash>]
git stash save [-p|--patch] [-k|--[no-]keep-index] [-q|--quiet]
                [-u|--include-untracked] [-a|--all] [<message>]
git stash [push [-p|--patch] [-k|--[no-]keep-index] [-q|--quiet]
         [-u|--include-untracked] [-a|--all] [-m|--message <message>]]
         [--] [<pathspec>…​]]
git stash clear
git stash create [<message>]
git stash store [-m|--message <message>] [-q|--quiet] <commit>
```

> 使用git stash save \[\<message\>\]来代替直接使用git stash