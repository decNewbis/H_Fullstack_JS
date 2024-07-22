import {FC, ReactNode, MouseEventHandler} from "react";
import {Link} from "react-router-dom";
import {Theme} from "../../constants";
import {ButtonType} from "../../constants";
import styles from "./_button.module.scss";

interface EventHandlerProps {
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}

interface ButtonProps extends EventHandlerProps{
  children: ReactNode;
  type?: ButtonType;
  link?: string;
  disabled?: boolean;
  theme?: Theme;
}

interface ReceiveProps extends EventHandlerProps{
  className: string;
}

export const Button:FC<ButtonProps> = (
    {
      type=ButtonType.LINK,
      link='#',
      theme=Theme.DEFAULT,
      onClick,
      disabled=false,
      children
    }) => {
  const receiveProps: ReceiveProps = {
    className: `${styles.button} ${styles[theme] || theme}`,
    onClick: onClick
  }
  if (type === ButtonType.BUTTON) {
    return (
      <button {...receiveProps} disabled={disabled}>{children}</button>
    );
  }
  return (
    <Link to={link} {...receiveProps}>{children}</Link>
  );
};