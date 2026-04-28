import { OrderDetailAttribute } from './orderDetail.type';

export interface OrdersAttribute {
  id: number;
  number: string;
  userId: number;
  status: number;
  addressBookId: number;
  orderTime: Date;
  checkoutTime: Date;
  payMethod: number;
  payStatus: number;
  amount: number;
  remark: string;
  phone: string;
  address: string;
  userName: string;
  consignee: string;
  cancelReason: string;
  rejectionReason: string;
  cancelTime: Date;
  estimatedDeliveryTime: Date;
  deliveryStatus: number;
  deliveryTime: Date;
  packAmount: number;
  tablewareNumber: number;
  tablewareStatus: number;
  orderDetails?: OrderDetailAttribute[];
  orderDeshes?: string;
}

export interface OrdersCreate extends Omit<
  OrdersAttribute,
  'id' | 'orderTime' | 'checkoutTime' | 'cancelTime' | 'deliveryTime'
> {}
