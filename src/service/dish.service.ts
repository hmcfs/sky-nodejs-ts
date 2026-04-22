import DishModel from '../models/dish.model';
import CategoryModel from '../models/category.model';

export const getByCategoryIdSev = async (id: number) => {
  return await DishModel.findAll({
    where: { categoryId: id },

    include: [
      {
        model: CategoryModel,
        as: 'category',
      },
    ],
  });
};
