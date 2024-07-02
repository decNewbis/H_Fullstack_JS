import {useMemo} from "react";

export const useMemoIngredients = (data) => {
  return useMemo(() => {
    if (!data) return [];
    const tempIngredientsList = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = data?.[`strIngredient${i}`];
      const measure = data?.[`strMeasure${i}`];
      if (ingredient) {
        tempIngredientsList.push({id: i, ingredient, measure});
      }
      console.log('useMemoIngredients', 'smth doing')
    }
    console.log('useMemoIngredients')
    return tempIngredientsList;
  }, [data]);
}