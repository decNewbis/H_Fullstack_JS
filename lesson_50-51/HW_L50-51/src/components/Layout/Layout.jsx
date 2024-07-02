import { Outlet } from "react-router-dom";
import { Header } from "../Header";
import { Aside } from "../Aside";
import { Footer } from "../Footer";
import styles from "./layout.module.css";

export const Layout = () => {
  return (
    <div className="content">
      <Header />
      <div className={styles.layout}>
        <Aside />
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}