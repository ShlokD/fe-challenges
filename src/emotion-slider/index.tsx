import { useState } from "react";

import HomeLink from "../home-link";

const colors: Record<number, string> = {
  1: "bg-blue-300",
  2: "bg-purple-300",
  3: "bg-yellow-300",
  4: "bg-pink-300",
  5: "bg-red-300",
};

const EmotionSlider = () => {
  const [value, setValue] = useState(1);

  const handleValueChange = (val: string) => {
    const number = Number(val);
    if (!isNaN(number)) {
      setValue(number);
    }
  };

  const suffix = Math.floor(value);

  return (
    <div className="flex flex-col w-screen h-full">
      <header className="bg-orange-400 flex flex-row items-center w-full justify-center font-bold lg:justify-center lg:gap-6 py-4 px-2">
        <HomeLink />
        <h1 className="text-2xl font-bold">Emotions Slider</h1>
      </header>
      <main className="flex flex-col w-full min-h-screen">
        <div
          className={`${colors[suffix]} flex flex-col items-center gap-2 w-full min-h-screen p-8 transition-all duration-500`}
        >
          <img
            src={`/emotions/anim${suffix}.gif`}
            alt="Selected Emotion"
            style={{
              height: "66vh",
            }}
          />
          <input
            className="self-center w-2/3 lg:w-1/3 p-8 h-auto"
            type="range"
            aria-label="Change value"
            min={1}
            max={5.5}
            step={0.1}
            value={value}
            onChange={(ev) => handleValueChange(ev.target.value)}
          />
        </div>
      </main>
    </div>
  );
};

export default EmotionSlider;
