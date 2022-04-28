import { response } from "../middlewares";
import { Model } from "mongoose";
const os = require("os");
const bcrypt = require("bcryptjs");

interface IpageParams {
  current?: number;
  total?: number;
  pageSize?: number;
}
interface treeNode extends Record<string, any> {
  _id: string;
  name: string;
  children?: Array<treeNode>;
  parentId?: string;
}

interface treeNode extends Record<string, any> {
  _id: string;
  name: string;
  parentId?: string;
}

type PropertyName = string | number | symbol;

export const serialize = (params: string | undefined): Promise<any> => {
  if (!params) return Promise.reject("params id required");
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(params, salt, function (err: string, hash: string) {
        if (err) throw new Error(err);
        return resolve(hash);
      });
    });
  });
};

export const compareHash = (data: string, hash: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(data, hash, function (err, res) {
      resolve(res);
    });
  });
};

export function pick<T extends object, K extends keyof T>(
  object: T | undefined | null,
  v: Array<keyof T>
): Omit<T, K> {
  if (!object || !v || !v.length) return object;
  return v.reduce((pre: any, cur) => {
    pre[cur] = object[cur];
    return pre;
  }, {});
}

export function omit<T extends object, K extends keyof T>(
  object: T | undefined | null,
  v: Array<keyof T>
): Omit<T, K> {
  if (!object || !v || !v.length) return object;
  const ks = Object.keys(object);
  return ks.reduce((pre: any, cur: any) => {
    if (!v.includes(cur)) pre[cur] = object[cur];
    return pre;
  }, {});
}

export function intall(app: any, args: any[]): void {
  args.forEach((middleware) => {
    app.use(middleware);
  });
}

export function queryPage<T extends IpageParams>(model: Model<any>) {
  return async function (queryPrams: T, queryKeys: Array<any>) {
    const { current = 1, pageSize = 10 } = queryPrams;
    const filter = queryKeys.reduce((pre: any, cur) => {
      if (queryPrams[cur]) {
        pre[cur] = { $regex: queryPrams[cur] };
      }
      return pre;
    }, {});
    const _filter = { $and: [filter] };
    const result: any = {};
    result.total = await model.find(_filter).countDocuments();
    result.data = await model
      .find(_filter)
      .skip((Number(current) - 1) * Number(pageSize))
      .limit(Number(pageSize));
    return result;
  };
}

export function generateToken() {}

///获取本机ip///
export function getIPAdress() {
  var interfaces = os.networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (
        alias.family === "IPv4" &&
        alias.address !== "127.0.0.1" &&
        !alias.internal
      ) {
        return alias.address;
      }
    }
  }
}



export function node2Tree(
  list: treeNode[],
  tree: treeNode[],
  parentId: string
) {
  list.forEach((node) => {
    if (node.parentId == parentId) {
      node.children = [];
      node2Tree(list, node.children, node._id);
      if (!node.children.length) delete node.children;
      tree && tree.push(node);
    }
  });
}
