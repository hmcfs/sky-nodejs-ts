export interface ShopcartAttr {
  id: number;
  name: string;
  image: string;
  userId: number;
  dishId: number;
  setmealId: number;
  dishFlavor: string;
  number: number;
  amount: number;
  createTime: Date;
}

export interface ShopcartCreate {
  name: string;
  image: string;
  userId: number;
  dishId?: number;
  setmealId?: number;
  dishFlavor?: string;
  number: number;
  amount: number;
}

export type CartParams = {
  dishFlavor: string;
  dishId?: number;
  setmealId?: number;
};
