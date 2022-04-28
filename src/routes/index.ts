import { fileUpload } from "./oss";
const Router = require("koa-router");
const router = new Router();
router.post("/api/fileUpload", fileUpload);
export default router;
