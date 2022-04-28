import { Promise } from "mongoose";

export const catchError = async (ctx: any, next: () => Promise<any>) => {
  try {
    await next();
  } catch (error) {
    if (error.errorCode) {
      const { errorCode, ...rest } = error;
      return (ctx.body = { ...rest, code: error.errorCode });
    }
    return Promise.reject(error);
  }
};
