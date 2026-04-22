export interface MealDishAttribute {
  id: number;
  setmealId: number;
  dishId: number;
  name: string;
  price: number;
  copies: number;
}
export interface MealDishCreate extends Omit<MealDishAttribute, 'id'> {}
