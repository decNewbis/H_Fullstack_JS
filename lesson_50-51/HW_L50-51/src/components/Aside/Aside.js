import { AsideCategory } from "../AsideCategory";
import styles from "./aside.module.css";

export const Aside = () => {
  return (
    <aside className={styles.aside}>
      <AsideCategory />
    </aside>
  )
}