import { useState } from 'react';

export const Toggle = () => {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn(!isOn);
  };

  return (
    <div>
      <p data-testid="toggleMessage">The switch is {isOn ? 'ON' : 'OFF'}</p>
      <button data-testid="toggleButton" onClick={handleToggle}>{isOn ? 'Turn OFF' : 'Turn ON'}</button>
    </div>
  );
};
