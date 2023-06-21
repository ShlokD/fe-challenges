import { useEffect, useState } from "react";

import HomeLink from "../home-link";

const getRandomColor = () => {
  return Math.floor(Math.random() * 16777215).toString(16);
};

type Level = {
  grid: number;
  deviation: number;
};

const levels: Record<string, Level> = {
  EASY: {
    grid: 4,
    deviation: 48,
  },
  MEDIUM: {
    grid: 8,
    deviation: 24,
  },
  HARD: {
    grid: 12,
    deviation: 12,
  },
  ULTRA: {
    grid: 16,
    deviation: 6,
  },
};

type Color = {
  color: string;
  odd: boolean;
};
const ColorGame = () => {
  const [score, setScore] = useState(0);
  const [colors, setColors] = useState<Color[]>([]);
  const [gameLevel, setGameLevel] = useState("EASY");

  const level = levels[gameLevel];

  const fill = (level: Level) => {
    const color = getRandomColor();
    const newColors = new Array(level.grid * level.grid)
      .fill(color)
      .map((c) => ({ color: c, odd: false }));
    const randomIndex = Math.floor(Math.random() * newColors.length);
    const deviation = Math.floor(Math.random() * level.deviation);
    newColors[randomIndex] = {
      color: (parseInt(color, 16) - deviation).toString(16),
      odd: true,
    };
    setColors(newColors);
  };

  const handleClick = (odd: boolean) => {
    if (odd) {
      setScore((prev) => prev + 1);
    }
    fill(levels[gameLevel]);
  };

  const handleGameLevelChange = (ev: React.ChangeEvent) => {
    const value = (ev?.target as HTMLSelectElement)?.value;
    setGameLevel(value);
    setScore(0);
    fill(levels[value]);
  };

  useEffect(() => {
    fill(levels[gameLevel]);
  }, []);

  return (
    <div className="flex flex-col w-full">
      <header className="flex flex-row justify-center items-center gap-2 p-4 bg-red-300">
        <HomeLink />
        <h1 className="font-bold text-2xl">Color Game</h1>
      </header>
      <main className="flex flex-col w-full p-4">
        <p className="p-2 text-center text-xl">
          Click the Square with the color different from the rest
        </p>
        <div className="flex flex-row items-center justify-center gap-2">
          <select
            className="self-center p-4 border-2 my-2 font-bold"
            value={gameLevel}
            onChange={handleGameLevelChange}
          >
            {Object.keys(levels).map((level, i) => {
              return (
                <option key={`level-${i}`} value={level}>
                  {level}
                </option>
              );
            })}
          </select>
          <p className="p-2 text-center font-bold text-2xl">Score {score}</p>
        </div>

        <div
          className="grid lg:w-1/2 self-center"
          style={{
            gridTemplateColumns: `repeat(${level.grid}, minmax(0,1fr))`,
          }}
        >
          {colors.map((color, i) => {
            return (
              <button
                className="border-2 p-6"
                aria-label={`color-${i}`}
                key={`color-${i}`}
                style={{ backgroundColor: `#${color.color}` }}
                onClick={() => handleClick(color.odd)}
              ></button>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default ColorGame;
