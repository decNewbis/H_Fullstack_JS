import quoteIcon from "../../assets/png/reviews/quotes.png";
import {Author} from "../Author";
import {Course} from "../Course";
import styles from "../RviewList/_reviews.module.scss"

export function Review({contentProps}) {
  const {text} = contentProps;
  return (
    <div className={styles.container}>
      <div>
        <img className={styles.quote} src={quoteIcon} alt="illustation of quote"/>
        <span className={styles.text}>{text}</span>
      </div>
      <div>
        <Author contentProps={contentProps} />
        <hr className={styles['dividing-line']}/>
        <Course contentProps={contentProps} />
      </div>
    </div>
  );
}