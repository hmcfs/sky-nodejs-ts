import { DataTypes, Model } from 'sequelize';
import { OrderDetailAttribute, OrderDetailCreate } from '../types/orderDetail.type';
import sequelize from '../db/sequelize';

class OrderDetailModel
  extends Model<OrderDetailAttribute, OrderDetailCreate>
  implements OrderDetailAttribute
{
  id!: number;
  name!: string;
  image!: string;
  orderId!: number;
  dishId!: number;
  setmealId!: number;
  dishFlavor!: string;
  number!: number;
  amount!: number;
}

OrderDetailModel.init(
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
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dishId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    setmealId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    dishFlavor: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
      get() {
        return Number(this.getDataValue('amount')) || 0;
      },
    },
  },
  {
    sequelize,
    tableName: 'order_detail',
  }
);
export default OrderDetailModel;
