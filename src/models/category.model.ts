import { CategoryAttribute, CategoryCreate } from '../types/category.type';
import sequelize from '../db/sequelize';
import { DataTypes, Model } from 'sequelize';
class CategoryModel extends Model<CategoryAttribute, CategoryCreate> implements CategoryAttribute {
  id!: number;
  type!: number;
  name!: string;
  sort!: number;
  create_time!: Date;
  update_time!: Date;
  status!: number;
  create_user!: number;
  update_user!: number;
}
CategoryModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '类型',
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '名称',
    },
    sort: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '排序',
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      comment: '创建时间',
    },
    update_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      comment: '更新时间',
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: '状态',
    },
    create_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '创建用户',
    },
    update_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '更新用户',
    },
  },
  {
    sequelize,
    tableName: 'category',
  }
);
export default CategoryModel;
