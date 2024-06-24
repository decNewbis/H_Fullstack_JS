export const Input = (
  {
    className='',
    onChange,
    onBlur=null,
    type = "text",
    name='',
    placeholder='',
    value='',
    autoComplete=null,
    children}
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
             autoComplete={type === "password" ? "on" : autoComplete}
      />
      {children && <span>{children}</span>}
    </label>
  );
}