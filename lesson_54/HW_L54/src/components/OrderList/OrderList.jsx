import styles from "./orderList.module.css";

export const OrderList = ({meals, orderQuantities, onDelete, onIncrease, onDecrease}) => {
  return (
    <ul className={styles.list}>
      {meals.map(({idMeal, strMeal, strMealThumb}) => {
        return (
          <li key={idMeal} className={styles.item}>
            <img className={styles.mealThumb} src={strMealThumb} alt={`Illustration of ${strMeal}`}/>
            <span className={styles.mealTitle}>{strMeal}</span>
            <div className={styles.group}>
              <button onClick={() => onDecrease(idMeal)}>-</button>
              <span>{orderQuantities[idMeal]}</span>
              <button onClick={() => onIncrease(idMeal)}>+</button>
              <button onClick={() => onDelete(idMeal)}>Remove</button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};