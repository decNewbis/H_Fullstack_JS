import "./_buttonbar.scss";
import {Button} from "../Button";

export function Buttonbar({onClick}) {
  return (
    <ul className="authbar__list">
      <li className="authbar__item">
        <Button>🛒</Button>
      </li>
      <li className="authbar__item">
        <Button theme="light">Log in</Button>
      </li>
      <li className="authbar__item">
        <Button theme="dark" onClick={onClick}>Sign up</Button>
      </li>
      <li className="authbar__item">
        <Button theme="light">🌐</Button>
      </li>
    </ul>
  );
}