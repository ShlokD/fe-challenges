import { useState } from "react";

import HomeLink from "../home-link";

type Counter = {
  name: string;
  count: number;
};

const MultiCounter = () => {
  const [counters, setCounters] = useState<Counter[]>([]);
  const [name, setName] = useState("");
  const handleAddCounter = () => {
    if (!name) {
      return;
    }

    setCounters((prev) => [...prev, { name, count: 0 }]);
    setName("");
  };

  const total = counters.reduce((total, counter) => {
    return total + counter.count;
  }, 0);

  const handleDecrement = (index: number) => {
    setCounters((prev) => {
      const newcounters = prev.slice();
      newcounters[index].count--;
      return newcounters;
    });
  };

  const handleIncrement = (index: number) => {
    setCounters((prev) => {
      const newcounters = prev.slice();
      newcounters[index].count++;
      return newcounters;
    });
  };

  return (
    <div className="flex flex-col w-full">
      <header className="p-4 bg-pink-400 flex flex-row items-center justify-center gap-2">
        <HomeLink />
        <h1 className="font-bold text-2xl">Multi Counter</h1>
      </header>
      <main className="flex flex-col my-2">
        <div className="p-2 flex flex-row items-center justify-center gap-2">
          <input
            className="p-4 border-2"
            aria-label="Counter Name"
            placeholder="Enter counter name"
            value={name}
            onChange={(ev) => setName((ev?.target as HTMLInputElement)?.value)}
          />
          <button
            className="bg-pink-500 text-2xl text-white h-12 w-12 rounded-full"
            onClick={handleAddCounter}
            aria-label="Add"
          >
            +
          </button>
        </div>
        <hr className="w-full my-2" />
        <div className="flex flex-col w-screen items-center justify-center">
          {counters?.map((counter, index) => {
            return (
              <div key={`counter-${index}`}>
                <div className="flex flex-row w-screen items-center justify-evenly my-2">
                  <p className="text-2xl font-bold">{counter.name}</p>
                  <div className="flex flex-row gap-2 items-center">
                    <button
                      className="bg-pink-500 text-xl text-white h-8 w-8 rounded-full"
                      aria-label={`decrement ${counter.name}`}
                      onClick={() => handleDecrement(index)}
                    >
                      -
                    </button>
                    <p className="text-xl p-2">{counter.count}</p>
                    <button
                      aria-label={`increment ${counter.name}`}
                      className="bg-pink-500 text-xl text-white h-8 w-8 rounded-full"
                      onClick={() => handleIncrement(index)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <hr className="w-screen" />
              </div>
            );
          })}
        </div>
        <p className="text-xl p-2 self-end">Total: {total}</p>
      </main>
    </div>
  );
};

export default MultiCounter;
