import { FlavorAttribute } from './flavor';

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
  category?: {
    categoryId: number;
    categoryName: string;
  };
}

export interface DishCreate extends Omit<DishAttribute, 'id' | 'createTime' | 'updateTime'> {}

export interface DishPage {
  page?: number;
  pageSize?: number;
  name?: string;
  categoryId?: number;
  status?: number;
}

export interface DishUpdate {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  status: number;

  updateTime: Date;

  updateUser: number;
  flavors: FlavorAttribute[];
  categoryId: number;
  categoryName: string;
}

export interface DishCreateParams extends DishUpdate {
  createUser: number;
  createTime: Date;
}
