export interface CategoryAttribute {
  id: number;
  type: number;
  name: string;
  sort: number;
  create_time: Date;
  update_time: Date;
  status: number;
  create_user: number;
  update_user: number;
}
export interface CategoryCreate {
  id: number;
  type: number;
  name: string;
  sort: number;
}
export interface CategoryPage {
  page: number;
  pageSize: number;
  name?: string;
  type?: number;
}
export interface QueryResult {
  id: number;
  type: number;
  name: string;
  sort: number;
  create_time: Date;
  update_time: Date;

  status: number;
  create_user: number;
  update_user: number;
}
export interface QueryResult2 extends QueryResult {
  createTime: string;
  updateTime: string;
  createUser?: number;
  updateUser?: number;
}
export interface UpdateParams {
  id: number;
  name?: string;
  sort?: number;
  status?: number;
  type?: number;
  update_user?: number;
  create_user?: number;
}
