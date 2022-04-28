import { Context } from "koa";
export const response = async (ctx: Context, next: () => Promise<any>) => {
  const { response } = ctx;
  await next();
};
