import "./_header.scss";
import {Navbar} from "../Navbar";
import {NotificationLine} from "../NotificationLine";
import {useVisibility} from "../../hooks";
import {SignUp} from "../SignUp";

export function Header() {
  const keyNotificationLineLocalStorage = "currentNotificationLineVisible";
  const keySignUpLocalStorage = "currentSignUpVisible";
  const [isNotificationLineVisible, toggleNotificationLineVisible] = useVisibility(keyNotificationLineLocalStorage, true);
  const [isSignUpVisible, toggleSignUpVisible] = useVisibility(keySignUpLocalStorage, false);

  return (
    <header className="header">
      { isNotificationLineVisible && <NotificationLine onClick={toggleNotificationLineVisible}/> }
      <div className="header__wrapper">
        <Navbar onClick={toggleSignUpVisible} />
        { isSignUpVisible && <SignUp onClick={toggleSignUpVisible}/> }
      </div>
    </header>
  );
}