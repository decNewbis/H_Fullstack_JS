import "./_button.scss";

export function Button({theme, children}) {
  return (
    <button className={`button ${theme}`}>{children}</button>
  );
}