import type { MealDishAttribute } from './mealDish.model';
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
  category?: {
    id: number;
    name: string;
  };
  mealDish?: MealDishAttribute[];
}
export interface MealCreate extends Omit<Meal, 'id' | 'createTime' | 'updateTime'> {}
export interface MealPage {
  page: number;
  pageSize: number;
  status?: number;
  name?: string;
  categoryId?: number;
}
export interface MealQueryRes extends Meal {
  category?: {
    id: number;
    name: string;
  };
}
export interface MealUpdate extends Omit<Meal, 'mealDish' | 'category'> {
  setmealDishes?: MealDishAttribute[];
}
