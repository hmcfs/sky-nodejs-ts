import { RowDataPacket } from 'mysql2';
export interface Employee extends RowDataPacket {
  id: string;
  name: string;
  username: string;
  password: string;
  phone: string;
  sex: string;
  id_number: string | number;
  status: string;
  create_time: Date | string;
  update_time: Date | string;
  create_user: string | number;
  update_user: string | number;
}
export interface EmployeeResult extends Omit<Employee, 'password'> {
  total: number;
}
export interface EmployeeCreate {
  name: string;
  username: string;
  id: number;
  phone: string;
  sex: string;
  idNumber: string | number;
}
