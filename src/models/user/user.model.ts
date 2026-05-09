import { UserAttribute, UserCreate } from '../../types/user.model';
import { DataTypes, Model } from 'sequelize';
import sequelize from '../../db/sequelize';

class UserModel extends Model<UserAttribute, UserCreate> implements UserAttribute {
  id!: number;
  openid!: string;
  name!: string;
  phone!: string;
  sex!: number;
  createTime!: Date;
  avatar!: string;
  idNumber!: string;
}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    openid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sex: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    idNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'user',
    timestamps: false,
  }
);
export default UserModel;
