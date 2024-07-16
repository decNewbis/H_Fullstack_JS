import { useState } from 'react';

export const CharacterCounter = () => {
  const [text, setText] = useState('');

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div>
      <textarea data-testid="textarea" value={text} onChange={handleChange} placeholder="Type something..." />
      <p data-testid="charCount">Character count: {text.length}</p>
    </div>
  );
};
