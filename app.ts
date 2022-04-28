import { catchError, response } from "./src/middlewares";
import router from "./src/routes";
import * as Koa from "koa";
import { port } from "./src/config";
import { connectSocket } from "./src/socket.io/socket";
const path = require("path");
const app = new Koa();
const cors = require("koa2-cors");
const koaBody = require("koa-body");
const serve = require("koa-static");
app.use(
  koaBody({
    multipart: true, // 支持文件上传
    formidable: {
      maxFileSize: 800 * 1024 * 1024,
      keepExtensions: true, // 保持文件的后缀
    },
  })
);
//静态文件托管
app.use(cors());
app.use(catchError);
app.use(router.routes());
app.use(router.allowedMethods());
app.use(serve(path.join(__dirname, "static")));
app.listen(port, () => {
  console.log(`---server running in ${port}---@Khaos`);
  connectSocket();
});
