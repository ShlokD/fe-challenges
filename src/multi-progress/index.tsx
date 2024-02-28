import { useEffect, useRef, useState } from "react";

import HomeLink from "../home-link";

type ProgressBarProps = {
  id: number;
  onEnd: () => void;
};

const ProgressBar = ({ id, onEnd }: ProgressBarProps) => {
  const [value, setValue] = useState(0);
  const [pause, setPause] = useState(false);
  const timerRef = useRef<number | null>(null);

  const startTimer = () => {
    setPause(false);
    timerRef.current = window.setInterval(() => {
      let done = false;
      setValue((prev) => {
        if (prev === 100) {
          done = true;
          return prev;
        } else {
          return prev + 10;
        }
      });
      if (done) {
        onEnd();
        if (timerRef?.current) {
          clearInterval(timerRef.current);
        }
      }
    }, 1000);
  };

  const togglePause = () => {
    setPause((prev) => {
      const paused = !prev;
      if (paused) {
        if (timerRef?.current) {
          clearInterval(timerRef.current);
        }
      } else {
        startTimer();
      }
      return paused;
    });
  };

  useEffect(() => {
    setValue(0);
    startTimer();
  }, [id]);

  return (
    <div className="w-full flex gap-8 my-4 items-center justify-center">
      <button className="bg-black text-white p-2" onClick={togglePause}>
        {pause ? "start" : "pause"}
      </button>
      <progress className="multi-progress w-3/4" value={value} max={100} />
    </div>
  );
};
const MultiProgress = () => {
  const [queue, setQueue] = useState<number[]>([]);
  const waiting = useRef<number>(0);

  const addProgressBar = () => {
    if (queue.length < 3) {
      setQueue((prev) => [...prev, Math.random()]);
    } else {
      setQueue((prev) => [...prev]);
      waiting.current += 1;
    }
  };

  const handleEnd = (index: number) => {
    setQueue((prev) => {
      const newQueue = [...prev];
      if (waiting.current !== 0) {
        newQueue[index] = Math.random();
        waiting.current -= 1;
      } else {
        newQueue[index] = -1;
      }

      return newQueue;
    });
  };

  return (
    <div className="flex flex-col w-full min-h-screen">
      <header className="p-4 bg-red-500 text-white flex flex-row items-center justify-center gap-2">
        <div className="p-2 bg-white">
          <HomeLink />
        </div>
        <h1 className="font-bold text-2xl">Multi-Progress</h1>
      </header>
      <main className="flex flex-col w-full min-h-screen items-center p-2">
        <button
          onClick={addProgressBar}
          className="p-4 text-lg font-bold rounded-lg bg-red-400"
        >
          Add
        </button>
        <p className="p-2 text-lg font-bold">
          Bars in Queue: {waiting.current}
        </p>
        <div className="flex flex-col gap-2 my-4 w-2/3 self-center">
          {queue.map((v, i) => {
            return (
              v !== -1 && (
                <ProgressBar
                  key={`bar-${i}`}
                  onEnd={() => handleEnd(i)}
                  id={v}
                />
              )
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default MultiProgress;
