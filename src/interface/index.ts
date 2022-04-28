interface ISchema {}

export interface IPage {
  current?: number; //当前页码 默认1
  total?: number; //数据总共条数
  pageSize?: number; //每页显示条数 默认10
}
