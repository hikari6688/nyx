import carModel from "../models/carModel";
import { queryPage } from "../utils";

//新增车辆
const addCar = async function (data: any) {
  return await carModel.create(data);
};

//根据车辆唯一id查询
const findCarById = async function (data: any) {
  return await carModel.findOne(data);
};

//删除车辆
const removeCar = async function (data: any) {
  return await carModel.deleteOne({ _id: data.id });
};

//修改车辆信息
const updateCar = async function (data: any) {
  return await carModel.updateOne({ _id: data.id }, data);
};

//获取车辆分页列表
const getCarListPage = async function (queryParams?: any) {
  const fetchPage = queryPage(carModel);
  const result = await fetchPage(queryParams, ["carNumber"]);
  return result;
};

export default {
  findCarById,
  addCar,
  getCarListPage,
  removeCar,
  updateCar,
};
