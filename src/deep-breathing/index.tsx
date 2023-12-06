import { useRef, useState } from "react";

import HomeLink from "../home-link";

enum AppState {
  INIT,
  INHALE,
  HOLD,
  EXHALE,
}

const messages: Record<AppState, string> = {
  [AppState.INIT]: "Begin",
  [AppState.INHALE]: "Inhale",
  [AppState.HOLD]: "Hold",
  [AppState.EXHALE]: "Exhale",
};

const scales: Record<AppState, number> = {
  [AppState.INIT]: 1,
  [AppState.HOLD]: 2,
  [AppState.INHALE]: 2,
  [AppState.EXHALE]: 1,
};

const colors: Record<AppState, string> = {
  [AppState.INIT]: "bg-blue-400",
  [AppState.INHALE]: "bg-purple-600",
  [AppState.HOLD]: "bg-pink-400",
  [AppState.EXHALE]: "bg-green-500",
};
const DeepBreathing = () => {
  const [appState, setAppState] = useState<AppState>(AppState.INIT);
  const [showSettings, setShowSettings] = useState(false);
  const [breathDuration, setBreathDuration] = useState(4);
  const [holdDuration, setHoldDuration] = useState(2);

  const intervalRef = useRef<number | null>(null);
  const holdRef = useRef<number | null>(null);
  const exhaleRef = useRef<number | null>(null);

  const toggleSettings = () => {
    setShowSettings((prev) => !prev);
  };

  const cycle = () => {
    setAppState(AppState.INHALE);
    if (holdDuration > 0) {
      holdRef.current = window.setTimeout(
        () => setAppState(AppState.HOLD),
        breathDuration * 1000,
      );
    }
    exhaleRef.current = window.setTimeout(
      () => setAppState(AppState.EXHALE),
      (breathDuration + holdDuration) * 1000,
    );
  };

  const start = () => {
    if (appState !== AppState.INIT) {
      setAppState(AppState.INIT);
      if (intervalRef?.current) {
        clearInterval(intervalRef?.current);
      }
      if (holdRef?.current) {
        clearTimeout(holdRef?.current);
      }
      if (exhaleRef?.current) {
        clearTimeout(exhaleRef?.current);
      }
      return;
    } else {
      cycle();
      intervalRef.current = window.setInterval(() => {
        console.log("hello");
        cycle();
      }, (2 * breathDuration + holdDuration) * 1000);
    }
  };

  const duration = appState === AppState.HOLD ? holdDuration : breathDuration;

  return (
    <div className="flex flex-col w-screen h-full">
      <header className="bg-red-400 flex flex-row items-center w-full justify-center font-bold lg:justify-center lg:gap-6 py-4 px-2">
        <HomeLink />
        <h1 className="text-2xl font-bold">Deep Breathing</h1>
      </header>

      <main className="flex flex-col w-screen min-h-screen items-center py-8 px-4">
        <p
          className={`${colors[appState]} border-dotted shadow-2xl shadow-yellow-500 w-48 h-48 text-center border-4 border-white flex items-center text-center text-3xl justify-center rounded-full text-white font-bold  mt-20 mb-32`}
          style={{
            transform: `scale(${scales[appState]})`,
            transition: `transform ${duration}s, background-color ${duration}s`,
            transformOrigin: "center",
          }}
        >
          {messages[appState]}
        </p>
        <div className="flex gap-4">
          <button
            onClick={start}
            className="p-4 rounded-lg font-bold text-3xl bg-green-600 text-white"
          >
            {appState === AppState.INIT ? "Start" : "Stop"}
          </button>
          <button
            className="p-4 rounded-lg font-bold text-3xl bg-green-600 text-white"
            onClick={toggleSettings}
          >
            Settings
          </button>
        </div>
        <div
          className={`flex flex-col p-4 w-full justify-center gap-8 items-center`}
          style={{
            transform: `scaleY(${showSettings ? "1" : "0"})`,
            transition: `transform 400ms ease-in-out`,
            transformOrigin: "top",
          }}
        >
          <div className="flex flex-col gap-2 w-1/2 p-4">
            <label className="font-bold text-2xl" htmlFor="breath">
              Breathe: {breathDuration}s
            </label>
            <input
              id="breath"
              type="range"
              className="w-2/3"
              min={2}
              max={8}
              value={breathDuration}
              onChange={(ev) => setBreathDuration(Number(ev?.target?.value))}
            />
          </div>

          <div className="flex flex-col gap-2 w-1/2 p-4">
            <label className="font-bold text-2xl" htmlFor="breath">
              Hold: {holdDuration}s
            </label>
            <input
              id="hold"
              type="range"
              className="w-2/3"
              min={0}
              max={6}
              value={holdDuration}
              onChange={(ev) => setHoldDuration(Number(ev?.target?.value))}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DeepBreathing;
