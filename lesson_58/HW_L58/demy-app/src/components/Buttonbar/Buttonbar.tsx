import {FC} from "react";
import {Button} from "../Button";
import {Theme} from "../../constants";
import {Links} from "../../constants";
import styles from "./_buttonbar.module.scss";

export const Buttonbar: FC = () => {
  return (
    <ul className={styles.list}>
      <li>
        <Button>🛒</Button>
      </li>
      <li>
        <Button theme={Theme.LIGHT}>Log in</Button>
      </li>
      <li>
        <Button link={Links.REGISTRATION} theme={Theme.DARK}>Sign up</Button>
      </li>
      <li>
        <Button theme={Theme.LIGHT}>🌐</Button>
      </li>
    </ul>
  );
};