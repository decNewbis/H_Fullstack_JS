import "./_button.scss";
import {Buttonbar} from "../Buttonbar";

function handlerClick(event, func) {
  if (func) {
    event.preventDefault();
    func();
  } else {
    return null;
  }
}

export function Button({type='link', link='#', theme='', onClick, disabled=false, children}) {
  const receiveProps = {
    className: `button ${theme}`,
    onClick: (event) => handlerClick(event, onClick)
  }
  if (type === "button") {
    return (
      <button {...receiveProps} disabled={disabled}>{children}</button>
    );
  }
  return (
    <a href={link} {...receiveProps}>{children}</a>
  );
}