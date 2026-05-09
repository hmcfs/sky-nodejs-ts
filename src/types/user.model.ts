export interface UserAttribute {
  id: number;
  openid: string;
  name: string;
  phone: string;
  sex: number;
  createTime: Date;
  avatar: string;
  idNumber: string;
}

export interface UserCreate {
  openid: string;
}
