import {FC, ChangeEventHandler} from "react";
import textareaStyles from "./_textarea.module.scss";

interface TextareaProps {
  value: string;
  placeholder: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  rows?: number;
  cols?: number;
  className?: string;
  name?: string;
}

export const Textarea:FC<TextareaProps> = (
  {
    value,
    rows,
    cols,
    placeholder,
    onChange,
    className,
    name
  }) => {
  return (
    <textarea
      onChange={onChange}
      className={`${textareaStyles.textarea} ${className}`}
      value={value}
      rows={rows}
      cols={cols}
      placeholder={placeholder}
      name={name}
    />
  );
};