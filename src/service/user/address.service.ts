import AddressBookModel from '../../models/user/addressBook.model';
import { getUserId, getWxUserId } from '../../utils/jwt';
import UserModel from '../../models/user/user.model';
import { AddressBookCreate } from '../../types/addressBook.type';

export const getAddressListSev = async (token: string) => {
  const openid = getUserId(token);
  const userId = (await UserModel.findOne({ where: { openid: openid! } }))!.id;
  return await AddressBookModel.findAll({
    where: {
      userId,
    },
  });
};
export const addAddressSev = async (data: AddressBookCreate, token: string) => {
  const userInfo = await getWxUserId(token);
  return await AddressBookModel.create({
    ...data,
    userId: userInfo!.id,
  });
};
export const getDefaultSev = async (token: string) => {
  const res = await getWxUserId(token);
  const userId = res!.id;
  return await AddressBookModel.findOne({
    where: {
      userId,
      isDefault: 1,
    },
  });
};
