export interface DishAttribute {
  id: number;
  name: string;
  categoryId: number;
  price: number;
  description: string;
  image: string;
  status: number;
  createTime: Date;
  updateTime: Date;
  createUser: number;
  updateUser: number;
}
export interface DishCreate extends Omit<DishAttribute, 'id' | 'createTime' | 'updateTime'> {}
