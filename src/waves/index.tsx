import { useRef, useState } from "react";

import HomeLink from "../home-link";

const Waves = () => {
  const grid = new Array(16).fill(1).map(() => new Array(16).fill(1));
  const [random, setRandom] = useState(false);
  const refs = useRef<HTMLButtonElement[][]>([]);
  const intervalRef = useRef<number | null>(null);

  const animate = (i: number, j: number) => {
    if (
      refs.current[i] &&
      refs.current[i][j] &&
      refs.current[i][j]?.classList
    ) {
      if (!refs.current[i][j]?.classList.contains("animate")) {
        refs.current[i][j].classList.add("animate");

        setTimeout(() => {
          animate(i - 1, j);
          animate(i + 1, j);
          animate(i, j - 1);
          animate(i, j + 1);
        }, 100);
        setTimeout(() => {
          refs.current[i][j].classList.remove("animate");
        }, 500);
      }
    }
  };

  const startRandom = () => {
    if (random) {
      setRandom(false);
      if (intervalRef.current) {
        clearInterval(intervalRef?.current);
      }
    } else {
      setRandom(true);

      intervalRef.current = window.setInterval(() => {
        const i = Math.floor(Math.random() * 16);
        const j = Math.floor(Math.random() * 16);
        animate(i, j);
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen">
      <header className="bg-yellow-400 p-4 flex flex-row justify-center gap-2 items-center">
        <HomeLink />
        <h1 className="font-bold text-2xl text-white"> Waves </h1>
      </header>
      <main className="flex flex-col min-h-screen w-full items-center">
        <p className="text-4xl font-bold p-2">
          Click a dot to see the animation
        </p>
        <button
          onClick={startRandom}
          className="text-2xl font-bold p-4 rounded-lg bg-black text-white"
        >
          {random ? "Stop Random" : "Start Random"}
        </button>
        <div
          className="grid gap-4 my-4 p-4"
          style={{
            gridTemplateColumns: `repeat(16, 1fr)`,
          }}
        >
          {grid.map((gridRow, i) => {
            return gridRow.map((_, j) => {
              return (
                <button
                  key={`button-${i}-${j}`}
                  className={`rounded-full h-8 w-8 bg-blue-400 border-2 border-blue-500 transition-all duration-500 ease-in-out`}
                  onClick={() => animate(i, j)}
                  aria-label={`Button ${i} ${j}`}
                  disabled={random}
                  ref={(el) => {
                    if (el) {
                      refs.current[i] = refs.current[i] || [];
                      refs.current[i][j] = el;
                    }
                  }}
                ></button>
              );
            });
          })}
        </div>
      </main>
    </div>
  );
};

export default Waves;
