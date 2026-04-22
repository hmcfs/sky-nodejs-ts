import type { MealDishAttribute, MealDishCreate } from '../types/mealDish.model';
import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/sequelize';
import MealModel from './meal.model';

class MealDishModel extends Model<MealDishAttribute, MealDishCreate> implements MealDishAttribute {
  id!: number;
  setmealId!: number;
  dishId!: number;
  name!: string;
  price!: number;
  copies!: number;
}
MealDishModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    setmealId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dishId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      get() {
        return Number(this.getDataValue('price')) || -1;
      },
    },
    copies: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'setmeal_dish',
  }
);

export default MealDishModel;
