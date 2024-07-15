import { useState } from 'react';

export const LimitedCounter = ({ max }) => {
  const [count, setCount] = useState(0);

  const increment = () => {
    if (count < max) {
      setCount(count + 1);
    }
  };

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment} disabled={count >= max}>Increment</button>
      <button onClick={decrement} disabled={count <= 0}>Decrement</button>
    </div>
  );
};
