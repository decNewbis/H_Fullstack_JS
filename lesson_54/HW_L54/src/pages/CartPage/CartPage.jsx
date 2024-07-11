import {useDispatch, useSelector} from "react-redux";
import {deleteOrder, increaseOrder, decreaseOrder} from "../../store/slices/cartSlice";
import {useTotalIngredients} from "../../hooks/useTotalIngredients";
import {OrderList} from "../../components/OrderList";
import {OrderIngredientsList} from "../../components/OrderIngredientsList";
import styles from "./cartPage.module.css";

export const CartPage = () => {
  const meals = Object.values(useSelector((state) => state.cart?.meals));
  const orderQuantities = useSelector((state) => state.cart?.orderQuantities);
  const dispatch = useDispatch();

  const handleDelete = (idMeal) => {
    dispatch(deleteOrder(idMeal));
  };

  const handleIncrease = (idMeal) => {
    dispatch(increaseOrder(idMeal));
  };

  const handleDecrease = (idMeal) => {
    dispatch(decreaseOrder(idMeal));
  };

  const ingredients = useTotalIngredients(meals, orderQuantities);

  return (
    <main>
      <h1>Meals</h1>
      {meals
        ? <OrderList
          meals={meals}
          orderQuantities={orderQuantities}
          onDelete={handleDelete}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
        />
        : <p>Oops! Looks like you haven't chosen anything =\</p>
      }
      {ingredients
        ? <>
          <h2>Sum of all ingredients required to buy in market:</h2>
          <OrderIngredientsList ingredients={ingredients} />
          <button onClick={() => console.log('Checkout')} className={styles.button}>Checkout</button>
        </>
        : null
      }
    </main>
  );
};