# nodejs-resolve-file
本例包含客户端上传文件、服务端接收文件、解析文件。

1. 上传文件
使用 `formData`，将文件作为表单项上传

2. 文件接收
本例使用 `koa` 框架搭建服务器，文件接收使用了 `busboy` 模块。参考：[上传文件简单实现](https://chenshenhai.github.io/koa2-note/note/upload/simple.html)

3. 文件解析
使用 `xlsx` 模块解析 `excel` 文件。

**运行方法**
```
# 安装依赖
npm install

# 运行
npm start
```