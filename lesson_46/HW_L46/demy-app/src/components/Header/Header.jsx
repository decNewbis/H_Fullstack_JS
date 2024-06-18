import "./_header.scss";
import {Navbar} from "../Navbar";
import {NotificationLine} from "../NotificationLine";
import {useVisibility} from "../../hooks";

export function Header() {
  const keyLocalStorage = "currentNotificationLineVisible";
  const [isNotificationLineVisible, toggleNotificationLineVisible] = useVisibility(keyLocalStorage, true);
  return (
    <header className="header">
      { isNotificationLineVisible && <NotificationLine onClick={toggleNotificationLineVisible}/> }
      <div className="header__wrapper">
        <Navbar />
      </div>
    </header>
  );
}