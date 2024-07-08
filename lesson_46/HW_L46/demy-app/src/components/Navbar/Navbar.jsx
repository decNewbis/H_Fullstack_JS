import {Link} from "react-router-dom";
import logo from "../../assets/svg/logo.svg";
import {Search} from "../Search";
import {Buttonbar} from "../Buttonbar";
import {LINKS} from "../../constants";
import styles from "./_navbar.module.scss";

export function Navbar({onClick}) {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <Link to={LINKS.homepage}>
            <img src={logo} alt="logo"/>
          </Link>
        </li>
        <li className={styles.item}>
          <Link to="#">Categories</Link>
        </li>
        <li className={styles.item}>
          <Search />
        </li>
        <li className={styles.item}>
          <Link to={LINKS.courses}>Courses</Link>
        </li>
        <li className={styles.item}>
          <Link to={LINKS.profile}>Profile</Link>
        </li>
        <li className={styles.item}>
          <Buttonbar onClick={onClick} />
        </li>
      </ul>
    </nav>
  );
}