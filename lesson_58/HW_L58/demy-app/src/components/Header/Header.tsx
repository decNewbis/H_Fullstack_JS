import {FC} from "react";
import {Navbar} from "../Navbar";
import {NotificationLine} from "../NotificationLine";
import {useVisibility} from "../../hooks";
import {Keys} from "../../constants";
import styles from "./_header.module.scss";

export const Header: FC = () => {
  const keyNotificationLineLocalStorage = Keys.KEY_NOTIFICATION_LINE_LOCAL_STORAGE;
  const [isNotificationLineVisible, toggleNotificationLineVisible] = useVisibility(keyNotificationLineLocalStorage, true);

  return (
    <header className={styles.header}>
      { isNotificationLineVisible && <NotificationLine onClick={toggleNotificationLineVisible}/> }
      <div className={styles.wrapper}>
        <Navbar />
      </div>
    </header>
  );
};