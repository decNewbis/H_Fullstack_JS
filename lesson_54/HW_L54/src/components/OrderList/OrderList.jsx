import {useCallback} from 'react';
import styles from "./orderList.module.css";

export const OrderList = ({meals, orderQuantities, onDelete, onIncrease, onDecrease}) => {
  const handleDecrease = useCallback(
    (idMeal) => {
      onDecrease(idMeal);
    },
    [onDecrease]
  );

  const handleIncrease = useCallback(
    (idMeal) => {
      onIncrease(idMeal);
    },
    [onIncrease]
  );

  const handleDelete = useCallback(
    (idMeal) => {
      onDelete(idMeal);
    },
    [onDelete]
  );

  return (
    <ul className={styles.list}>
      {meals.map(({idMeal, strMeal, strMealThumb}) => {
        return (
          <li key={idMeal} className={styles.item}>
            <img className={styles.mealThumb} src={strMealThumb} alt={`Illustration of ${strMeal}`}/>
            <span className={styles.mealTitle}>{strMeal}</span>
            <div className={styles.group}>
              <button onClick={() => handleDecrease(idMeal)}>-</button>
              <span>{orderQuantities[idMeal]}</span>
              <button onClick={() => handleIncrease(idMeal)}>+</button>
              <button onClick={() => handleDelete(idMeal)}>Remove</button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};