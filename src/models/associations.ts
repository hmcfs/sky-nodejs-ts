import MealModel from './meal.model';
import MealDishModel from './mealDish.model';
import CategoryModel from './category.model';
import DishModel from './dish.model';
MealModel.belongsTo(CategoryModel, {
  foreignKey: 'categoryId',
  targetKey: 'id',
  as: 'category',
});
CategoryModel.hasMany(MealModel, {
  foreignKey: 'categoryId',
  as: 'meal',
});
MealModel.hasMany(MealDishModel, {
  foreignKey: 'setmealId',
  as: 'mealDish',
});
MealDishModel.belongsTo(DishModel, {
  foreignKey: 'setmealId',
  targetKey: 'id',
  as: 'dish',
});
DishModel.belongsTo(CategoryModel, {
  foreignKey: 'categoryId',
  targetKey: 'id',
  as: 'category',
});
CategoryModel.hasMany(DishModel, {
  foreignKey: 'categoryId',
  as: 'dish',
});
