import { useState } from "react";

export default function Counter() {
  const [counter, setCounter] = useState<number>(0);

  function handleIncrement() {
    setCounter((prev) => prev + 1);
  }
  return (
    <div>
      Counter
      {counter}
      <button onClick={handleIncrement}>Increment</button>
    </div>
  );
}
