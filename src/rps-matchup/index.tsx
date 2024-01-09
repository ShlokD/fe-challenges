import { useEffect, useState } from "react";

import HomeLink from "../home-link";
import { shuffle } from "../utils";

type Play = {
  number: number;
  play: string;
  isWin: boolean;
};

const createMatchups = (size: number) => {
  const matchups = [];
  const end = Math.floor(size / 2);
  for (let i = 0; i < end; ++i) {
    matchups.push([
      { number: i + 1, play: "", isWin: false },
      { number: size - i, play: "", isWin: false },
    ]);
  }
  return matchups;
};

const play = () => {
  const random = Math.random();
  if (random < 0.33) {
    return "🪨";
  }
  if (random >= 0.33 && random < 0.67) {
    return "✂️";
  }
  if (random >= 0.67) {
    return "📜";
  }
  return "";
};

const getWinner = (a: string, b: string) => {
  if (a === b) {
    return null;
  }
  if (a === "🪨") {
    if (b === "✂️") {
      return a;
    }
    return b;
  }

  if (a === "✂️") {
    if (b === "🪨") {
      return b;
    }
    return a;
  }

  if (a === "📜") {
    if (b === "✂️") {
      return b;
    }
    return a;
  }
};

type Leaderboard = {
  rock: number;
  scissors: number;
  paper: number;
};

const RPSMatchup = () => {
  const [size, setSize] = useState(5);
  const powSize = Math.pow(2, size);
  const [matchups, setMatchups] = useState<Play[][]>(createMatchups(powSize));
  const [appState, setAppState] = useState("INIT");
  const [winner, setWinner] = useState<Play | null>(null);
  const [leaderboard, setLeaderboard] = useState<Leaderboard>({
    rock: 0,
    paper: 0,
    scissors: 0,
  });

  const mark = () => {
    let winners = [];
    for (let i = 0; i < matchups.length; ++i) {
      let winningPlay = "";

      if (matchups[i][0].isWin) {
        winners.push(matchups[i][0]);
        winningPlay = matchups[i][0].play;
      } else {
        winners.push(matchups[i][1]);
        winningPlay = matchups[i][1].play;
      }

      setLeaderboard((prev) => {
        return {
          rock: winningPlay === "🪨" ? prev.rock + 1 : prev.rock,
          paper: winningPlay === "📜" ? prev.paper + 1 : prev.paper,
          scissors: winningPlay === "✂️" ? prev.scissors + 1 : prev.scissors,
        };
      });
    }

    if (winners.length === 1) {
      setAppState("WIN");
      setWinner(winners[0]);
      return;
    }

    winners = shuffle(winners);

    const newMatchups = [];
    for (let i = 0; i < Math.floor(winners.length / 2); ++i) {
      newMatchups.push([
        {
          number: winners[i].number,
          play: "",
          isWin: false,
        },
        {
          number: winners[winners.length - i - 1].number,
          play: "",
          isWin: false,
        },
      ]);
    }

    setMatchups(newMatchups);
    setAppState("PLAY");
    setTimeout(() => start(), 1000);
  };

  const start = () => {
    setMatchups((prev) => {
      return prev.map((matchup) => {
        const play1 = play();
        let play2 = play();
        while (play1 === play2) {
          play2 = play();
        }
        const winner = getWinner(play1, play2);
        return [
          { number: matchup[0].number, play: play1, isWin: winner === play1 },
          { number: matchup[1].number, play: play2, isWin: winner === play2 },
        ];
      });
    });
    setAppState("MARK");
  };

  const restart = () => {
    setMatchups(createMatchups(Math.pow(2, size)));
    setAppState("INIT");
    setWinner(null);
  };

  useEffect(() => {
    if (appState === "MARK") {
      setTimeout(() => mark(), 1000);
    }
  }, [appState]);

  const handleSizeChange = (value: number) => {
    setSize(value);
    setMatchups(createMatchups(Math.pow(2, value)));
  };
  return (
    <div className="flex flex-col w-full ">
      <header className="flex flex-row justify-center items-center gap-2 p-4 bg-orange-500">
        <HomeLink />
        <h1 className="font-bold text-2xl">Rock Paper Scissors Matchup</h1>
      </header>
      <main className="flex flex-col w-full min-h-screen p-2">
        {appState !== "WIN" && (
          <>
            <button
              onClick={start}
              disabled={appState !== "INIT"}
              className={`w-1/3 px-2 py-4 self-center rounded-lg text-2xl font-bold text-white shadow-lg ${
                appState === "INIT" ? "bg-blue-600" : "bg-gray-400"
              }`}
            >
              {appState === "INIT" ? "Start" : "In Play"}
            </button>
            <div className="flex gap-2 w-2/3 self-center items-center justify-center p-2">
              <label htmlFor="size" className="text-xl  font-bold">
                Matchups {powSize}
              </label>
              <input
                type="range"
                id="size"
                value={size}
                step={1}
                min={1}
                max={10}
                className="w-1/2 p-4 self-center"
                disabled={appState === "MARK" || appState === "PLAY"}
                onChange={(ev) => handleSizeChange(Number(ev?.target?.value))}
              />
            </div>

            <div
              className={`grid grid-cols-${
                matchups.length > 8 ? "8" : matchups.length
              } gap-2 place-items-center my-8 self-center`}
            >
              {matchups.map((matchup, i) => {
                return (
                  <div
                    className="flex items-center justify-center gap-1"
                    key={`matchup-${i}`}
                  >
                    <p
                      className={`${
                        matchup[0].isWin ? "bg-green-500" : ""
                      } border-2 border-black p-4 text-lg font-bold text-center`}
                    >
                      {matchup[0].number}
                      {matchup[0].play}
                    </p>
                    <p
                      className={`${
                        matchup[1].isWin ? "bg-green-500" : ""
                      } border-2 border-black p-4 text-lg font-bold text-center`}
                    >
                      {matchup[1].number}
                      {matchup[1].play}
                    </p>
                  </div>
                );
              })}
            </div>
          </>
        )}
        {appState === "WIN" && (
          <div className="flex flex-col items-center justify-center gap-8 my-8">
            <p className="text-4xl font-bold">Winner {winner?.number}</p>
            <p className="text-2xl font-bold">Last Play {winner?.play}</p>
            <hr className="w-full" />
            <button
              onClick={restart}
              className="w-1/3 px-2 py-4 self-center rounded-lg text-2xl font-bold text-white shadow-lg bg-blue-600"
            >
              Restart
            </button>
            <hr className="w-full" />
            <p className="font-bold text-3xl">Leaderboard</p>
            <p className="text-2xl font-bold">🪨 {leaderboard.rock}</p>
            <p className="text-2xl font-bold">📜 {leaderboard.paper}</p>
            <p className="text-2xl font-bold">✂️ {leaderboard.scissors}</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default RPSMatchup;
