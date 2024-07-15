import { useState } from 'react';

export const Toggle = () => {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn(!isOn);
  };

  return (
    <div>
      <p>The switch is {isOn ? 'ON' : 'OFF'}</p>
      <button onClick={handleToggle}>{isOn ? 'Turn OFF' : 'Turn ON'}</button>
    </div>
  );
};
