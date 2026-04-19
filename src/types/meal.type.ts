export interface Meal {
  id: number;
  categoryId: number;
  name: string;
  price: number;
  status: number;
  description: string;
  image: string;
  createTime: Date;
  updateTime: Date;
  createUser: number;
  updateUser: number;
}
export interface MealCreate extends Omit<Meal, 'id' | 'createTime' | 'updateTime'> {}
export interface MealPage {
  page: number;
  pageSize: number;
  status?: number;
  name?: string;
  categoryId?: number;
}
