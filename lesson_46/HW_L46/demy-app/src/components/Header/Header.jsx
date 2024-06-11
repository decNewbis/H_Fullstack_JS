import "./_header.scss";

import {Navbar} from "../Navbar";
import {NotificationLine} from "../NotificationLine";

export function Header() {
  return (
    <header className="header">
      <NotificationLine />
      <div className="header__wrapper">
        <Navbar />
      </div>
    </header>
  );
}