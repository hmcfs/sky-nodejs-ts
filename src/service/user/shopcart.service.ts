import { Transaction } from 'sequelize';
import sequelize from '../../db/sequelize';
import DishModel from '../../models/dish.model';
import FlavorModel from '../../models/flavor.model';
import MealModel from '../../models/meal.model';
import ShopcartModel from '../../models/user/shoppingCart.model';
import ShoppingCartModel from '../../models/user/shoppingCart.model';
import { getUserId } from '../../utils/jwt';
import UserModel from '../../models/user/user.model';
import type { CartParams } from '../../types/shoppingCart.type';

export const addCartSev = async (data: CartParams, token: string) => {
  const transaction: Transaction = await sequelize.transaction();
  try {
    const openid = getUserId(token);
    const rows = await UserModel.findOne({ where: { openid: openid! }, transaction });
    const userId = rows!.id;
    let queryRes: any;
    if (data.dishId != undefined) {
      const cartRes = await ShopcartModel.findOne({ where: { dishId: data.dishId }, transaction });
      if (cartRes) {
        await ShopcartModel.update(
          {
            number: cartRes.number + 1,
          },
          { where: { dishId: data.dishId }, transaction }
        );
        await transaction.commit();
        return cartRes;
      }
      queryRes = await DishModel.findOne({
        where: {
          id: data.dishId,
        },
        include: [
          {
            model: FlavorModel,
            as: 'flavors',
            attributes: ['value'],
          },
        ],

        transaction,
      });
    }
    if (data.setmealId != undefined) {
      const cartRes = await ShopcartModel.findOne({
        where: { setmealId: data.setmealId },
        transaction,
      });
      if (cartRes) {
        await ShopcartModel.update(
          {
            number: cartRes.number + 1,
          },
          { where: { setmealId: data.setmealId }, transaction }
        );
        await transaction.commit();
        return cartRes;
      }

      queryRes = await MealModel.findOne({ where: { id: data.setmealId }, transaction });
    }
    const result = await ShopcartModel.create(
      {
        dishId: data.dishId,
        setmealId: data.setmealId,
        dishFlavor: data.dishFlavor,
        name: queryRes.name,
        image: queryRes.image,
        userId,
        amount: queryRes.price,
        number: 1,
      },
      { transaction }
    );
    await transaction.commit();
    return result;
  } catch (e) {
    transaction.rollback();
    throw e;
  }
};
export const getCartlistSev = async () => {
  return await ShopcartModel.findAll();
};
export const subtractCartSev = async (data: CartParams) => {
  const transaction: Transaction = await sequelize.transaction();
  try {
    let result;
    const { dishId, setmealId } = data;
    if (dishId != undefined) {
      const shopcart = await ShopcartModel.findOne({ where: { dishId }, transaction });
      if (!shopcart) throw new Error('购物车无此商品');
      if (shopcart.number > 1)
        result = await ShopcartModel.update(
          { number: shopcart.number - 1 },
          {
            where: { dishId },
            transaction,
          }
        );
      else result = await ShoppingCartModel.destroy({ where: { dishId }, transaction });
    } else if (setmealId != undefined) {
      const shopcart = await ShopcartModel.findOne({ where: { setmealId }, transaction });
      if (!shopcart) throw new Error('购物车无此商品');
      if (shopcart.number > 1)
        result = await ShopcartModel.update(
          { number: shopcart.number - 1 },
          {
            where: { setmealId },
            transaction,
          }
        );
      else result = await ShoppingCartModel.destroy({ where: { setmealId }, transaction });
    }
    await transaction.commit();
    return result;
  } catch (e) {
    await transaction.rollback();
    throw e;
  }
};
