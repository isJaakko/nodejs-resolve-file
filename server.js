const Koa = require('koa');
const path = require('path');
const serve = require('koa-static'); // 静态资源操作
const router = require('koa-router')(); // 注意 router 的引入方式
const fs = require('fs'); // 文件操作
const app = new Koa();

// 上传文件
const {
  uploadFile
} = require('./method/receiveFile');
const {
  resolveFile
} = require('./method/handleFile');

const port = 3060;
app.use(require('koa-static')('dist', {
  index: 'index.html',
  defer: true
}));

// const main = serve(path.join(__dirname, "../dist"));

// app.use(main);
app.use(async (ctx, next) => {
  console.log(`req-url: ${ctx.url}`);
  await next();
})

app.use(async (ctx, next) => {
  // 如果路由以 '/api' 开头，进入路由匹配; 否则返回 'index.html'
  if ((/^\/api/.test(ctx.url))) {
    return next();
  }
  // 通过 ctx.url 我们可以获取浏览器请求的文件
  const fileName = (/\.html|\.js$/.test(ctx.url));
  // 如果浏览器请求的文件为 html、js 类型，就返回相应类型，否则返回 index.html
  if (fileName) {
    console.log('filename: ', ctx.url.replace(/^\//, ''));
    ctx.body = fs.createReadStream(path.join(__dirname, ctx.url.replace(/^\//, '')));
  } else {
    ctx.type = "html";
    ctx.body = fs.createReadStream(path.join(__dirname, "index.html"));

    return next();
  }

  await next();
})


router.post('/api/upload', async (ctx, next) => {
  // 上传文件请求处理
  let result = {
    success: false
  }
  let serverFilePath = path.join(__dirname, 'upload-files')

  // 上传文件事件
  result = await uploadFile(ctx, {
    fileType: 'album', // common or album
    path: serverFilePath
  })

  ctx.body = result;
  await next();
})

router.get('/api/getdata', async (ctx, next) => {
  const data = resolveFile('data.xlsx');
  ctx.body = data;
  await next();
})

app.use(router.routes()); // 注意 router 使用方式
app.listen(port);
console.log(`\nserver is start at port ${port}...\n`);