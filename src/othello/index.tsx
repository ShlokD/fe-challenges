import { useState } from "react";

import HomeLink from "../home-link";

const createGrid = () => {
  const game = new Array(8).fill(0).map(() => new Array(8).fill(""));

  game[3][3] = "W";
  game[4][4] = "W";
  game[3][4] = "B";
  game[4][3] = "B";
  return game;
};

type Score = {
  white: number;
  black: number;
};

const opp: Record<string, string> = {
  B: "W",
  W: "B",
};

const Othello = () => {
  const [grid, setGrid] = useState<string[][]>(createGrid());
  const [turn, setTurn] = useState("B");
  const [scores, setScores] = useState<Score>({
    white: 0,
    black: 0,
  });
  const [over, setOver] = useState(false);

  const placeSquare = (row: number, column: number) => {
    let score = 0;

    setGrid((prev) => {
      prev[row][column] = turn;
      let filled = 0;
      for (let i = 0; i < prev.length; ++i) {
        for (let j = 0; j < prev[i].length; ++j) {
          if (prev[i][j] !== "") {
            filled++;
          }
        }
      }
      if (filled === 64) {
        setOver(true);
        return prev;
      }
      let scored = false;
      for (let i = 0; i < prev.length; ++i) {
        if (prev[i][column] === opp[turn]) {
          prev[i][column] = turn;
          score++;
          scored = true;
        }
      }

      if (!scored) {
        for (let i = 0; i < prev[row].length; ++i) {
          if (prev[row][i] === opp[turn]) {
            prev[row][i] = turn;
            score++;
            scored = true;
          }
        }
      }

      if (!scored) {
        let rowIndex = row - 1;
        for (let i = column - 1; i >= 0 && rowIndex >= 0; --i) {
          if (prev?.[rowIndex]?.[i] === opp[turn]) {
            prev[rowIndex][i] = turn;
            score++;

            scored = true;
          }
          rowIndex--;
        }
      }

      if (!scored) {
        let rowIndex = row + 1;
        for (
          let i = column + 1;
          i < prev[row].length && rowIndex < prev.length;
          ++i
        ) {
          if (prev?.[rowIndex]?.[i] === opp[turn]) {
            prev[rowIndex][i] = turn;
            score++;
            scored = true;
          }
          rowIndex++;
        }
      }

      if (!scored) {
        let rowIndex = row + 1;
        for (let i = column - 1; i >= 0 || rowIndex < prev.length; --i) {
          if (prev?.[rowIndex]?.[i] === opp[turn]) {
            prev[rowIndex][i] = turn;
            score++;
            scored = true;
          }
          rowIndex++;
        }
      }

      return prev;
    });
    setScores((prev) => {
      if (turn === "B") {
        return { ...prev, black: prev.black + score };
      } else {
        return { ...prev, white: prev.white + score };
      }
    });
    setTurn((prev) => (prev === "B" ? "W" : "B"));
  };

  const restart = () => {
    setGrid(createGrid());
    setScores({
      white: 0,
      black: 0,
    });
    setTurn("B");
    setOver(false);
  };

  return (
    <div className="flex flex-col w-full min-h-screen">
      <header className="p-4 bg-black text-white flex flex-row items-center justify-center gap-2">
        <div className="p-2 bg-white">
          <HomeLink />
        </div>
        <h1 className="font-bold text-2xl">Othello</h1>
      </header>
      <main className="flex flex-col w-full min-h-screen items-center p-8 gap-8">
        <h2 className="font-bold text-xl">
          White {scores.white} Black {scores.black}
        </h2>
        <p className="font-bold text-lg">
          Now Playing {turn === "B" ? "Black" : "White"}
        </p>
        {over && (
          <div className="flex flex-col gap-2 text-center">
            <p>{scores.black > scores.white ? "Black wins" : "White Wins"}</p>
            <p>{scores.black === scores.white && "Tie!"}</p>
            <button
              className="py-4 px-2 bg-black rounded-lg text-white font-bold"
              onClick={restart}
            >
              Restart
            </button>
          </div>
        )}

        <div className="grid grid-cols-8 place-items-center">
          {grid.map((row, i) => {
            return row.map((item, j) => {
              return (
                <button
                  key={`slot-${i}-${j}`}
                  className="bg-green-600 h-12 w-12 border-2 border-black text-center"
                  onClick={() => placeSquare(i, j)}
                  disabled={item !== "" && !over}
                  aria-label={`Slot-${i}-${j}`}
                >
                  {!!item && (
                    <p
                      className={`${
                        item === "B" ? "bg-black" : "bg-white"
                      } w-10 h-10 text-center rounded-full m-auto`}
                    ></p>
                  )}
                </button>
              );
            });
          })}
        </div>
      </main>
    </div>
  );
};

export default Othello;
