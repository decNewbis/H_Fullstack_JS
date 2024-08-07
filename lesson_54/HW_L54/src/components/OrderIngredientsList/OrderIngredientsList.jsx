import styles from "./orderIngredientsList.module.css";
import {API} from "../../constants";

export const OrderIngredientsList = ({ingredients}) => {
  return (
    <ul className={styles.list}>
      {Object.keys(ingredients).map((key) => {
        return (
          <li key={key} className={styles.item}>
            <div className={styles.group}>
              <img className={styles.image} src={`${API.ingredientImage}${key}-small.png`} alt={`Illustration of ${key}`}/>
              <span>{key}</span>
            </div>
            <div className={styles.group}>
              <span>{ingredients[key]?.quantity}</span>
              <span>{ingredients[key]?.unit}</span>
            </div>
          </li>
        );
      })
      }
    </ul>
  );
};