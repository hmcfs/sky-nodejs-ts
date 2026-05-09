import MealModel from '../../models/meal.model';
import MealDishModel from '../../models/mealDish.model';

type MealDish = {
  copies: number;
  image: string;
  description: string;
  name: string;
};
export const getMealListSev = async () => {
  return await MealModel.findAll();
};
export const getDishByIdSev = async (id: number) => {
  const rows = await MealModel.findOne({
    where: {
      id,
    },
    include: [
      {
        model: MealDishModel,
        attributes: ['copies'],
        as: 'mealDish',
      },
    ],
  });
  const r = rows ? (rows.toJSON() as any) : {};
  if (Object.keys(r).length == 0) return {};
  else
    return [
      {
        copies: r.mealDish[0].copies,
        description: r.description,
        image: r.image,
        name: r.name,
      },
    ] as MealDish[];
};
