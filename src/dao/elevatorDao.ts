import elevatorModel from '../models/elevatorModel';
import { queryPage } from '../utils';

//新增
const addElevator = async function (data: any) {
  return await elevatorModel.create(data);
};

//根据id查询
const findElevatorById = async function (data: any) {
  return await elevatorModel.findOne(data);
};

//删除
const removeElevator = async function (data: any) {
  return await elevatorModel.deleteOne({ _id: data.id });
};

//修改
const updateElevator = async function (data: any) {
  return await elevatorModel.updateOne({ _id: data.id }, data);
};

//获取分页列表
const getElevatorListPage = async function (queryParams?: any) {
  const fetchPage = queryPage(elevatorModel);
  const result = await fetchPage(queryParams, ['name']);
  return result;
};

export default {
  findElevatorById,
  addElevator,
  getElevatorListPage,
  removeElevator,
  updateElevator,
};
