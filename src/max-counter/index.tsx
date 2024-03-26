import { useEffect, useRef, useState } from "react";

import HomeLink from "../home-link";

const Counter = ({
  time,
  handleChange,
}: {
  time: number;
  handleChange: (value: number) => void;
}) => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount((prev) => prev + 1);
    handleChange(1);
  };

  const decrement = () => {
    setCount((prev) => prev - 1);
    handleChange(-1);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-lg">Counter will expire in {time}</p>
      <div className="flex  gap-2 items-center justify-center">
        <button
          className="text-xl font-bold bg-blue-400 rounded-full w-8 h-8"
          onClick={decrement}
        >
          -
        </button>
        <p className="text-4xl font-bold">{count}</p>
        <button
          className="text-xl font-bold bg-blue-400 rounded-full w-8 h-8"
          onClick={increment}
        >
          +
        </button>
      </div>
    </div>
  );
};

const MaxCounter = () => {
  const [count, setCount] = useState(0);
  const [counters, setCounters] = useState(new Array(1).fill(10));
  const timer = useRef<number | null>(null);

  const handleChange = (value: number) => {
    setCount((prev) => prev + value);
  };

  const addCounter = () => {
    setCounters((prev) => [...prev, 10]);
  };

  useEffect(() => {
    timer.current = window.setInterval(() => {
      setCounters((prev) => {
        return prev.map((val) => (val === 0 ? 0 : val - 1));
      });
    }, 1000);

    return () => {
      if (timer.current) {
        clearInterval(timer.current);
      }
    };
  }, []);
  return (
    <div className="flex flex-col w-screen h-full">
      <header className="bg-yellow-400 flex flex-row items-center w-full justify-center font-bold lg:justify-center lg:gap-6 py-4 px-2">
        <HomeLink />
        <h1 className="text-2xl font-bold">Max Time Counter</h1>
      </header>

      <main className="flex flex-col w-screen min-h-screen items-center py-8 px-4 gap-4">
        <h2 className="text-4xl  font-bold">Total {count}</h2>
        {counters.map((c, i) => {
          return (
            c > 0 && (
              <Counter
                handleChange={handleChange}
                key={`counter-${i}`}
                time={c}
              />
            )
          );
        })}
        <button
          onClick={addCounter}
          className="py-4 px-6 rounded-full bg-blue-400 hover:bg-blue-600 font-bold text-2xl"
        >
          Add
        </button>
      </main>
    </div>
  );
};

export default MaxCounter;
