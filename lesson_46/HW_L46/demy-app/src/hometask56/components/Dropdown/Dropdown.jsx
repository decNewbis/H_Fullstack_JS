import { useState } from 'react';

export const Dropdown = () => {
  const [selected, setSelected] = useState('');

  const handleSelect = (event) => {
    setSelected(event.target.value);
  };

  return (
    <div>
      <select value={selected} onChange={handleSelect}>
        <option value="">Select an option</option>
        <option value="Option 1">Option 1</option>
        <option value="Option 2">Option 2</option>
        <option value="Option 3">Option 3</option>
      </select>
      {selected && <p>You selected: {selected}</p>}
    </div>
  );
};
