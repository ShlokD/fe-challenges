import { ChangeEvent, useEffect, useRef, useState } from "react";

import HomeLink from "../home-link";
import { shuffle } from "../utils";

type GameState = {
  tries: number;
  currentStep: number;
  win: string;
};
const scramble = (word: string) => {
  if (word.length === 0) {
    return [];
  }
  let scrambled = word;
  while (scrambled === word) {
    scrambled = shuffle(word.split("")).join("");
  }
  return scrambled.split("");
};
const WordScramble = () => {
  const [wordList, setWordList] = useState<string[]>([]);
  const [word, setWord] = useState("");
  const [scrambled, setScrambled] = useState<string[]>(scramble(word));
  const [guessWord, setGuessWord] = useState<string[]>([]);
  const [gameState, setGameState] = useState<GameState>({
    tries: 1,
    currentStep: 0,
    win: "",
  });
  const inputRefs = useRef<HTMLInputElement[] | null[]>(new Array(word.length));

  const move = (e: ChangeEvent) => {
    if (gameState.currentStep === word.length) {
      return;
    }
    const value = (e.target as HTMLInputElement).value;
    setGuessWord((prev) => {
      const newGuessWord = [...prev];
      newGuessWord[gameState.currentStep] = value;
      return newGuessWord;
    });
    inputRefs?.current?.[gameState.currentStep + 1]?.focus();

    setGameState((prev) => {
      return {
        ...prev,
        currentStep:
          prev.currentStep === word.length
            ? prev.currentStep
            : prev.currentStep + 1,
      };
    });
  };

  const guess = () => {
    const allCorrect = guessWord.every((l, i) => l === word[i]);
    if (allCorrect) {
      setGameState((prev) => {
        return {
          ...prev,
          win: "WIN",
        };
      });
    } else {
      if (gameState.tries === 4) {
        setGameState((prev) => {
          return {
            ...prev,
            win: "LOST",
          };
        });
      } else {
        setGameState((prev) => {
          return {
            ...prev,
            currentStep: 0,
            tries: prev.tries === 4 ? prev.tries : prev.tries + 1,
          };
        });
        inputRefs?.current?.[0]?.focus();
        setGuessWord([]);
      }
    }
  };

  const reset = () => {
    setGuessWord([]);
    inputRefs?.current?.[0]?.focus();
    setGameState((prev) => ({
      ...prev,
      currentStep: 0,
    }));
  };

  const newGame = () => {
    setGuessWord([]);
    setGameState({
      tries: 1,
      currentStep: 0,
      win: "",
    });
    const newWord = wordList[Math.floor(Math.random() * wordList.length)];
    setWord(newWord);
    setScrambled(scramble(newWord));
  };

  const loadWords = async () => {
    const res = await fetch("/words5.txt");
    const words = await res.text();
    const list = words.split("\r\n").filter((a) => !!a);
    setWordList(list);
    const startWord = list[Math.floor(Math.random() * list.length)];
    setWord(startWord);
    setScrambled(scramble(startWord));
  };

  useEffect(() => {
    loadWords();
  }, []);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, word.length);
  }, [word]);

  const { win, tries } = gameState;
  return (
    <div className="flex flex-col w-full ">
      <header className="flex flex-row justify-center items-center gap-2 p-4 bg-blue-500">
        <HomeLink />
        <h1 className="font-bold text-2xl text-white">Word Scramble</h1>
      </header>
      <main className="flex flex-col w-full items-center gap-4">
        <p
          className="p-8 rounded-lg bg-gray-400 my-4 text-4xl w-2/3 text-center font-bold"
          style={{
            letterSpacing: "12px",
          }}
        >
          {scrambled}
        </p>
        <p className="p-2 text-xl font-bold">{tries} out of 4</p>
        <div className="flex gap-1">
          {[...new Array(scrambled.length)].map((_, i) => {
            return (
              <input
                key={`input-${i}`}
                maxLength={1}
                minLength={1}
                className={`border-2 w-14 h-14 text-center`}
                value={guessWord?.[i] || ""}
                onChange={move}
                ref={(ref) => (inputRefs.current[i] = ref)}
              />
            );
          })}
        </div>
        <div className="flex gap-2 p-4">
          <button
            className="bg-yellow-500 font-bold text-2xl text-black p-4 rounded-lg"
            onClick={guess}
            disabled={win === "WIN" || win === "LOSS"}
          >
            Guess
          </button>
          <button
            className="bg-green-500 font-bold text-2xl text-black p-4 rounded-lg"
            onClick={reset}
          >
            Reset
          </button>
        </div>
        {win && (
          <div
            className="bg-white p-20 absolute text-4xl border-4 flex flex-col gap-4"
            style={{
              top: "40%",
            }}
          >
            {win === "WIN" ? "You Won!" : "You Lost!"}
            <p className="text-center">{win === "LOST" ? word : ""}</p>
            <button
              className="bg-green-500 font-bold text-2xl text-black p-4 rounded-lg"
              onClick={newGame}
            >
              New Game
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default WordScramble;
