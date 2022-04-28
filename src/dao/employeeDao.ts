import employeeModel from "../models/employeeModel";
import { queryPage } from "../utils";

//新增员工
const addEmployee = async function (data: any) {
  return await employeeModel.create(data);
};

//根据用户唯一id查询
const findEmployeeById = async function (data: any) {
  return await employeeModel.findOne(data);
};

//删除用户
const removeEmployee = async function (data: any) {
  return await employeeModel.deleteOne({ _id: data.id });
};

//修改用户信息
const updateEmployee = async function (data: any) {
  return await employeeModel.updateOne({ _id: data.id }, data);
};

//获取分页列表
const getEmployeeListPage = async function (queryParams?: any) {
  const fetchPage = queryPage(employeeModel);
  const result = await fetchPage(queryParams, ["name", "idCard"]);
  return result;
};

export default {
  findEmployeeById,
  addEmployee,
  getEmployeeListPage,
  removeEmployee,
  updateEmployee,
};
