export interface AddressBookAttribute {
  id: number;
  userId: number;
  consignee: string;
  phone: string;
  sex: number;
  provinceCode: string;
  cityCode: string;
  provinceName: string;
  cityName: string;
  districtCode: string;
  districtName: string;
  detail: string;
  isDefault: number;
  label: number;
}

export interface AddressBookCreate extends Omit<AddressBookAttribute, 'id'> {}
