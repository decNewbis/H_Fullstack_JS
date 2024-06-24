import styles from './_homepage.module.scss';
import {Partners} from "../Partners";
import {ReviewList} from "../RviewList";

export function Homepage() {
  return (
    <section>
      <div className={`${styles.wrapper} ${styles.backgroundImage}`}>
        <div className={`${styles.content}`}>
          <h1 className={`${styles.title}`}>
            Jump into learning for less
          </h1>
          <p className={`${styles.paragraph}`}>
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