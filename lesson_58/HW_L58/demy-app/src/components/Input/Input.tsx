import {FC, ReactNode, ChangeEventHandler, FocusEventHandler} from "react";
import {InputType, AutoCompleteState} from "../../constants";

interface InputProps {
  value: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  children?: ReactNode;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  autoComplete?: AutoCompleteState;
  className?: string;
  type?: InputType;
  name?: string;
  placeholder?: string;
}

export const Input:FC<InputProps> = (
  {
    value,
    onChange,
    children,
    onBlur,
    autoComplete,
    className = '',
    type = InputType.DEFAULT,
    name = '',
    placeholder = '',
  }
) => {
  if (!name) {
    name = type;
  }
  return (
    <label>
      <input className={className}
             onChange={onChange}
             onBlur={onBlur}
             type={type}
             name={name}
             placeholder={placeholder}
             value={value}
             autoComplete={type === InputType.PASSWORD ? AutoCompleteState.ON : autoComplete}
      />
      {children && <span>{children}</span>}
    </label>
  );
};