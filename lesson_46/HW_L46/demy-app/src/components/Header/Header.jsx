import {Navbar} from "../Navbar";
import {NotificationLine} from "../NotificationLine";
import {useVisibility} from "../../hooks";
import {KEYS} from "../../constants";
import styles from "./_header.module.scss";

export function Header() {
  const keyNotificationLineLocalStorage = KEYS.keyNotificationLineLocalStorage;
  const [isNotificationLineVisible, toggleNotificationLineVisible] = useVisibility(keyNotificationLineLocalStorage, true);

  return (
    <header className={styles.header}>
      { isNotificationLineVisible && <NotificationLine onClick={toggleNotificationLineVisible}/> }
      <div className={styles.wrapper}>
        <Navbar />
      </div>
    </header>
  );
}