import MealModel from '../models/meal.model';

export const getListSev = async () => {
  return await MealModel.findAll();
};
