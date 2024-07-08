import FavoriteIcon from '@mui/icons-material/Favorite';
import { addMeal, removeMeal } from "../../store/slices/mealSlice";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import styles from "./style.module.css";
import {IngredientList} from "../../components/IngridientList/IngredientList";
import {createIngredientList} from "../../utils/createIngredientList";

export const Meal = ({ data, id, image, name, ingredients }) => {
  const dispatch = useDispatch();
  const meals = useSelector((state) => state.meals);

  console.log('meals', meals);
  console.log('name', name);

  const { idMeal, strMeal, strMealThumb } = data?.meals[0] || { idMeal: id, strMeal: name, strMealThumb: image };
  const { strInstructions } = data?.meals[0] || {};
  let instructions = strInstructions?.split("\n") || [];

  const isItFavoriteMeal = meals.find((meal) => meal.id === idMeal);

  console.log('ingredients',ingredients)
  console.log('ingredients',Boolean(ingredients))

  const ingredientList = ingredients ? ingredients : createIngredientList({data})

  const addMealToFavorites = () => {
    dispatch(addMeal({id: idMeal, name: strMeal, image: strMealThumb, ingredients: ingredientList }));
  }

  const removeMealFromFavorites = () => {
    dispatch(removeMeal({id: idMeal }));
  }

  const handlerFavoriteMeal = isItFavoriteMeal ? removeMealFromFavorites : addMealToFavorites;

  return (
    <section className='product-section'>
      <div className='block-product'>
        <div className='name-and-image'>
          <img className='imageForProduct' src={strMealThumb} alt={strMeal} />
          <p className={styles.nameProduct}>
            {strMeal}
            <FavoriteIcon onClick={handlerFavoriteMeal} className={styles.icon} color={isItFavoriteMeal ? "primary" : "disabled" } />
          </p>
        </div>
        <IngredientList ingredients={ingredientList} />
      </div>
      {!!instructions?.length && (
        <div>
          <p className={styles.title}>Instructions</p>
          {instructions.map((item, index) => {
            return <p key={index} className={styles.text}>{item}</p>;
          })}
        </div>
      )}
    </section>
  );
};