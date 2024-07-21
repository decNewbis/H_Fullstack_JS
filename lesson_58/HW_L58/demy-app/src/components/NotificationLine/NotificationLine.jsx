import styles from "./_notification-line.module.scss";

export function NotificationLine({onClick}) {

  return (
    <div className={styles.notification}>
      <div className={styles.wrapper}>
          <div className={styles.line}>
            <span className={styles.close} onClick={onClick}>x</span>
            <span className={styles.message}>
              New to Demy? Learning leds to opportunity
            </span>
            <span> | </span>
            <span>
              Shop now to get an exclusive offer: Courses from €14.99.
            </span>
          </div>
          <div className={styles.line}>
            <span className={styles.deadline}>Ends</span>
            <span className={styles.date}>12.06.24</span>
          </div>
      </div>
    </div>
  );
}