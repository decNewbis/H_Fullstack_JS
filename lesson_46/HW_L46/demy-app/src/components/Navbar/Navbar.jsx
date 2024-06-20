import "./_navbar.scss";
import logo from "../../assets/svg/logo.svg";
import {Search} from "../Search";
import {Buttonbar} from "../Buttonbar";

export function Navbar({onClick}) {
  return (
    <nav className="navbar">
      <ul className="navbar__list">
        <li className="navbar__item">
          <a href="/">
            <img src={logo} alt="logo"/>
          </a>
        </li>
        <li className="navbar__item">
          <a href="#">Categories</a>
        </li>
        <li className="navbar__item">
          <Search />
        </li>
        <li className="navbar__item">
          <a href="#">Demy Business</a>
        </li>
        <li className="navbar__item">
          <a href="#">Teach on Demy</a>
        </li>
        <li className="navbar__item">
          <Buttonbar onClick={onClick} />
        </li>
      </ul>
    </nav>
  );
}