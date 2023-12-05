import { useEffect, useRef, useState } from "react";

import HomeLink from "../home-link";

const audio = new Audio("sounds/click.mp3");
const getColor = (bpm: number) => {
  if (bpm >= 220) {
    return "bg-red-200";
  } else if (bpm >= 180) {
    return "bg-orange-400";
  } else if (bpm >= 140) {
    return "bg-pink-400";
  } else if (bpm >= 100) {
    return "bg-yellow-400";
  } else if (bpm >= 60) {
    return "bg-green-400";
  } else {
    return "bg-blue-400";
  }
};

const Metronome = () => {
  const [bpm, setBPM] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const handleChange = (value: number) => {
    setIsPlaying(false);
    setBPM(value);
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  useEffect(() => {
    playSound();
  }, [isPlaying]);

  const pulse = (60 * 1000) / bpm;

  const playSound = () => {
    if (isPlaying) {
      intervalRef.current = window.setInterval(() => {
        audio.play();
        audio.currentTime = 0;
      }, pulse);
    } else {
      if (intervalRef?.current) {
        clearInterval(intervalRef.current);
      }
    }
  };

  const color = getColor(bpm);

  return (
    <div className="flex flex-col w-full">
      <header className="bg-orange-400 flex flex-row items-center w-full justify-center font-bold lg:justify-center lg:gap-6 py-4 px-2">
        <HomeLink />
        <h1 className="font-bold text-2xl">Metronome</h1>
      </header>
      <main className="flex flex-col w-full min-h-screen items-center p-20">
        <div className="flex items-center justify-center-2">
          <button
            className="text-5xl font-bold p-6"
            disabled={bpm <= 40}
            aria-label="Decrease BPM"
            onClick={() => handleChange(bpm <= 40 ? bpm : bpm - 1)}
          >
            -
          </button>
          <label className="text-center flex items-center gap-1" htmlFor="bpm">
            <span className="text-6xl font-bold">{bpm}</span> BPM
          </label>
          <button
            className="text-5xl font-bold p-6"
            disabled={bpm >= 220}
            aria-label="Increase BPM"
            onClick={() => handleChange(bpm >= 220 ? bpm : bpm + 1)}
          >
            +
          </button>
        </div>

        <div className="flex gap-2 my-4 w-5/6 items-center justify-center w-full">
          <input
            id="bpm"
            type="range"
            className={`${color} w-2/3`}
            min={40}
            max={220}
            value={bpm}
            onChange={(ev) => handleChange(Number(ev.target.value))}
          ></input>
          <button
            onClick={togglePlay}
            className={`${color} p-4 w-1/3 font-bold text-2xl rounded-full text-white ${
              isPlaying ? "animate-pulse" : ""
            }`}
            style={{
              transition: "background-color 200ms ease-in-out",
              animationDuration: `${pulse}ms`,
            }}
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Metronome;
