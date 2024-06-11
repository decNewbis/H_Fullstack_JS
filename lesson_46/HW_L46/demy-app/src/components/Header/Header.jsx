import "./_header.scss";

import {Navbar} from "../Navbar";

export function Header() {
  return (
    <header className="header">
      <div className="header__wrapper">
        <Navbar />
      </div>
    </header>
  );
}