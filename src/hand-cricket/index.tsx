import { Dispatch, SetStateAction, useState } from "react";

import HomeLink from "../home-link";

enum Choice {
  "Heads" = "Heads",
  "Tails" = "Tails",
}

enum PlayState {
  "Bat" = "Bat",
  "Bowl" = "Bowl",
}

const RUNS = [
  "&#9757;",
  "&#9996;",
  "&#129311;",
  "&#128406;",
  "&#128400;",
  "&#129305;",
];

const Toss = ({
  playerState,
  setPlayerState,
  startGame,
}: {
  playerState: PlayState | null;
  setPlayerState: Dispatch<SetStateAction<PlayState | null>>;
  startGame: () => void;
}) => {
  const [tossUp, setTossUp] = useState({ choice: "", won: false, result: "" });

  const toss = (side: string) => {
    const random = Math.floor(Math.random() * 100);
    const result = random % 2 === 0 ? Choice.Heads : Choice.Tails;
    const won = result === side;

    if (!won) {
      const random = Math.floor(Math.random() * 100);
      const playStateResult = random % 2 === 0 ? PlayState.Bat : PlayState.Bowl;
      setPlayerState(playStateResult);
    }
    setTossUp({
      choice: side,
      won,
      result,
    });
  };

  const play = (choice: PlayState) => {
    setTossUp({ choice: "", won: false, result: "" });
    setPlayerState(choice);
  };

  return (
    <>
      <h2 className="text-center text-4xl font-bold p-4">Let's Toss</h2>
      <div className="flex gap-4 items-center justify-center">
        <button
          onClick={() => toss(Choice.Heads)}
          className="rounded-lg p-4 bg-blue-500 w-1/3 text-white font-bold text-2xl"
        >
          Heads
        </button>
        <button
          onClick={() => toss(Choice.Tails)}
          className="rounded-lg p-4 bg-red-500 w-1/3 text-white font-bold text-2xl"
        >
          Tails
        </button>
      </div>
      <div className="flex flex-col p-4 gap-4 font-bold text-2xl items-center w-full">
        {tossUp.choice && (
          <p>
            You chose {tossUp.choice}. {tossUp.won ? "you won" : "you lose"}
          </p>
        )}
        {tossUp.result && <p>Result: {tossUp.result}</p>}

        {tossUp.won && (
          <div className="flex gap-4 items-center justify-center">
            <button
              onClick={() => play(PlayState.Bat)}
              className="rounded-lg p-4 bg-gray-600 w-2/3 text-white font-bold text-2xl"
            >
              🏏
            </button>
            <button
              onClick={() => play(PlayState.Bowl)}
              className="rounded-lg p-4 bg-gray-600 w-2/3 text-white font-bold text-2xl"
            >
              🥎
            </button>
          </div>
        )}
        {playerState && (
          <div className="flex flex-col gap-2 p-4 items-center justify-center">
            <p>You will {playerState} first</p>
            <button
              className="rounded-lg p-4 bg-red-500 w-2/3 text-white font-bold text-2xl"
              onClick={startGame}
            >
              Start
            </button>
          </div>
        )}
      </div>
    </>
  );
};

type Score = {
  player: number;
  cpu: number;
};

type GameState = {
  balls: number;
  innings: number;
  endState: string;
  showAlert: boolean;
  out: boolean;
};

const Game = ({
  playerState,
  setPlayerState,
  startNewGame,
}: {
  playerState: PlayState | null;
  setPlayerState: Dispatch<SetStateAction<PlayState | null>>;
  startNewGame: () => void;
}) => {
  const [score, setScore] = useState<Score>({ player: 0, cpu: 0 });
  const [cpuChoice, setCpuChoice] = useState(-1);

  const [game, setGame] = useState<GameState>({
    balls: 1,
    innings: 1,
    endState: "",
    showAlert: false,
    out: false,
  });

  const play = (choice: number) => {
    const cpuChoice = Math.floor(Math.random() * 6 + 1);
    setCpuChoice(cpuChoice);
    if (cpuChoice === choice) {
      setGame((prev) => {
        return { ...prev, showAlert: true, out: true };
      });
      if (game.innings === 1) {
        setPlayerState(
          playerState === PlayState.Bat ? PlayState.Bowl : PlayState.Bat,
        );
        setGame((prev) => {
          return { ...prev, balls: 0 };
        });
      } else {
        if (score.player > score.cpu) {
          setGame((prev) => {
            return { ...prev, endState: "WIN" };
          });
        } else {
          setGame((prev) => {
            return { ...prev, endState: "LOST" };
          });
        }
      }
    } else {
      setScore((prev) => {
        if (playerState === PlayState.Bat) {
          const player = prev.player + choice;
          if (game.innings === 2 && player > score.cpu) {
            setGame((prev) => {
              return { ...prev, endState: "WIN", showAlert: true };
            });
          }
          return {
            ...prev,
            player,
          };
        } else {
          const cpu = prev.cpu + cpuChoice;
          if (game.innings === 2 && cpu > score.player) {
            setGame((prev) => {
              return { ...prev, endState: "LOST", showAlert: true };
            });
          }
          return {
            ...prev,
            cpu,
          };
        }
      });
      setGame((prev) => {
        const newBalls = prev.balls + 1;
        if (newBalls > 6) {
          setPlayerState(
            playerState === PlayState.Bat ? PlayState.Bowl : PlayState.Bat,
          );
          return {
            ...prev,
            balls: 0,
            showAlert: true,
          };
        } else {
          return { ...prev, balls: newBalls };
        }
      });
    }
  };

  const handleOut = () => {
    if (innings === 1) {
      setGame((prev) => ({
        ...prev,
        out: false,
        showAlert: false,
        innings: 2,
      }));
    } else {
      setGame({
        balls: 1,
        innings: 1,
        endState: "",
        showAlert: false,
        out: false,
      });
      startNewGame();
    }
  };

  const { showAlert, balls, innings, out, endState } = game;

  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      {showAlert && (
        <div className="flex flex-col items-center justify-center border-2 border-black absolute p-20 bg-white rounded-lg">
          {endState === "" && (
            <p className="text-4xl p-2">{out ? "OUT!" : "OVER!"}</p>
          )}
          {endState !== "" && <p className="text-2xl">YOU {endState}!</p>}

          <button
            className="border-2 p-4 bg-blue-500 font-bold text-white"
            onClick={handleOut}
          >
            {innings === 1 ? "Play Next Innings" : "New Game"}
          </button>
        </div>
      )}
      <h2 className="font-bold p-4 text-4xl">Score {score.player}</h2>
      <p className="text-2xl">Ball {balls}</p>
      {playerState === PlayState.Bat ? (
        <p className="text-6xl">🏏</p>
      ) : (
        <p className="text-6xl">🥎</p>
      )}
      <div className="grid grid-cols-3 gap-2 p-4">
        {RUNS.map((run, i) => {
          return (
            <button
              key={`run-${i}`}
              onClick={() => play(i + 1)}
              disabled={endState !== ""}
              className="p-6 border-8 rounded-lg border-yellow-500 bg-black text-6xl font-bold"
              dangerouslySetInnerHTML={{ __html: run }}
            ></button>
          );
        })}
      </div>
      <hr className="w-full" />

      <h2 className="font-bold p-4 text-4xl">Score {score.cpu}</h2>
      {cpuChoice !== -1 && (
        <p
          className="p-6  border-8 rounded-lg border-yellow-500 bg-black text-6xl font-bold"
          dangerouslySetInnerHTML={{ __html: RUNS[cpuChoice - 1] }}
        ></p>
      )}
      {playerState === PlayState.Bat ? (
        <p className="text-6xl">⚾</p>
      ) : (
        <p className="text-6xl">🏏</p>
      )}
    </div>
  );
};
const HandCricket = () => {
  const [appState, setAppState] = useState("TOSS");
  const [playerState, setPlayerState] = useState<PlayState | null>(null);

  const startGame = () => {
    setAppState("START");
  };

  const startNewGame = () => {
    setAppState("TOSS");
    setPlayerState(null);
  };
  return (
    <div className="flex flex-col w-full h-full">
      <header className="bg-black text-white p-4 flex flex-row justify-center gap-2 items-center">
        <div className="bg-white">
          <HomeLink />
        </div>
        <h1 className="font-bold text-2xl text-white"> Hand Cricket </h1>
      </header>
      <main className="flex flex-col w-full my-4 px-4 pt-4 pb-12">
        {appState === "TOSS" ? (
          <Toss
            playerState={playerState}
            setPlayerState={setPlayerState}
            startGame={startGame}
          />
        ) : (
          <Game
            playerState={playerState}
            setPlayerState={setPlayerState}
            startNewGame={startNewGame}
          />
        )}
      </main>
    </div>
  );
};

export default HandCricket;
