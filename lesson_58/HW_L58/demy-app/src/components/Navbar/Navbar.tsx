import {FC} from "react";
import {Link} from "react-router-dom";
import logo from "../../assets/svg/logo.svg";
import {Search} from "../Search";
import {Buttonbar} from "../Buttonbar";
import {Links} from "../../constants";
import styles from "./_navbar.module.scss";

export const Navbar: FC = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <Link to={Links.HOMEPAGE}>
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
          <Link to={Links.COURSES}>Courses</Link>
        </li>
        <li className={styles.item}>
          <Link to={Links.PROFILE}>Profile</Link>
        </li>
        <li className={styles.item}>
          <Buttonbar />
        </li>
      </ul>
    </nav>
  );
};