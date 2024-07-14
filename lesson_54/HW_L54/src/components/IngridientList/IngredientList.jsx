import styles from './style.module.css';
import {useTheme} from "../../context/themeContext";

export const IngredientList = ({ ingredients }) => {
  const { theme, setTheme } = useTheme();

  const changeTheme = () => {
    setTheme(theme)
  }

  return (
    <>
    <ul className={styles.list}>
      {ingredients.map(({ingredient, image}) => {
        return (
          <li key={ingredient} className={styles.item}>
            <img
              className={styles.image}
              src={image}
              alt={ingredient}
            />
            {ingredient}
          </li>
        );
      })}
    </ul>
    <button onClick={changeTheme}>Change theme (currently: {theme})</button>
    </>
  )
}