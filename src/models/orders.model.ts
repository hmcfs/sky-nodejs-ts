import { DataTypes, Model } from 'sequelize';
import type { OrdersAttribute, OrdersCreate } from '../types/order.type';
import sequelize from '../db/sequelize';
import dateFormat from '../utils/dateFormat';

class OrdersModel extends Model<OrdersAttribute, OrdersCreate> implements OrdersAttribute {
  id!: number;
  number!: string;
  userId!: number;
  addressBookId!: number;
  orderTime!: Date;
  checkoutTime!: Date;
  payMethod!: number;
  status!: number;
  payStatus!: number;
  amount!: number;
  remark!: string;
  phone!: string;
  address!: string;
  userName!: string;
  consignee!: string;
  cancelReason!: string;
  rejectionReason!: string;
  cancelTime!: Date;
  estimatedDeliveryTime!: Date;
  deliveryStatus!: number;
  deliveryTime!: Date;
  packAmount!: number;
  tablewareNumber!: number;
  tablewareStatus!: number;
}

OrdersModel.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      comment: '主键id',
    },
    number: {
      type: DataTypes.STRING(32),
      allowNull: false,
      comment: '订单号',
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
      comment: '订单状态 1待付款 2待接单 3待派送 4派送中 5已完成 6已取消 7拒单',
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: '用户id',
    },
    addressBookId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: '地址id',
    },
    orderTime: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: '下单时间',
      get() {
        return dateFormat(this.getDataValue('orderTime'));
      },
    },
    checkoutTime: {
      type: DataTypes.DATE,
      comment: '结账时间',
      get() {
        return dateFormat(this.getDataValue('checkoutTime'));
      },
    },
    payMethod: {
      type: DataTypes.TINYINT,
      allowNull: false,
      comment: '支付方式 1微信 2支付宝',
    },
    payStatus: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: '支付状态 0未支付 1已支付',
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      comment: '订单金额',
      get() {
        return Number(this.getDataValue('amount')) || -1;
      },
    },
    remark: {
      type: DataTypes.STRING(100),
      comment: '备注',
    },
    phone: {
      type: DataTypes.STRING(11),
      allowNull: false,
      comment: '手机号',
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: '地址',
    },
    userName: {
      type: DataTypes.STRING(32),
      comment: '用户姓名',
    },
    consignee: {
      type: DataTypes.STRING(32),
      allowNull: false,
      comment: '收货人',
    },
    cancelReason: {
      type: DataTypes.STRING(255),
      comment: '取消原因',
    },
    rejectionReason: {
      type: DataTypes.STRING(255),
      comment: '拒单原因',
    },
    cancelTime: {
      type: DataTypes.DATE,
      comment: '取消时间',
      get() {
        return dateFormat(this.getDataValue('cancelTime'));
      },
    },
    estimatedDeliveryTime: {
      type: DataTypes.DATE,
      comment: '预计送达时间',
      get() {
        return dateFormat(this.getDataValue('estimatedDeliveryTime'));
      },
    },
    deliveryStatus: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: '配送状态 0待配送 1配送中 2已送达',
    },
    deliveryTime: {
      type: DataTypes.DATE,
      comment: '送达时间',
      get() {
        return dateFormat(this.getDataValue('deliveryTime'));
      },
    },
    packAmount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
      comment: '打包费',
      get() {
        return Number(this.getDataValue('packAmount')) || -1;
      },
    },
    tablewareNumber: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: '餐具数量',
    },
    tablewareStatus: {
      type: DataTypes.TINYINT,
      defaultValue: 1,
      comment: '餐具状态 0不要 1要',
    },
  },
  {
    sequelize,
    tableName: 'orders',
    underscored: true,
    comment: '订单表',
  }
);
export default OrdersModel;
