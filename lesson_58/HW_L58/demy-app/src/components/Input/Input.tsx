import {FC, ReactNode, ChangeEventHandler, FocusEventHandler} from "react";
import {InputType, AutoCompleteState} from "../../constants";

interface InputProps {
  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlur: FocusEventHandler<HTMLInputElement>;
  autoComplete: AutoCompleteState;
  children: ReactNode;
  className?: string;
  type?: InputType;
  name?: string;
  placeholder?: string;
  value?: string;
}

export const Input:FC<InputProps> = (
  {
    onChange,
    onBlur,
    autoComplete,
    children},
    className='',
    type = InputType.DEFAULT,
    name='',
    placeholder='',
    value='',
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
}