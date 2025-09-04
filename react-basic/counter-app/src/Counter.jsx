import React, { useEffect, useState } from "react";

/**
 * Counter Component
 * - 3 buttons: Increment, Decrement, Reset
 * - Counter kabhi negative nahi hoga
 * - initialValue prop se start value set hoti hai
 */
export default function Counter({ initialValue = 0 }) {
  // initialValue ko sanitize: negative ho to 0, non-number ho to 0
  const normalizedInitial = Number.isFinite(initialValue) ? Math.max(0, Math.floor(initialValue)) : 0; 

  const [count, setCount] = useState(normalizedInitial);

  // Agar parent se initialValue change ho, to counter ko sync karo
  useEffect(() => {
    setCount(normalizedInitial);
  }, [normalizedInitial]);

  const handleIncrement = () => setCount((c) => c + 1);

  const handleDecrement = () =>
    setCount((c) => (c > 0 ? c - 1 : 0)); // negative block

  const handleReset = () => setCount(normalizedInitial);

  return (
    <div className="counter">
      <div className="value" aria-live="polite">
        {count}
      </div>

      <div className="actions">
        <button onClick={handleIncrement}>Increment</button>
        <button onClick={handleDecrement} disabled={count === 0}>
          Decrement
        </button>
        <button onClick={handleReset} disabled={count === normalizedInitial}>
          Reset
        </button>
      </div>

      <p className="hint">
        (Decrement is disabled at 0. Reset brings it back to <b>{normalizedInitial}</b>.)
      </p>
    </div>
  );
}
