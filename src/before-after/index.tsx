import { useState } from "react";

import HomeLink from "../home-link";

const BeforeAfter = () => {
  const [clip, setClip] = useState(50);
  return (
    <div className="flex flex-col items-center w-full h-full">
      <header className="flex p-2 w-full h-full bg-red-400 text-white items-center justify-center">
        <HomeLink />
        <h1 className="text-4xl py-2 font-bold">Before After Slider</h1>
      </header>
      <main
        className="flex p-4 flex-col w-full gap-2 items-center relative"
        style={{
          height: "78vh",
        }}
      >
        <input
          className="w-1/2"
          type="range"
          min={0}
          max={100}
          value={clip}
          aria-label="Change display"
          onChange={(ev) => setClip(Number(ev?.target?.value))}
        />
        <div className="flex items-start w-1/3 justify-center relative mt-12">
          <img
            src="/before.jpg"
            className="w-full absolute top-0"
            alt="Before"
            style={{
              userSelect: "none",
            }}
          />
          <img
            src="/after.jpg"
            className="w-full absolute top-0"
            style={{
              clipPath: `polygon(${clip}% 0%, 100% 0%, 100% 100%, ${clip}% 100%)`,
              userSelect: "none",
            }}
            alt="After"
          />
        </div>
        <div className="flex gap-2 z-20 absolute bottom-0">
          <button
            className="bg-black text-white w-1/2  p-4 text-2xl rounded-xl"
            onClick={() => setClip(0)}
          >
            Before
          </button>
          <button
            className="bg-black text-white w-1/2 p-4 text-2xl rounded-xl"
            onClick={() => setClip(100)}
          >
            After
          </button>
        </div>
      </main>
    </div>
  );
};

export default BeforeAfter;
