import { useRef, useState } from "react";

import HomeLink from "../home-link";

type Level = {
  grid: number;
  padding: string;
  foxFrequency: number;
  time: number;
};
const LEVELS: Record<string, Level> = {
  EASY: {
    grid: 6,
    padding: "p-4 lg:p-5",
    foxFrequency: 0.1,
    time: 1000,
  },
  MEDIUM: {
    grid: 8,
    padding: "p-3 lg:p-2",
    foxFrequency: 0.3,
    time: 850,
  },
  HARD: {
    grid: 10,
    padding: "p-1",
    foxFrequency: 0.6,
    time: 800,
  },
};

const WhackHog = () => {
  const [gameConfig, setGameConfig] = useState({
    level: "EASY",
    foxFrequency: 0.1,
  });
  const [gameState, setGameState] = useState("INIT");
  const [location, setLocation] = useState({
    cell: -1,
    isFox: false,
  });
  const [score, setScore] = useState(0);
  const length = LEVELS[gameConfig.level].grid;

  const [grid, setGrid] = useState(length * length);
  const intervalRef = useRef<number | null>(null);

  const startGame = () => {
    intervalRef.current = window.setInterval(() => {
      setLocation({
        cell: Math.floor(Math.random() * length * length),
        isFox: Math.random() < LEVELS[gameConfig.level].foxFrequency,
      });
    }, LEVELS[gameConfig.level].time);
  };
  const stopGame = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef?.current);
    }
    setLocation({
      cell: -1,
      isFox: false,
    });
    setGameState("INIT");
    setScore(0);
  };
  const handleStart = () => {
    if (gameState === "INIT" || gameState === "OVER") {
      setGameState("START");
      startGame();
    } else if (gameState === "START") {
      setGameState("INIT");
      stopGame();
    }
  };

  const handleLevelChange = (level: string) => {
    const selectedLevel = LEVELS[level];
    setGameConfig((prev) => {
      return {
        ...prev,
        level,
        foxFrequency: selectedLevel.foxFrequency,
      };
    });
    const length = selectedLevel.grid;

    setGrid(length * length);
  };

  const handleCellClick = ({
    isHit,
    isFox,
  }: {
    isHit: boolean;
    isFox: boolean;
  }) => {
    setScore((prev) => {
      const newScore = isFox || !isHit ? prev - 1 : prev + 1;
      if (newScore === -5) {
        stopGame();
        setGameState("OVER");
      }
      return newScore;
    });
  };

  const game = new Array(grid).fill(0);

  return (
    <div className="flex flex-col w-full min-h-screen">
      <header className="bg-orange-400 p-4 flex flex-row justify-center gap-2 items-center">
        <HomeLink />
        <h1 className="font-bold text-2xl text-white"> Whack a Hog </h1>
      </header>
      <main className="p-4 flex flex-col min-h-screen">
        <h2 className="font-bold text-4xl self-center my-2 text-center">
          Whack the Hedgehog.
        </h2>
        <p className="my-1 p-2 self-center">But be careful. Don't hit a fox</p>

        <button
          className="py-6 px-4 rounded-lg bg-blue-400 text-white font-bold text-2xl self-center my-4"
          onClick={handleStart}
        >
          {gameState === "START" ? "Pause" : "Start"}
        </button>

        {gameState === "OVER" && (
          <p className="text-4xl font-bold self-center p-4 text-red-500">
            Game Over!
          </p>
        )}

        {gameState !== "START" && (
          <div className="my-4 flex self-center">
            {Object.keys(LEVELS).map((level, i) => {
              return (
                <div className="my-2" key={`level-${i}`}>
                  <label
                    className={`p-4 font-bold rounded-lg border-2 ${
                      gameConfig.level === level ? "bg-green-400" : ""
                    }`}
                    htmlFor={`${level}`}
                  >
                    {level}
                  </label>
                  <input
                    type="radio"
                    name="level"
                    defaultChecked={gameConfig.level === level}
                    onChange={(ev) =>
                      handleLevelChange((ev?.target as HTMLInputElement)?.value)
                    }
                    id={`${level}`}
                    value={level}
                    className="hidden"
                  />
                </div>
              );
            })}
          </div>
        )}
        {gameState === "START" && (
          <p className="p-2 font-bold text-xl self-center">Score {score}</p>
        )}

        <div
          className="grid lg:w-2/3 w-full place-center lg:self-center"
          style={{
            gridTemplateColumns: `repeat(${length}, minmax(0,1fr))`,
          }}
        >
          {game.map((_, i) => {
            return (
              <button
                key={`cell-${i}`}
                onClick={() =>
                  handleCellClick({
                    isHit: location.cell === i,
                    isFox: location.isFox,
                  })
                }
                className={`${
                  LEVELS[gameConfig.level].padding
                } border-2 border-black bg-red-900 flex justify-center`}
              >
                {location.cell === i ? (
                  <img
                    src={location.isFox ? "/fox.png" : "/hedgehog.png"}
                    className="text-center"
                    alt=""
                    height={64}
                    width={64}
                  />
                ) : (
                  <img
                    src={"/hedgehog.png"}
                    className="opacity-0"
                    alt=""
                    height={64}
                    width={64}
                  />
                )}
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default WhackHog;
