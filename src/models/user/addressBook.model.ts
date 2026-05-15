import { Model, DataTypes } from 'sequelize';
import { AddressBookAttribute, AddressBookCreate } from '../../types/addressBook.type';
import sequelize from '../../db/sequelize';

class AddressBookModel
  extends Model<AddressBookAttribute, AddressBookCreate>
  implements AddressBookAttribute
{
  id!: number;
  userId!: number;
  consignee!: string;
  phone!: string;
  sex!: number;
  provinceCode!: string;
  cityCode!: string;
  provinceName!: string;
  cityName!: string;
  districtCode!: string;
  districtName!: string;
  detail!: string;
  isDefault!: number;
  label!: number;
}

AddressBookModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    consignee: {
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
    provinceCode: {
      type: DataTypes.STRING,
    },
    cityCode: {
      type: DataTypes.STRING,
    },
    provinceName: {
      type: DataTypes.STRING,
    },
    cityName: {
      type: DataTypes.STRING,
    },
    districtCode: {
      type: DataTypes.STRING,
    },
    districtName: {
      type: DataTypes.STRING,
    },
    detail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isDefault: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    label: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    tableName: 'address_book',
    timestamps: false,
  }
);

export default AddressBookModel;
