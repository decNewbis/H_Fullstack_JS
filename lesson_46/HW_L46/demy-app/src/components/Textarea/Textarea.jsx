import textareaStyles from "./_textarea.module.scss";

export function Textarea({value, rows, cols, placeholder, onChange}) {
  return (
    <textarea
      onChange={onChange}
      className={textareaStyles}
      value={value}
      rows={rows}
      cols={cols}
      placeholder={placeholder}
    />
  );
}