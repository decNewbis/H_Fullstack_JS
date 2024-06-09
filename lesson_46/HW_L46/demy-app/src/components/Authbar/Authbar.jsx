import "./_authbar.scss";
import {Button} from "../Button";

export function Authbar() {
  return (
    <ul className="authbar__list">
      <li className="authbar__item">
        <Button>🛒</Button>
      </li>
      <li className="authbar__item">
        <Button theme="light">Log in</Button>
      </li>
      <li className="authbar__item">
        <Button theme="dark">Sign up</Button>
      </li>
      <li className="authbar__item">
        <Button theme="light">🌐</Button>
      </li>
    </ul>
  );
}