import { useRef, useState } from "react";

import HomeLink from "../home-link";

const getTimeString = (time: number) => {
  const date = new Date(time * 10);

  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getSeconds();
  const milliseconds = date.getMilliseconds();

  const timeString =
    hours.toString().padStart(2, "0") +
    ":" +
    minutes.toString().padStart(2, "0") +
    ":" +
    seconds.toString().padStart(2, "0");
  return {
    timeString,
    milliseconds: "." + milliseconds.toString().padStart(3, "0"),
  };
};

const Stopwatch = () => {
  const [splits, setSplits] = useState<string[]>([]);
  const [time, setTime] = useState(0);
  const [timerState, setTimerState] = useState("PAUSE");
  const timerRef = useRef<number | null>(null);
  const { timeString, milliseconds } = getTimeString(time);

  const handleReset = () => {
    setSplits([]);
    setTime(0);
    setTimerState("PAUSE");
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };
  const handleSplit = () => {
    const { timeString, milliseconds } = getTimeString(time);
    setSplits((prev) => [...prev, timeString + milliseconds]);
    setTime(0);
  };

  const handleStartStop = () => {
    if (timerState === "PAUSE") {
      setTimerState("START");
      timerRef.current = window.setInterval(() => {
        setTime((prev) => prev + 1);
      }, 10);
    } else if (timerState === "START") {
      setTimerState("PAUSE");
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };
  return (
    <div className="flex flex-col w-full">
      <header className="bg-yellow-600 p-4 flex justify-center gap-4 items-center">
        <HomeLink />
        <h1 className="text-white font-bold self-center text-2xl">Stopwatch</h1>
      </header>
      <main className="flex flex-col w-full  min-h-screen">
        <div className="flex flex-col w-full justify-center items-center my-8 p-8">
          <p className="text-6xl font-bold" style={{ letterSpacing: "4px" }}>
            {timeString}
          </p>
          <p className="text-lg font-bold">{milliseconds}</p>
        </div>
        <div className="flex w-full justify-center gap-4">
          <button
            className="p-8 bg-green-400 text-3xl font-bold text-white rounded-xl"
            onClick={handleStartStop}
          >
            {timerState === "PAUSE" ? "Start" : "Stop"}
          </button>
          <button
            className="p-8 bg-yellow-400 text-3xl font-bold text-white rounded-xl"
            onClick={handleSplit}
          >
            Split
          </button>
          <button
            className="p-8 bg-blue-400 text-3xl font-bold text-white rounded-xl"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
        <div className="flex flex-col justify-center my-8">
          {splits.map((split, i) => {
            return (
              <p key={`split-${i}`} className="text-2xl p-4 border-b-2 w-full">
                #{i + 1} {split}
              </p>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Stopwatch;
