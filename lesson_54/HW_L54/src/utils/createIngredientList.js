export function createIngredientList({ data }) {
  const meals = data.meals[0];
  let listIng = [];

  for (let i = 1; i < 21; i++) {
    let item = "strIngredient" + i;
    let measure = "strMeasure" + i;
    let ingredientName = meals[item];
    let measureValue = meals[measure];
    if (ingredientName) {
      listIng.push({
          ingredient: `${ingredientName} - ${measureValue}`,
          image: `https://www.themealdb.com/images/ingredients/${ingredientName}-small.png`
        },
      );
    }
  }

  return listIng;
}