import { DataTypes, Model } from 'sequelize';
import { FlavorAttribute, FlavorCreate } from '../types/flavor';
import sequelize from '../db/sequelize';

class FlavorModel extends Model<FlavorAttribute, FlavorCreate> implements FlavorAttribute {
  id!: number;
  name!: string;
  dishId!: number;
  value!: string;
}

FlavorModel.init(
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
    dishId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    tableName: 'dish_flavor',
  }
);
export default FlavorModel;
