export const Input = (
  {
    className='',
    onChange,
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