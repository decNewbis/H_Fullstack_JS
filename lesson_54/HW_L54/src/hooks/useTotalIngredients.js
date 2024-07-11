import {useMemo} from "react";

const parseIngredient = (ingredient) => {
  const regex = /(\d+\/\d+|\d+\.?\d+|\d+)(\s*)(-\d+\/\d+|-\d+\.?\d+|-\d+)?(\s*)([a-zA-Z]+)?|([a-zA-Z]+)/i;
  const match = ingredient.match(regex);

  if (match) {
    return {
      quantity: match[1] ? parseFloat(match[1]) : 1,
      unit: match[5]
        ? match[5]
        : match[6]
          ? match[6]
          : ''
    };
  }
  return {};
};

export const useTotalIngredients = (data, orderQuantities) => {
  return useMemo(() => {
    if (!data) return {};
    const tempIngredientsDictionary = {};
    data.forEach((element) => {
      const {idMeal} = element;
      for (let i = 1; i <= 20; i++) {
        const ingredient = element?.[`strIngredient${i}`];
        let measure = parseIngredient(element?.[`strMeasure${i}`]);
        if (ingredient) {
          measure = {...measure, quantity: measure.quantity * orderQuantities[idMeal]};
          if (measure.quantity === 0) continue;
          if (tempIngredientsDictionary[ingredient]) {
            tempIngredientsDictionary[ingredient].quantity += measure.quantity;
            continue;
          }
          tempIngredientsDictionary[ingredient] = measure;
        }
      }
    });
    return tempIngredientsDictionary;
  }, [data, orderQuantities]);
}