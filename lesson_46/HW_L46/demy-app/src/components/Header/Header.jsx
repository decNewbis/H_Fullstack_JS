import "./_header.scss";
import {Navbar} from "../Navbar";
import {NotificationLine} from "../NotificationLine";
import {useVisibility} from "../../hooks";
import {KEYS} from "../../constants";

export function Header() {
  const keyNotificationLineLocalStorage = KEYS.keyNotificationLineLocalStorage;
  const [isNotificationLineVisible, toggleNotificationLineVisible] = useVisibility(keyNotificationLineLocalStorage, true);

  return (
    <header className="header">
      { isNotificationLineVisible && <NotificationLine onClick={toggleNotificationLineVisible}/> }
      <div className="header__wrapper">
        <Navbar />
      </div>
    </header>
  );
}