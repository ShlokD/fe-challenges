import { useRef, useState } from "react";

import HomeLink from "../home-link";

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const sec = seconds % 60;
  const secString = sec < 10 ? `0${sec}` : sec;
  return `${minutes}:${secString}`;
};

const MicrowaveApp = () => {
  const [seconds, setSeconds] = useState(0);
  const [mState, setMState] = useState("STOP");

  const interval = useRef<number | null>(null);

  const handleStart = () => {
    if (!interval) return;

    setMState("START");
    interval.current = global.window.setInterval(
      () =>
        setSeconds((prev) => {
          if (prev === 0) {
            if (interval?.current) {
              clearInterval(interval.current);
            }
            setMState("STOP");
            return 0;
          }
          return prev - 1;
        }),
      1000,
    );
  };

  const handleStop = () => {
    if (interval?.current) {
      clearInterval(interval.current);
    }
    setMState("STOP");
  };

  const handleReset = () => {
    if (interval?.current) {
      clearInterval(interval.current);
    }
    setMState("STOP");
    setSeconds(0);
  };

  return (
    <div className="flex flex-col w-full">
      <header className="p-4 bg-blue-800 text-white flex flex-row items-center justify-center gap-2">
        <HomeLink />
        <h1 className="font-bold text-2xl">Microwave</h1>
      </header>
      <main className="flex flex-row w-11/12 gap-2 justify-between items-stretch h-full my-8">
        <div className="bg-blue-400 w-3/4 h-96 ml-4 rounded-tl-3xl rounded-bl-3xl flex items-center justify-center">
          <div className="w-11/12 h-80 bg-gray-100 shadow-inner border-2 border-blue-900 rounded-3xl flex items-center justify-center">
            {mState === "START" && (
              <div className="p-16 bg-orange-300 rounded-full animate-ping"></div>
            )}
          </div>
        </div>
        <div className="bg-blue-400 w-1/4 h-96 flex flex-col rounded-tr-3xl rounded-br-3xl">
          <div className="w-1/2 self-center my-2 text-center text-2xl p-2 rounded-lg bg-blue-100">
            {formatTime(seconds)}
          </div>
          <div className="flex flex-row gap-2 justify-center">
            <button
              onClick={() => setSeconds((prev) => prev + 10)}
              className="p-2 bg-orange-300 rounded-xl text-white font-bold my-4"
            >
              +10s
            </button>
            <button
              onClick={() => setSeconds((prev) => prev + 60)}
              className="p-2 bg-orange-300 rounded-xl text-white font-bold my-4"
            >
              +60s
            </button>
          </div>
          <div className="flex flex-col gap-2 justify-center items-center">
            <button
              onClick={handleStart}
              className="p-2 rounded-xl bg-blue-300 w-11/12 border-2 border-blue-900 hover:bg-blue-400 font-bold"
            >
              Start
            </button>
            <button
              onClick={handleStop}
              className="p-2 rounded-xl bg-blue-300 w-11/12 border-2 border-blue-900 hover:bg-blue-400 font-bold"
            >
              Stop
            </button>
            <button
              onClick={handleReset}
              className="p-2 rounded-xl bg-blue-300 w-11/12 border-2 border-blue-900 hover:bg-blue-400 font-bold"
            >
              Reset
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MicrowaveApp;
