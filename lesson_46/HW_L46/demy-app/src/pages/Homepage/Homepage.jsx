import styles from './_homepage.module.scss';
import {Partners} from "../../components/Partners";
import {ReviewList} from "../../components/RviewList";

export function Homepage() {
  return (
    <section>
      <div className={`${styles.wrapper} ${styles['background-image']}`}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Jump into learning for less
          </h1>
          <p className={styles.paragraph}>
            If you are new to Demy, we've got good news: For a limited time, courses start at just €14.99 for new
            learners. Shop now!
          </p>
        </div>
      </div>
      <Partners />
      <ReviewList />
    </section>
  );
}