import MealModel from './meal.model';
import MealDishModel from './mealDish.model';
import CategoryModel from './category.model';
import DishModel from './dish.model';
import FlavorModel from './flavor.model';
import OrdersModel from './orders.model';
import OrderDetailModel from './orderDetail.model';

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

FlavorModel.belongsTo(DishModel, {
  as: 'dish',
  foreignKey: 'dishId',
  targetKey: 'id',
});
DishModel.hasMany(FlavorModel, {
  as: 'flavors',
  foreignKey: 'dishId',
});
OrdersModel.hasMany(OrderDetailModel, {
  as: 'orderDetails',
  foreignKey: 'orderId',
});
OrderDetailModel.belongsTo(OrdersModel, {
  as: 'order',
  foreignKey: 'orderId',
  targetKey: 'id',
});
