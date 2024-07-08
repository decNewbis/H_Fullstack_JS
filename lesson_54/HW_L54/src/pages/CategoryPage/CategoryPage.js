import { useEffect, useState} from "react";
import { useParams} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import { MealTile } from "../../components/MealTile";
import { useData } from "../../hooks";
import { API } from "../../constants";


import { fetchMealById } from "../../store/slices/cartSlice";


// const CategoryList = ({categories}) => {
//   const sortedCategory = useMemo(() => categories.sort((a, b) => a.strMeal > b.strMeal ? 1 : -1), [categories])
// }

export const CategoryPage = () => {
  let { category } = useParams();
  const data = useData(`${API.category}${category}`)
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart)

  useEffect(() => {
    // currentIdSet.filter(item => )
    // setCurrentIdSet();
  }, [cart]);

  if(!data?.meals) {
    return null;
  }

  const addToCart = (idMeal) => {
    dispatch(fetchMealById(idMeal))
  }

  return (
    <main>
      <Grid container spacing={2}>
        {
          data.meals.map(({ idMeal, strMeal, strMealThumb }) => {
            return (
              <MealTile
                cart={cart}
                idMeal={idMeal}
                strMeal={strMeal}
                strMealThumb={strMealThumb}
                addToCart={addToCart}
              />
            )
          })
        }
      </Grid>
    </main>
  )
}