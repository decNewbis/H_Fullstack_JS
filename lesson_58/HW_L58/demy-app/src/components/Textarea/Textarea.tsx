import {FC, ChangeEventHandler} from "react";
import textareaStyles from "./_textarea.module.scss";

interface TextareaProps {
  value: string;
  rows: number;
  cols: number;
  placeholder: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  name?: string;
}

export const Textarea:FC<TextareaProps> = (
  {
    value,
    rows,
    cols,
    placeholder,
    onChange,
    name
  }) => {
  return (
    <textarea
      onChange={onChange}
      className={textareaStyles.textarea}
      value={value}
      rows={rows}
      cols={cols}
      placeholder={placeholder}
      name={name}
    />
  );
};