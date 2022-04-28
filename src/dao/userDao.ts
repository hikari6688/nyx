import userModel from "../models/userModel";
import { Model } from "mongoose";
import { IPage } from "../interface";

const addUser = async function (data: any) {
  return await userModel.create(data);
};
//根据用户姓名查询
const findUserByAccount = async function (params: any) {
  return await userModel.find(params);
};
//根据用户唯一id查询
const findUserById = async function (data: any) {
  return await userModel.findOne(data);
};
//删除用户
const removeUser = async function (data: any) {
  return await userModel.deleteOne({ _id: data.id });
};
//修改用户信息
const updateUser = async function (data: any) {
  return await userModel.updateOne({ _id: data.id }, data);
};
//登陆
const login = async function (account: string) {
  return await userModel.findOne({ account });
};

interface IpageParams {
  current?: number;
  total?: number;
  pageSize?: number;
}

interface IqueryParams extends IpageParams {
  name?: string;
  idCard?: string;
}

function queryPage<T extends IpageParams>(model: Model<any>) {
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

const getUserListPage = async function (queryParams?: IqueryParams) {
  const fetchPage = queryPage(userModel);
  const result = await fetchPage(queryParams, ["name", "idCard"]);
  return result;
};

export default {
  login,
  findUserById,
  findUserByAccount,
  addUser,
  getUserListPage,
  removeUser,
  updateUser,
};
