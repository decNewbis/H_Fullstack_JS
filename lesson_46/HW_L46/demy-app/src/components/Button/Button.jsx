import {Link} from "react-router-dom";
import "./_button.scss";

export function Button({type='link', link='#', theme='', onClick, disabled=false, children}) {
  const receiveProps = {
    className: `button ${theme}`,
    onClick: onClick
  }
  if (type === "button") {
    return (
      <button {...receiveProps} disabled={disabled}>{children}</button>
    );
  }
  return (
    <Link to={link} {...receiveProps}>{children}</Link>
  );
}