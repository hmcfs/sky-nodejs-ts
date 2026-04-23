export interface FlavorAttribute {
  id: number;
  name: string;
  dishId: number;
  value: string;
}

export interface FlavorCreate extends Omit<FlavorAttribute, 'id'> {}
