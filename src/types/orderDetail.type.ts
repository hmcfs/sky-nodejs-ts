export interface OrderDetailAttribute {
  id: number;
  name: string;
  image: string;
  orderId: number;
  dishId: number;
  setmealId: number;
  dishFlavor: string;
  number: number;
  amount: number;
}

export interface OrderDetailCreate extends Omit<OrderDetailAttribute, 'id'> {}
