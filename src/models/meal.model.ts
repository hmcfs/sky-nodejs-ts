import type { Meal, MealCreate } from '../types/meal.type';
import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/sequelize';

import dateFormat from '../utils/dateFormat';
class MealModel extends Model<Meal, MealCreate> implements Meal {
  id!: number;
  categoryId!: number;
  name!: string;
  price!: number;
  status!: number;
  description!: string;
  image!: string;
  createTime!: Date;
  updateTime!: Date;
  createUser!: number;
  updateUser!: number;
}

MealModel.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    categoryId: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING(32), allowNull: false },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      get() {
        const value = this.getDataValue('price');
        return value ? Number(value) : -1;
      },
    },
    status: { type: DataTypes.INTEGER, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },

    image: { type: DataTypes.STRING, allowNull: false },
    createTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      get() {
        const value = this.getDataValue('createTime');
        return value ? dateFormat(value) : '';
      },
    },
    updateTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      get() {
        const value = this.getDataValue('updateTime');
        return value ? dateFormat(value) : '';
      },
    },
    createUser: { type: DataTypes.INTEGER, allowNull: false },
    updateUser: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    tableName: 'setmeal',
    timestamps: true,
    createdAt: 'createTime',
    updatedAt: 'updateTime',
  }
);
export default MealModel;
