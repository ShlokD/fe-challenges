import { useRef, useState } from "react";

import HomeLink from "../home-link";

type Cell = {
  value: string;
  life: number;
};
const randomIndex = (size: number) => Math.floor(Math.random() * size);
const createGrid = (size: number) => {
  const grid = new Array(size)
    .fill(0)
    .map(() => new Array(size).fill({ value: "", life: -1 }));
  grid[randomIndex(size)][randomIndex(size)] = { value: "F", life: 4 };
  grid[randomIndex(size)][randomIndex(size)] = { value: "F", life: 4 };
  grid[randomIndex(size)][randomIndex(size)] = { value: "S", life: 5 };
  grid[randomIndex(size)][randomIndex(size)] = { value: "S", life: 5 };
  return grid;
};

const getRandomNeighbour = (grid: Cell[][], i: number, j: number) => {
  const neighbours = [];
  for (let x = -1; x <= 1; ++x) {
    for (let y = -1; y <= 1; ++y) {
      if (x === 0 && y === 0) continue;
      let row = i + x;
      let col = j + y;
      const cell = grid?.[row]?.[col];
      if (cell?.value === "") {
        neighbours.push({ row, col });
      }
    }
  }

  if (neighbours.length === 0) {
    return { row: null, col: null };
  } else {
    return neighbours[Math.floor(Math.random() * neighbours.length)];
  }
};

const getSharkNeighbour = (grid: Cell[][], i: number, j: number) => {
  const neighbours = [];
  for (let x = -1; x <= 1; ++x) {
    for (let y = -1; y <= 1; ++y) {
      if (x === 0 && y === 0) continue;
      let row = i + x;
      let col = j + y;
      const cell = grid?.[row]?.[col];
      if (cell?.value === "F") {
        return { row, col };
      } else if (cell?.value === "") {
        neighbours.push({ row, col });
      }
    }
  }

  if (neighbours.length === 0) {
    return { row: null, col: null };
  } else {
    return neighbours[Math.floor(Math.random() * neighbours.length)];
  }
};

const cloneGrid = (grid: Cell[][]) =>
  grid.map((arr) => arr.slice().map((obj) => ({ ...obj })));

const Wator = () => {
  const [grid, setGrid] = useState<Cell[][]>(createGrid(8));

  const timer = useRef<number | null>(null);

  const nextStep = () => {
    setGrid((prev) => {
      const newGrid = cloneGrid(prev);
      let oneFish = false;
      for (let i = 0; i < newGrid.length; ++i) {
        for (let j = 0; j < newGrid[i].length; ++j) {
          const cellValue = newGrid[i][j].value;
          const cellLife = newGrid[i][j].life - 1;
          if (cellValue === "F") {
            oneFish = true;
            const { row, col } = getRandomNeighbour(newGrid, i, j);
            if (row && col) {
              newGrid[row][col] = {
                value: "FC",
                life: cellLife === 0 ? 4 : cellLife,
              };
              newGrid[i][j] = {
                value: cellLife === 0 ? "FC" : "",
                life: cellLife === 0 ? 4 : -1,
              };
            }
          }
        }
      }

      for (let i = 0; i < newGrid.length; ++i) {
        for (let j = 0; j < newGrid[i].length; ++j) {
          if (newGrid[i][j].value === "FC") {
            newGrid[i][j].value = "F";
          }
        }
      }

      let oneShark = false;
      for (let i = 0; i < newGrid.length; ++i) {
        for (let j = 0; j < newGrid[i].length; ++j) {
          if (newGrid[i][j].value === "S") {
            oneShark = true;
            const { row, col } = getSharkNeighbour(newGrid, i, j);
            const cellValue = newGrid[i][j].value;
            const cellLife = newGrid[i][j].life - 1;
            if (row && col) {
              if (newGrid[row][col].value === "F") {
                newGrid[row][col] = {
                  value: cellValue,
                  life: cellLife + 2,
                };
              } else {
                newGrid[row][col] = {
                  value: cellLife === 0 ? "" : cellValue,
                  life: cellLife === 0 ? -1 : cellLife,
                };
              }
              newGrid[i][j] = {
                value: "",
                life: -1,
              };
            }
          }
        }
      }
      if (!oneShark || !oneFish) {
        stop();
      }
      return newGrid;
    });
  };

  const stop = () => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
      return true;
    }
    return false;
  };
  const startTimer = () => {
    if (stop()) {
      return;
    }

    timer.current = window.setInterval(() => nextStep(), 1000);
  };

  const onCellClick = (i: number, j: number) => {
    setGrid((prev) => {
      const newGrid = cloneGrid(prev);
      const value = newGrid[i][j].value;
      if (value === "") {
        newGrid[i][j].value = "F";
        newGrid[i][j].life = 4;
      } else if (value === "F") {
        newGrid[i][j].value = "S";
        newGrid[i][j].life = 5;
      } else {
        newGrid[i][j].value = "";
        newGrid[i][j].life = -1;
      }
      return newGrid;
    });
  };

  return (
    <>
      <header className="flex flex-row justify-center items-center gap-2 p-4 bg-purple-500">
        <HomeLink />
        <h1 className="font-bold text-2xl text-white">Wator</h1>
      </header>
      <main className="flex flex-col w-full items-center p-2">
        <button
          onClick={startTimer}
          className={`w-1/4 self-center px-4 py-6 rounded-xl text-white text-2xl font-bold ${
            timer.current !== null ? "bg-gray-400" : "bg-red-500"
          }`}
        >
          {timer.current !== null ? "Pause" : "Start"}
        </button>
        <div className="grid grid-cols-8 my-2">
          {grid.map((row, i) => {
            return row.map((item, j) => {
              return (
                <button
                  key={`cell-${i}-${j}`}
                  disabled={timer.current !== null}
                  className="bg-blue-400 border-2 border-black h-20 w-20 text-6xl"
                  onClick={() => onCellClick(i, j)}
                >
                  {item.value === "S" && "🦈"}
                  {item.value === "F" && "🐡"}
                </button>
              );
            });
          })}
        </div>
      </main>
    </>
  );
};

export default Wator;
