import { useState } from "react";

import HomeLink from "../home-link";

const letters = "ABCDEFGHIJKLMNO".split("");
const indices: Record<string, number> = letters.reduce((indices, elem, i) => {
  indices[elem] = i;
  return indices;
}, {} as Record<string, number>);

const shuffle = (arr: any[]) => {
  return arr
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

const createGrid = () => {
  const grid = [...letters, "EMPTY"];
  return shuffle(grid);
};
const Puzzle15 = () => {
  const [grid, setGrid] = useState(createGrid());
  const [moves, setMoves] = useState(0);
  const [win, setWin] = useState(false);

  const isAdjoining = (index: number) => {
    const top = grid[index - 4];
    const bottom = grid[index + 4];
    const right = grid[index + 1];
    const left = grid[index - 1];

    return (
      top === "EMPTY" ||
      bottom === "EMPTY" ||
      right === "EMPTY" ||
      left === "EMPTY"
    );
  };

  const checkWin = (newGrid: string[]) => {
    let isWin = true;
    for (let i = 0; i < newGrid.length; ++i) {
      if (newGrid[i] === "EMPTY") {
        continue;
      }
      if (indices[newGrid[i]] !== i) {
        isWin = false;
        break;
      }
    }

    if (isWin) {
      setWin(true);
    }
  };

  const handleClick = (index: number) => {
    const emptyIndex = grid.findIndex((g) => g === "EMPTY");
    setGrid((prev) => {
      const newGrid = prev.slice();
      const temp = newGrid[emptyIndex];
      newGrid[emptyIndex] = newGrid[index];
      newGrid[index] = temp;
      checkWin(newGrid);
      return newGrid;
    });
    setMoves((prev) => prev + 1);
  };

  const restart = () => {
    setGrid(createGrid());
    setMoves(0);
    setWin(false);
  };
  return (
    <div className="flex flex-col w-full ">
      <header className="flex flex-row justify-center items-center gap-2 p-4 bg-purple-500">
        <HomeLink />
        <h1 className="font-bold text-2xl text-white">Puzzle 15</h1>
      </header>
      <main className="flex flex-col min-h-screen w-full items-center">
        <h2 className="text-4xl p-2  p-4 text-center">
          Arrange the letters in alphabetical order
        </h2>
        <div className="flex gap-2">
          <p className="my-2 p-2 text-2xl font-bold border-2 bg-red-600 text-white rounded-lg border-transparent">
            Moves {moves}
          </p>
          <button
            onClick={restart}
            className="my-2 p-2 text-2xl font-bold border-2 bg-blue-600 text-white rounded-lg border-transparent"
          >
            Restart
          </button>
        </div>
        {win && <p className="text-4xl p-2">You won!</p>}
        <div className="grid grid-cols-4 gap-1">
          {grid.map((elem, i) => {
            const isAdjoiningEmpty = isAdjoining(i);
            return (
              <button
                key={`cell-${i}`}
                className={`p-6 font-bold text-white text-xl border-2 border-black rounded-md ${
                  indices[elem] === i ? "bg-green-400" : "bg-blue-400"
                }`}
                disabled={!isAdjoiningEmpty || win}
                onClick={() => handleClick(i)}
              >
                {elem === "EMPTY" ? "" : elem}
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Puzzle15;
