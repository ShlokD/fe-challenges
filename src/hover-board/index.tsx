import { useState } from "react";

import HomeLink from "../home-link";

const random = (limit: number) => Math.floor(Math.random() * limit);
const randomRGBA = () => {
  return `rgba(${random(256)}, ${random(256)}, ${random(256)})`;
};
const HoverBoard = () => {
  const [hover, setHover] = useState<Record<number, boolean>>({});

  const handleHover = (index: number) => {
    setHover((prev) => {
      return { ...prev, [index]: true };
    });
  };

  const handleLeave = (index: number) => {
    setTimeout(() => {
      setHover((prev) => {
        const newHover = { ...prev };
        delete newHover[index];
        return newHover;
      });
    }, 500);
  };
  return (
    <div className="flex flex-col w-full min-h-screen">
      <header className="flex flex-row justify-center items-center gap-2 p-4 bg-orange-500 text-white">
        <HomeLink />
        <h1 className="font-bold text-2xl">HoverBoard</h1>
      </header>
      <main className="flex flex-col">
        <div
          className="grid my-8 self-center gap-0"
          style={{ gridTemplateColumns: "repeat(20,1fr)" }}
        >
          {[...new Array(400)].map((_, i) => {
            return (
              <div
                key={`cell-${i}`}
                className="h-10 w-10 bg-black border-2 border-gray-800 cursor-pointer"
                onMouseEnter={() => handleHover(i)}
                onMouseLeave={() => handleLeave(i)}
                style={{
                  backgroundColor: hover[i] ? randomRGBA() : "",
                }}
              ></div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default HoverBoard;
