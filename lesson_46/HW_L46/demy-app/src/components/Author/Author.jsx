import {getNameInitials} from "./functions";
import styles from "../RviewList/_reviews.module.scss"

export function Author({contentProps}) {
  const {author} = contentProps;
  return (
    <div className={styles.author}>
      <span className={styles['author-initials']}>{getNameInitials(author)}</span>
      <span className={styles['author-name']}>{author}</span>
    </div>
  );
}