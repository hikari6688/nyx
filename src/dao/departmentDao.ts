import departmentModel from "../models/departmentModel";

const addDepartment = async function (data: any) {
  return await departmentModel.create(data);
};

const findDepartmentByQuery = async function (data?: any) {
  return await departmentModel.find({ name: { $regex: data.name } });
};
const getAllDepts = async function () {
  return await departmentModel.find();
};
const getDeptsById = async function (id) {
  return await departmentModel.findOne({ _id: id });
};
const removeDepartment = async function (data: any) {
  return await departmentModel.deleteOne({ _id: data.id });
};

const updateDepartment = async function (data: any) {
  console.log(data);
  return await departmentModel.updateOne({ _id: data.id }, data);
};

export default {
  findDepartmentByQuery,
  addDepartment,
  removeDepartment,
  updateDepartment,
  getAllDepts,
  getDeptsById
};
