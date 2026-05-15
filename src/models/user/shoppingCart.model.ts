import { DataTypes, Model } from 'sequelize';
import sequelize from '../../db/sequelize';
import type { ShopcartAttr, ShopcartCreate } from '../../types/shoppingCart.type';

class ShopcartModel extends Model<ShopcartAttr, ShopcartCreate> implements ShopcartAttr {
  id!: number;
  name!: string;
  image!: string;
  userId!: number;
  dishId!: number;
  setmealId!: number;
  dishFlavor!: string;
  number!: number;
  amount!: number;
  createTime!: Date;
}

ShopcartModel.init(
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
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dishId: {
      type: DataTypes.INTEGER,
    },
    setmealId: {
      type: DataTypes.INTEGER,
    },
    dishFlavor: {
      type: DataTypes.STRING,
    },
    number: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      get() {
        return Number(this.getDataValue('amount'));
      },
    },
    createTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'shopping_cart',
    timestamps: false,
  }
);
export default ShopcartModel;
