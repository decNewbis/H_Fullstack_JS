import "./_button.scss";

export function Button({link='#', theme='', children}) {
  return (
      <a href={link} className={`button ${theme}`}>{children}</a>
  );
}