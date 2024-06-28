import {Button} from "../Button";
import styles from "./_buttonbar.module.scss";

export function Buttonbar({onClick}) {
  return (
    <ul className={styles.list}>
      <li>
        <Button>🛒</Button>
      </li>
      <li>
        <Button theme="light">Log in</Button>
      </li>
      <li>
        <Button link='/registration' theme="dark">Sign up</Button>
      </li>
      <li>
        <Button theme="light">🌐</Button>
      </li>
    </ul>
  );
}