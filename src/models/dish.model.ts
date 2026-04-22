import type { DishAttribute, DishCreate } from '../types/dish.type';
import { Model, DataTypes } from 'sequelize';
import sequelize from '../db/sequelize';

import dateFormat from '../utils/dateFormat';

class DishModel extends Model<DishAttribute, DishCreate> implements DishAttribute {
  id!: number;
  name!: string;
  categoryId!: number;
  price!: number;
  description!: string;
  image!: string;
  status!: number;
  createTime!: Date;
  updateTime!: Date;
  createUser!: number;
  updateUser!: number;
}
DishModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      get() {
        return Number(this.getDataValue('price')) || -1;
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createTime: {
      type: DataTypes.DATE,
      allowNull: false,
      get() {
        return dateFormat(this.getDataValue('createTime') || '');
      },
    },
    updateTime: {
      type: DataTypes.DATE,
      allowNull: false,
      get() {
        return dateFormat(this.getDataValue('updateTime') || '');
      },
    },
    createUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    updateUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    tableName: 'dish',
    createdAt: 'createTime',
    updatedAt: 'updateTime',
  }
);
export default DishModel;
