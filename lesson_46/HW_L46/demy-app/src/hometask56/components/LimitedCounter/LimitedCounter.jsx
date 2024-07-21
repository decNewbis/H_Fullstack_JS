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
      <p data-testid="displayCount">Count: {count}</p>
      <button data-testid="incrementButton" onClick={increment} disabled={count >= max}>Increment</button>
      <button data-testid="decrementButton" onClick={decrement} disabled={count <= 0}>Decrement</button>
    </div>
  );
};
