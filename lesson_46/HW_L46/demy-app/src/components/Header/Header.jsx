import "./_header.scss";

import {Navbar} from "../Navbar";
import {NotificationLine} from "../NotificationLine";

import { useState } from "react";

export function Header() {
  let currentNotificationLineVisible = JSON.parse(localStorage.getItem("currentNotificationLineVisible"));
  if (currentNotificationLineVisible === null) {
    currentNotificationLineVisible = true;
  }
  const [isNotificationLineVisible, setNotificationVisible] = useState(currentNotificationLineVisible);
  const toggleNotificationLineVisible = () => {
    const currentState = !isNotificationLineVisible;
    setNotificationVisible(currentState);
    localStorage.setItem("currentNotificationLineVisible", JSON.stringify(currentState));
  }
  return (
    <header className="header">
      {
        isNotificationLineVisible
          ? <NotificationLine onClick={toggleNotificationLineVisible}/>
          : null
      }
      <div className="header__wrapper">
        <Navbar />
      </div>
    </header>
  );
}