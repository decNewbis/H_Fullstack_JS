import {Link} from "react-router-dom";
import logo from "../../assets/svg/logo.svg";
import {Search} from "../Search";
import {Buttonbar} from "../Buttonbar";
import {LINKS} from "../../constants";
import "./_navbar.scss";

export function Navbar({onClick}) {
  return (
    <nav className="navbar">
      <ul className="navbar__list">
        <li className="navbar__item">
          <Link to={LINKS.homepage}>
            <img src={logo} alt="logo"/>
          </Link>
        </li>
        <li className="navbar__item">
          <Link to="#">Categories</Link>
        </li>
        <li className="navbar__item">
          <Search />
        </li>
        <li className="navbar__item">
          <Link to="#">Demy Business</Link>
        </li>
        <li className="navbar__item">
          <Link to="#">Teach on Demy</Link>
        </li>
        <li className="navbar__item">
          <Buttonbar onClick={onClick} />
        </li>
      </ul>
    </nav>
  );
}